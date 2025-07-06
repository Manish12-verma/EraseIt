import express from 'express';
import { clerkWebhooks, paymentRazorpay, userCredits } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

// Route to handle Clerk webhooks
userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay-razor',authUser,paymentRazorpay)

// Export the userRouter
export default userRouter;
