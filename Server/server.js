import express from 'express';
import "dotenv/config";
import cors from 'cors';
import { connect } from 'mongoose';
import connectDB from './configs/mongodb.js';

//App config 
const PORT = process.env.PORT || 4000;
const app = express();

//Database config
await connectDB();

//middlewares
app.use(express.json());
app.use(cors());




//Api
app.get('/', (req, res) => res.send('Hello from EraseIt Server'));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
 
