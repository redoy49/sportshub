# SportsHub | Sports Club Management System

SportsHub is a comprehensive web application designed for the efficient management of a single sports club. This platform facilitates seamless coordination between users, members, and administrators, providing a structured environment for court bookings, membership handling, and financial tracking. Built with a modern technology stack, it ensures a robust and responsive experience across all device types.

## Project Links

* Live Website: https://athletohub.web.app/
* Admin Credentials:
  * Email: sportshub@gmail.com
  * Password: sportshub

## Core Features

* Multi Role Access: Dedicated interfaces and permissions for Users, Members, and Administrators.
* Secure Authentication: Robust login and registration system powered by Firebase.
* Dynamic Booking System: Interactive court selection with session slots and automated price calculation.
* Payment Integration: Secure transaction processing via Stripe with support for promotional coupons.
* Real Time Notifications: Instant feedback through custom toast notifications and modal alerts.
* Data Management: Efficient state handling and API synchronization using TanStack Query.
* Advanced Dashboards: Specialized administrative and personal panels for monitoring activities and managing records.
* Responsive Design: Fully optimized layout for mobile, tablet, and desktop environments.
* Persistent Sessions: Reliable authentication state management to prevent unnecessary redirects on page refresh.
* Flexible Data Presentation: Support for both card and table views in transaction histories.

## Role Based Functionalities

### User Capabilities
* Profile Management: View personal registration details and account information.
* Court Reservations: Browse available sports courts and submit booking requests.
* Booking Tracking: Monitor the status of pending reservations with options to cancel.
* Club Announcements: Stay informed with the latest updates from the club administration.

### Member Capabilities
* Membership Tracking: View active membership status and start dates.
* Advanced Booking Management: Access to approved and confirmed booking lists.
* Streamlined Payments: Dedicated payment gateway with coupon application features.
* Transaction History: Detailed record of all past payments with layout toggle options.

### Administrative Capabilities
* System Overview: Real time statistics on total users, members, courts, and revenue.
* Booking Approval: Review and process booking requests from users and members.
* User and Member Management: Searchable directories with options for role updates or record deletion.
* Court Configuration: Full CRUD operations for managing club facilities.
* Coupon Management: Create and update promotional codes for the club.
* Communication Tools: Author and manage club wide announcements.

## Technology Stack

### Frontend
* React: For building a dynamic and component based user interface.
* Tailwind CSS: For modern and utility first styling.
* DaisyUI: For polished and accessible UI components.
* TanStack Query: For efficient server state management.
* React Router: For advanced navigation and private route protection.

### Backend and Infrastructure
* Node.js and Express: For the RESTful API services.
* MongoDB: For flexible and scalable data storage.
* Firebase Auth: For secure identity management.
* Stripe API: For integrated payment processing.
* Axios: For reliable HTTP communication with interceptor support.

## Installation and Setup

1. Clone the repository:
   git clone https://github.com/redoy49/sportshub.git

2. Navigate to the project directory:
   cd sportshub/client

3. Install dependencies:
   npm install

4. Configure environment variables:
   Create a .env file in the root directory and include your Firebase and Stripe configurations.

5. Start the development server:
   npm run dev

## Project Structure

* src/components: Reusable UI elements and shared layouts.
* src/context: Authentication and global state providers.
* src/hooks: Custom logic for API calls and authentication checks.
* src/pages: Individual page components for public and dashboard routes.
* src/routes: Routing configuration and access control definitions.
* src/assets: Static resources including images and icons.
