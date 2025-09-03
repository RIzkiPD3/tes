import express from 'express';
import * as reminderController from '../controllers/reminderController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reminders
 *   description: Task reminders
 */

/**
 * @swagger
 * /reminders:
 *   get:
 *     summary: Get all reminders
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reminders
 */
router.get('/', authenticateToken, reminderController.getAll);

/**
 * @swagger
 * /reminders/{id}:
 *   get:
 *     summary: Get reminder by ID
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Reminder found
 *       404:
 *         description: Reminder not found
 */
router.get('/:id', authenticateToken, reminderController.getById);

/**
 * @swagger
 * /reminders:
 *   post:
 *     summary: Create a new reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, reminder_time]
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               reminder_time:
 *                 type: string
 *                 format: date-time
 *               task_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reminder created
 *       401:
 *         description: Authentication required
 */
router.post('/', authenticateToken, reminderController.create);

/**
 * @swagger
 * /reminders/{id}:
 *   put:
 *     summary: Update a reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               reminder_time:
 *                 type: string
 *                 format: date-time
 *               is_sent:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Reminder updated
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Reminder not found
 */
router.put('/:id', authenticateToken, reminderController.update);

/**
 * @swagger
 * /reminders/{id}:
 *   delete:
 *     summary: Delete reminder
 *     tags: [Reminders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Reminder deleted
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Reminder not found
 */
router.delete('/:id', authenticateToken, reminderController.deleteReminder);

export default router;
