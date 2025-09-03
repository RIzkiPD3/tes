import { Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcryptjs';

const { User } = db;

interface AuthRequest extends Request {
  user?: any;
}

// Get all users (admin only - bisa diubah sesuai kebutuhan)
export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const requestedUserId = parseInt(req.params.id);
    
    // User hanya bisa melihat profile sendiri
    if (userId !== requestedUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findByPk(requestedUserId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update user (hanya bisa update profile sendiri)
export const update = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const requestedUserId = parseInt(req.params.id);
    if (userId !== requestedUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { name, email, password } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updateData: any = { name, email };
    
    // Hash password jika ada update password
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    await user.update(updateData);
    
    // Return user tanpa password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user (hanya bisa delete profile sendiri)
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const requestedUserId = parseInt(req.params.id);
    if (userId !== requestedUserId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
  