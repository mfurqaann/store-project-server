import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js'

import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://store-project-gilt.vercel.app/',
    credentials: true
}));
app.use(cookieParser())
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('AUTH API is running...')
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));