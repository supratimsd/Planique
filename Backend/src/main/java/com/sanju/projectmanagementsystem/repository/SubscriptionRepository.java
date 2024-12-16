package com.sanju.projectmanagementsystem.repository;

// import java.util.concurrent.Flow.Subscription;
import com.sanju.projectmanagementsystem.modal.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long>{
    com.sanju.projectmanagementsystem.modal.Subscription findByUserId(Long userId);

    // Subscription save(Subscription subscription);

    // Subscription save(Subscription subscription);
}
