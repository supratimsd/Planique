package com.sanju.projectmanagementsystem.service;

import jakarta.mail.MessagingException;

public interface EmailService {
    void sendEmailWithToken(String userEmail,String link) throws MessagingException;
}