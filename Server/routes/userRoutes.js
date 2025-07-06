import express from 'express';
import { clerkWebhooks, userCredits } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

// Route to handle Clerk webhooks
userRouter.post('/webhooks', clerkWebhooks);
userRouter.get('/credits',authUser,userCredits)


// Export the userRouter
export default userRouter;
