import { Request, Response } from 'express';
import db from '../models';

const { Category, User, Task } = db;

interface AuthRequest extends Request {
  user?: any;
}

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const categories = await Category.findAll({
      where: userId ? { user_id: userId } : {},
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Task, as: 'tasks' }
      ]
    });
    res.status(200).json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const category = await Category.findOne({
      where: { 
        id: req.params.id,
        ...(userId && { user_id: userId })
      },
      include: ['user', 'tasks']
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const category = await Category.create({
      ...req.body,
      user_id: userId
    });
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const category = await Category.findOne({
      where: { 
        id: req.params.id,
        user_id: userId
      }
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    
    await category.update(req.body);
    res.status(200).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const category = await Category.findOne({
      where: { 
        id: req.params.id,
        user_id: userId
      }
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    
    await category.destroy();
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
