package com.sanju.projectmanagementsystem.service;

import com.sanju.projectmanagementsystem.modal.PlanType;
import com.sanju.projectmanagementsystem.modal.Subscription;
import com.sanju.projectmanagementsystem.modal.User;
// import java.util.concurrent.Flow;
public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUserSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);

}
