package com.sanju.projectmanagementsystem.service;

import com.sanju.projectmanagementsystem.modal.Invitation;

import jakarta.mail.MessagingException;

public interface InvitationService {
    public void sendInvitation(String email, Long projectId) throws MessagingException;

    public Invitation acceptInvitation(String token,Long userId) throws Exception;

    public String getTokenByUserMail(String userEmail);

    void deleteToken(String token);
}
