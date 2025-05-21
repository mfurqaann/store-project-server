import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const generateToken = (userId) => {
    const user = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    return user;
}