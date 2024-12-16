package com.sanju.projectmanagementsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanju.projectmanagementsystem.modal.Comment;
import com.sanju.projectmanagementsystem.modal.Issue;
import com.sanju.projectmanagementsystem.modal.User;
import com.sanju.projectmanagementsystem.repository.CommentRepository;
import com.sanju.projectmanagementsystem.repository.IssueRepository;
import com.sanju.projectmanagementsystem.repository.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional = issueRepository.findById(issueId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(issueOptional.isEmpty()){
            throw new Exception("Issue not found with this id"+issueId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("User not found with this id"+userId);
        }

        Issue issue = issueOptional.get();
        User user=userOptional.get();

        Comment comment=new Comment();
        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreatedDateTime(java.time.LocalDateTime.now());
        comment.setContent(content);

        Comment savedComment=commentRepository.save(comment);

        issue.getComments().add(savedComment);


        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment> commentOptional=commentRepository.findById(commentId);
        Optional<User> userOptional=userRepository.findById(userId);

        if(commentOptional.isEmpty()){
            throw new Exception("Comment not found with this id"+commentId);
        }

        if(userOptional.isEmpty()){
            throw new Exception("User not found with this id"+userId);
        }

        Comment comment=commentOptional.get();
        User user=userOptional.get();
        if(comment.getUser().equals(user)){
            commentRepository.delete(comment);
        }else{
            throw new Exception("You are not allowed to delete this comment");
        }
        
    }

    @Override
    public List<Comment> findCommentsByIssueId(Long issueId) {
        return commentRepository.findByIssueId(issueId);
    }
    
}
