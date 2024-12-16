package com.sanju.projectmanagementsystem.request;

import lombok.Data;

@Data
public class CreateMessageRequest {
    private Long senderId;

    private Long receiverId;

    private String content;

    private Long projectId;
}
