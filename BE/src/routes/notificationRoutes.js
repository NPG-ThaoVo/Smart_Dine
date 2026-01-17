import express from 'express';
import * as notificationController from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, notificationController.createNotification);
router.get('/', protect, notificationController.getAllNotifications);
router.patch('/:id/read', protect, notificationController.markAsRead);

export default router;
