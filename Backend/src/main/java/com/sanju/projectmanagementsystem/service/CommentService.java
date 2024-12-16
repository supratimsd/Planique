package com.sanju.projectmanagementsystem.service;

import java.util.List;

import com.sanju.projectmanagementsystem.modal.Comment;

public interface CommentService {
    Comment createComment(Long issueId, Long userId, String comment) throws Exception;

    void deleteComment(Long commentId,Long userId) throws Exception;

    List<Comment> findCommentsByIssueId(Long issueId);
}
