import React from "react";
import SubscriptionCard from "./SubscriptionCard";
import { useSelector } from "react-redux";
const monthlyPlan = [
  "Add unlimited projects",
  "Access to live chat",
  "Add unlimited team members",
  "Advanced reporting",
  "Priority support",
  "customization options",
  "Integration support",
  "Advanced security",
  "Training and resources",
  "Access control",
  "Custom workflows",
];

const annualPlan = [
  "Add unlimited projects",
  "Access to live chat",
  "Add unlimited team members",
  "Advanced reporting",
  "Priority support",
  "Everything which monthly plan has",
];

const freePlan = [
  "Add only 3 projects",
  "Basic task management",
  "Basic reporting",
  "Project collaboration",
  "Email notifications",
  "Basic access control",
];
function Subscription() {
  const {subscription}=useSelector(store=>store);
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          data={{
            planName: "Free",
            planType: "FREE",
            features: freePlan,
            price: 0,
            buttonName: subscription.userSubscription?.planType=="FREE" ? "Current plan" : "Get Started",
          }}
        />
        <SubscriptionCard 
        data={{
          planName: "Monthly Paid Plan",
          planType: "MONTHLY",
          features: monthlyPlan,
          price: 799,
          buttonName: subscription.userSubscription?.planType=="MONTHLY" ? "Current plan" : "Get Started",
        }}
        />
        <SubscriptionCard 
        data={{
          planName: "Annualy Paid Plan",
          planType: "ANNUALY",
          features: annualPlan,
          price: 1299,
          buttonName: subscription.userSubscription?.planType=="ANNUALY" ? "Current plan" : "Get Started",
        }}
        />
      </div>
    </div>
  );
}

export default Subscription;
