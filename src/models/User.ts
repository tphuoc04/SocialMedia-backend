import mongoose, { Document, Schema } from 'mongoose';
import db from './db';
import { User } from '../types';

const userSchema = new Schema<User>({
    // User Infomation
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    facebookId: { 
        type: String, 
        unique: true 
    },
    googleId: { 
        type: String, 
        unique: true 
    },

    // account info
    active: Boolean,
    lock: Boolean,
    token: String
    
}, { timestamps: true });

const User = mongoose.model<User>('User', userSchema);

export default User;
