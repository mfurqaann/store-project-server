import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import db from '../config/db.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, async (req, res) => {
    const userId = req.user.id;

    const [rows] = await db.query('SELECT id, name, email FROM users where id = ? LIMIT 1', [userId]);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(rows[0])
})


export default router;