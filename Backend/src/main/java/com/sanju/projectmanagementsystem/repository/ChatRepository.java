package com.sanju.projectmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sanju.projectmanagementsystem.modal.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

}
