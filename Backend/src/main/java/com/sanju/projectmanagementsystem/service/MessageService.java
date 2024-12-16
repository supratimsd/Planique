package com.sanju.projectmanagementsystem.service;

import java.util.List;

import com.sanju.projectmanagementsystem.modal.Message;

public interface MessageService {
    Message sendMessage(Long senderId, Long chatId, String content) throws Exception;

    List<Message> getMessageByProjectId(Long projectId) throws Exception;

     Message receiveMessage(Long senderId, Long chatId, String content) throws Exception;

     
}
