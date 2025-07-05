import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';

//App config
const PORT = process.env.PORT || 5000;
const app = express();
await connectDB();
 

//Middleware
app.use(cors());

app.use(
  '/api/user/webhooks',
  bodyParser.raw({ type: '*/*' })
);

//API 
app.get('/',(req,res)=>res.send('API is running'));
app.use(
  '/api/user',
  express.json(),
  userRouter
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});