import express from 'express';
import { clerkWebhooks } from '../controllers/userController.js';

const userRouter = express.Router();

// Route to handle Clerk webhooks
userRouter.post('/webhooks', clerkWebhooks);


// Export the userRouter
export default userRouter;
