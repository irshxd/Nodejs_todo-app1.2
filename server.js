import { app } from './app.js'
import { connectDb } from "./data/database.js";

connectDb();
app.listen(process.env.PORT,()=>{
    console.log(`server initiated on port:${process.env.PORT} on ${process.env.NODE_ENV} mode`);
})