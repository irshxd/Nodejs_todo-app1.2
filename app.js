import  express  from "express";
import  mongoose  from "mongoose";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

export const app = express();
const router = express.Router();


config({
    path:'./data/config.env'
})

// middlewere
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:[],
    methods:['GET','POST','DELETE','PUT']
}));
// routes
app.use('/api/v1/users',userRouter);
app.use('/api/v1/task',taskRouter);

app.get('/',(req,res)=>{
    res.send("page started");
    })

app.use((err, req, res, next) => {
    // Handle the error
    console.error(err);
    res.status(500).send('Internal Server Error');
  });


