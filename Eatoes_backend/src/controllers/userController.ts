import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


export class UserController {

    static async signup (req: Request, res: Response) : Promise<void>{
        try {
            const { name, email, password } = req.body;
        
            const existingUser = await User.findOne({ email });
            if (existingUser) {
               res.status(400).json({ message: 'User already exists' });
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
        
            res.status(201).json({ message: 'User created successfully' });
          } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ message: 'Server error during signup' });
          }
    }

    static async login (req: Request, res: Response) : Promise<void> {
        try {
            const { email, password } = req.body;
        
            const user = await User.findOne({ email });
            if (!user) {
               res.status(400).json({ message: 'Invalid credentials' });
               return;
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
               res.status(400).json({ message: 'Invalid credentials' });
            }
        
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
        
            res.status(200).json({ token });
          } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error during login' });
          }
    }
}


export default UserController;