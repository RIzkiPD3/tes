import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../models';
import { generateToken } from '../middleware/auth';

const { User } = db;

// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = generateToken(newUser.id, newUser.email);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user profile
export const getProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
