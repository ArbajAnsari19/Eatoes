import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from './config/mongo';
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';
import authRoutes from './routes/authRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors(
  {
    origin: 'https://eatoes-frontend.vercel.app', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
));
app.use(express.json());

// Connect DB
connectMongoDB();

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/auth', authRoutes);


app.get('/test', (req, res) => {
  res.send('API is running...');
});

// Start server
// Only listen to port if not in Vercel environment
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
