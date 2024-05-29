import mongoose, { Document, Schema } from 'mongoose';
import db from './db';

interface User {
    // User Info
    name: string;
    username: string,
    email: string;
    password: string;

    // Acount Status
    active: boolean;
    lock: boolean;
    token: string
}

interface UserModel extends User, Document {}

const userSchema = new Schema<UserModel>({
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
        required: true
    },

    // account info
    active: Boolean,
    lock: Boolean,
    token: String
    
}, { timestamps: true });

const UserModel = mongoose.model<UserModel>('User', userSchema);

export default UserModel;
