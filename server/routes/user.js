import express from 'express';
import validateSignup from '../validation/signupValidate';
import { signupController, verifyAccountController } from '../controllers/userController';
import protect from '../middleware/protectRoute';

const router = express.Router();
router.post('/signup', validateSignup, signupController);
router.patch('/verify', protect, verifyAccountController);

export default router;
