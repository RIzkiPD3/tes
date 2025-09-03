import { Request, Response } from 'express';
import db from '../models';

const { Task, User, Category } = db;

interface AuthRequest extends Request {
  user?: any;
}

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const tasks = await Task.findAll({
      where: userId ? { user_id: userId } : {},
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Category, as: 'category', attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        ...(userId && { user_id: userId })
      },
      include: ['user', 'category']
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
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

    const task = await Task.create({
      ...req.body,
      user_id: userId
    });
    res.status(201).json(task);
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

    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        user_id: userId
      }
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    await task.update(req.body);
    res.status(200).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const task = await Task.findOne({
      where: { 
        id: req.params.id,
        user_id: userId
      }
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    await task.destroy();
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
