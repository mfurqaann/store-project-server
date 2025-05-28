import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js'

import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);


app.get('/', (req, res) => {
    res.send('AUTH API is running...')
})

const PORT = process.env.DB_PORT || 3001;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));