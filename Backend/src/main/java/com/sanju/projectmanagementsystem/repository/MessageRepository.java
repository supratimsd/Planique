package com.sanju.projectmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sanju.projectmanagementsystem.modal.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
    List<Message> findByChatIdOrderByCreatedAtAsc(Long chatId);
}