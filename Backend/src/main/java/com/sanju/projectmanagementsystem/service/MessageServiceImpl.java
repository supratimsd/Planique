package com.sanju.projectmanagementsystem.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanju.projectmanagementsystem.modal.Chat;
import com.sanju.projectmanagementsystem.modal.Message;
import com.sanju.projectmanagementsystem.modal.User;
import com.sanju.projectmanagementsystem.repository.MessageRepository;
import com.sanju.projectmanagementsystem.repository.UserRepository;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;


    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {
        User sender=userRepository.findById(senderId).orElseThrow(()-> new Exception("User not found with this id"+senderId));
        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message=new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);
        Message savedMessage=messageRepository.save(message);

        chat.getMessages().add(savedMessage);

        return savedMessage;
    }

    @Override
    public List<Message> getMessageByProjectId(Long projectId) throws Exception {
        Chat chat = projectService.getChatByProjectId(projectId);
        List<Message> findByChatIdOrderByCreatedAtAsc= messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
        return findByChatIdOrderByCreatedAtAsc;
    }

    @Override
    public Message receiveMessage(Long senderId, Long chatId, String content) throws Exception {
        
        throw new UnsupportedOperationException("Unimplemented method 'receiveMessage'");
    }

}
