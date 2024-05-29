# Co-Chat

Co-Chat is a real-time chat application where users can join different rooms and exchange messages. Users can also upload profile pictures and add a bio to their profile, which is visible to other users in the same chatrooms.

## Features

- User authentication (register and login)
- Real-time messaging using WebSocket
- Join and chat in different rooms
- Store and display chat history
- Responsive design for mobile and desktop
- User profiles with pictures and bios

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js
- **Real-time Communication:** WebSocket
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Storage for Profile Pictures:** AWS S3 or similar service

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/co-chat.git
   cd co-chat
   ```
2. cd backend
   npm install

3. cd ../frontend
   npm install

4. MONGO_URI=mongodb://localhost/cochat
   JWT_SECRET=your_jwt_secret

5. cd backend
   npm start

6. cd ../frontend
   npm start
