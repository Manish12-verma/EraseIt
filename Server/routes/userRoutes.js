import express from 'express';
import { clerkWebhooks, paymentRazorpay, userCredits, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

// Route to handle Clerk webhooks
userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay-razor',authUser,paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay); // Route to handle Razorpay payment success verification

// Export the userRouter
export default userRouter;
