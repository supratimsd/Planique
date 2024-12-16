package com.sanju.projectmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanju.projectmanagementsystem.modal.Comment;
import com.sanju.projectmanagementsystem.modal.Message;
import com.sanju.projectmanagementsystem.modal.User;
import com.sanju.projectmanagementsystem.request.CreateCommentRequest;
import com.sanju.projectmanagementsystem.response.MessageResponse;
import com.sanju.projectmanagementsystem.service.CommentService;
import com.sanju.projectmanagementsystem.service.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommentRequest req,@RequestHeader ("Authorization") String jwt) throws Exception{
        User user=userService.findUserProfileByJwt(jwt);
        Comment createdComment=commentService.createComment(req.getIssueId(),user.getId(),req.getContent());
        return new ResponseEntity<>(createdComment,HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,@RequestHeader ("Authorization") String jwt) throws Exception{
        User user=userService.findUserProfileByJwt(jwt);
        commentService.deleteComment(commentId,user.getId());
        MessageResponse res=new MessageResponse();
        res.setMessage("Comment deleted successfully");
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(@PathVariable Long issueId){
        List<Comment> comments=commentService.findCommentsByIssueId(issueId);
        return new ResponseEntity<>(comments,HttpStatus.OK);
    }
}
