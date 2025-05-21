import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const protect = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        console.log('[protect] No token in cookies');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('[protect] Token OK:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('[protect] Invalid token:', err.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
};