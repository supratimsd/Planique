# Planique – Project Management System

Planique is a web-based project management system that allows users to efficiently create, manage, and collaborate on projects. It offers a wide range of features including project creation, user invitations, issue tracking, real-time communication, and subscription-based plans.

---



## Technologies Used

**Frontend**  
- React  
- Redux (for state management)  
- Tailwind CSS (for styling)  
- ShadCN UI Library (for UI components)  

**Backend**  
- Spring Boot  
- Spring Security (for authentication and authorization)  
- JSON Web Token (JWT) for session management  
- Spring Starter Mail (for email notifications)  

**Database**  
- MySQL  

**Payment Gateway**  
- Razorpay  

---

## Key Features

### Project Management
- **Create Project**: Users can create new projects by providing details like name, description, and tags  
- **Send Invitation**: Project admins can invite users to join their projects  
- **Filter Projects**: Projects can be filtered based on name, tags, category, etc.  
- **Search Projects**: Users can search projects using keywords  
- **Subscription Plans**: Offers paid plans with extended features  

### Issue Management
- **Create Issue**: Add issues within a project with title, description, priority, and more  
- **Filter Issues**: Filter issues by status, priority, assignee, etc.  
- **Comment on Issues**: Team members can collaborate through comments on issues  
- **CRUD Operations**: Full create, read, update, delete functionality for issues  

### Project Communication
- **Project Chat**: Real-time chat system within each project  
- **Email Notifications**: Automated emails for important updates like new issues and comments  

---

## Unique Characteristics

- **Accordion Functionality**: Clean and collapsible UI sections for better user experience  
- **Role-Based UI Rendering**: Components are dynamically shown or hidden based on user roles (Admin, Member)  
- **Reusable Components**: Modular and scalable component-based design using ShadCN  
- **Responsive Design**: Fully mobile-optimized interface  
- **Secure Route Protection**: Pages and actions are protected with JWT-based authentication  
- **Smooth State Transitions**: Redux-powered seamless UI state handling  
- **Email-Triggered Alerts**: Real-time email alerts for project activities  
- **Optimized Project Filters**: Instant and intuitive filtering for projects and issues  
- **Payment Integration**: Razorpay integration for managing subscriptions  

---

## Development Steps

### User Authentication
- Create signup and login APIs  
- Configure Spring Security  
- Implement custom user details and JWT-based authentication  
- Develop user model and user repository  
- Configure JWT for secure login and session handling  

### Project APIs
- Project creation and management endpoints  
- Role-based access control for different project operations  

---
## Getting Started

To run this project locally:

1. **Clone the repository**
git clone https://github.com/supratimsd/Planique.git

markdown
Copy
Edit

2. **Backend Setup**
- Navigate to the backend directory  
- Configure `application.properties` with your MySQL credentials and other environment variables  
- Run the Spring Boot application

3. **Frontend Setup**
- Navigate to the frontend directory  
- Install dependencies  
  ```
  npm install
  ```
- Start the development server  
  ```
  npm start
  ```

4. **Razorpay Integration**
- Set up your Razorpay API keys in the backend environment config

5. **Email Configuration**
- Configure SMTP settings in your `application.properties` for email notifications

---
## Conclusion

Planique is designed to be an all-in-one solution for effective project management. It combines project planning, issue tracking, team communication, and billing under one robust and user-friendly platform. Whether you're working solo or managing a team, Planique helps streamline your workflow and improves collaboration across the board.

---

