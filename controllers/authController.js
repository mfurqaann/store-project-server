import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });


        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(name, email, hashedPassword);

        res.status(201).json({ message: 'User registered successfully!' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = generateToken(user.id);

        sendToken(user, res, token)
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    })

    return res.json({ message: 'Logged out successfully' })
}

export const sendToken = (user, res, token) => {

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({ message: 'Login success', user })
}