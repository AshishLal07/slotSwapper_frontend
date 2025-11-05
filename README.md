# SlotSwapper - Peer-to-Peer Time Slot Scheduling App

A modern web application that enables users to discover, request, and swap their calendar time slots with other users. Built with React/Next.js frontend and Node.js/Express backend powered by MongoDB.

## 🎯 Features

- **User Authentication** - Secure sign-up and login with JWT-based authentication
- **Calendar Management** - View your events in a clean, organized dashboard
- **Swappable Slots** - Mark your busy events as "swappable" to offer them to others
- **Marketplace** - Browse and discover swappable time slots from other users
- **Swap Requests** - Send and manage swap requests with incoming/outgoing tracking
- **Real-Time Updates** - Dynamic state management with automatic cache refresh
- **Protected Routes** - Secure pages that require user authentication
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Frontend (React/Next.js)
- **Framework**: Reactjs
- **Authentication**: Context API + JWT tokens


## 🔐 Authentication Flow

1. User signs up or logs in via the auth pages
2. Backend returns a JWT token
3. Token is stored in React Context and localStorage
4. Subsequent API requests include the token in the Authorization header
5. Token is automatically included in all API calls via the `use-api` hook
6. Protected routes check for token and redirect to login if not found

## 🔄 State Management

- **Authentication State**: Managed via React Context (`AuthContext`)
- **API Data**: Fetched and cached using SWR with 5-second revalidation intervals
- **Real-Time Updates**: Automatic cache refresh after user actions (create event, accept swap, etc.)
- **Local Storage**: Auth token persists across page refreshes
