package com.sanju.projectmanagementsystem.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
