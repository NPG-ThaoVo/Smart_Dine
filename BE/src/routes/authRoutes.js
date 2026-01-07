import express from 'express';
import {googleLoginController} from '../controllers/authController.js';

const router = express.Router();

router.post('/google-login', googleLoginController);
export default router;