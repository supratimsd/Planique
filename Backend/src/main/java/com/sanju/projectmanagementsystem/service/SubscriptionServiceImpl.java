package com.sanju.projectmanagementsystem.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanju.projectmanagementsystem.modal.PlanType;
import com.sanju.projectmanagementsystem.modal.Subscription;

import com.sanju.projectmanagementsystem.modal.User;
import com.sanju.projectmanagementsystem.repository.SubscriptionRepository;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    
    @Override
    public Subscription createSubscription(User user) {
        Subscription subscription=new Subscription();
        subscription.setUser(user);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setGetsubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setValid(true);
        subscription.setPlanType(PlanType.FREE);
        return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription getUserSubscription(Long userId) throws Exception {
        Subscription subscription=subscriptionRepository.findByUserId(userId);
        if (subscription == null) {
            // If no subscription exists, fetch the user and create a new subscription
            User user = userService.findUserById(userId);
            if (user == null) {
                throw new IllegalArgumentException("User not found with ID: " + userId);
            }
            subscription = createSubscription(user);
        }
        if(!isValid(subscription)){
            subscription.setPlanType(PlanType.FREE);
            subscription.setGetsubscriptionEndDate(LocalDate.now().plusMonths(12));
            subscription.setSubscriptionStartDate(LocalDate.now());
        }
        return subscriptionRepository.save(subscription);
    }
    
    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType) {
        Subscription subscription=subscriptionRepository.findByUserId(userId);
        if (subscription == null) {
            throw new IllegalArgumentException("No subscription found for user with ID: " + userId);
        }
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());
        if(planType.equals(PlanType.FREE)){
            subscription.setGetsubscriptionEndDate(LocalDate.now().plusMonths(12));
        }else{
            subscription.setGetsubscriptionEndDate(LocalDate.now().plusMonths(1));
        }

        return subscriptionRepository.save(subscription);
        
    }

    @Override
    public boolean isValid(Subscription subscription) {
        if(subscription.getPlanType().equals(PlanType.FREE)){
            return true;
        }
        LocalDate enDate=subscription.getGetsubscriptionEndDate();
        LocalDate currentDate=LocalDate.now();

        return enDate.isAfter(currentDate) || enDate.isEqual(currentDate);
    }

}
