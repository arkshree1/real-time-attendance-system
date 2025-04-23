# Real-Time Attendance System

A real-time attendance tracking system built as part of a backend internship assignment using **NestJS**, **WebSockets**, **Redis**, and **MongoDB**. This project allows class-based attendance tracking with instant updates across clients.


## Features

- Real-time communication via WebSocket (Socket.IO)
- Attendance saved to MongoDB and cached in Redis
- Class-based room subscription and broadcast
- Redis-powered quick access and debugging utilities
- Simple HTML client to test the flow (`test-client.html`)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/arkshree1/real-time-attendance-system.git
cd real-time-attendance-system

2. Install dependencies

npm install

3. Start Redis and MongoDB
Make sure both services are running locally on their default ports:

Redis → localhost:6379

MongoDB → mongodb://localhost:27017/attendance

4. Run the app

npm run start
The server will be live at: http://localhost:3000

 Tech Stack
NestJS for backend framework

Socket.IO via NestJS Gateway for real-time communication

Redis for fast caching

MongoDB for permanent storage

HTML + JS frontend to simulate clients

 Testing the System
Open multiple browser tabs with:
http://localhost:3000/public/test-client.html

Enter the same Class ID to join the same room

Use different Student IDs to mark attendance

Watch real-time updates across all clients in the same room


