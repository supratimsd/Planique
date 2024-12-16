package com.sanju.projectmanagementsystem.repository;
import com.sanju.projectmanagementsystem.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User,Long>{
    User findByEmail(String email);
}
