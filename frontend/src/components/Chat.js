import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = io('http://localhost:5000');

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await axios.get('/api/chat/general', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessages(res.data);
        };

        fetchMessages();

        socket.emit('joinRoom', { room: 'general' });

        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        return () => socket.disconnect();
    }, [socket]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const res = await axios.post('/api/chat/general', { message: newMessage }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            socket.emit('message', res.data);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h1>Chat Room</h1>
            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg._id} className="chat-message">
                        <strong>{msg.user.username}</strong>: {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
