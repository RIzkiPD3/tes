import { Request, Response } from 'express';
import db from '../models';

const { Reminder, Task, User } = db;

interface AuthRequest extends Request {
  user?: any;
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { title, message, reminder_time, task_id } = req.body;
    const reminder = await Reminder.create({ 
      title, 
      message, 
      reminder_time, 
      user_id: userId, 
      task_id 
    });
    res.status(201).json(reminder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const reminders = await Reminder.findAll({
      where: userId ? { user_id: userId } : {},
      include: [
        { model: Task, as: 'task' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
      ]
    });
    res.json(reminders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const reminder = await Reminder.findOne({
      where: { 
        id: req.params.id,
        ...(userId && { user_id: userId })
      },
      include: [
        { model: Task, as: 'task' },
        { model: User, as: 'user' }
      ]
    });
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res.json(reminder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const reminder = await Reminder.findOne({
      where: { 
        id: req.params.id,
        user_id: userId
      }
    });
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });

    const { title, message, reminder_time, is_sent } = req.body;
    await reminder.update({ title, message, reminder_time, is_sent });
    res.json(reminder);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReminder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const reminder = await Reminder.findOne({
      where: { 
        id: req.params.id,
        user_id: userId
      }
    });
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });

    await reminder.destroy();
    res.json({ message: 'Reminder deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
