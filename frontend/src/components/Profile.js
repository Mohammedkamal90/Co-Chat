import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/updateProfile', { bio, profilePicture }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Update Profile</h1>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
            <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} placeholder="Profile Picture URL" />
            <button type="submit">Update</button>
        </form>
    );
};

export default Profile;
