package com.sanju.projectmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanju.projectmanagementsystem.modal.Chat;
import com.sanju.projectmanagementsystem.modal.Message;
import com.sanju.projectmanagementsystem.modal.User;
import com.sanju.projectmanagementsystem.request.CreateMessageRequest;
import com.sanju.projectmanagementsystem.service.MessageService;
import com.sanju.projectmanagementsystem.service.ProjectService;
import com.sanju.projectmanagementsystem.service.UserService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    public UserService userService;

    @Autowired
    public ProjectService projectService;


    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest request) throws Exception{
        User user=userService.findUserById(request.getSenderId());
        
        Chat chats = projectService.getProjectById(request.getProjectId()).getChat();

        if(chats==null) throw new Exception("Chats not found");
        Message sentMessage=messageService.sendMessage(request.getSenderId(),request.getProjectId(),request.getContent());

        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessageByChatId(@PathVariable Long projectId) throws Exception{
        List<Message> messages=messageService.getMessageByProjectId(projectId);
        return ResponseEntity.ok(messages);
    }
}
