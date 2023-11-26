import express from 'express';
import {deleteTask, myNewTask, newTask, updateTask} from '../controllers/task.js'
import { isAuthenticated } from '../middlewere/auth.js';

const router = express.Router();

router.post('/new',isAuthenticated,newTask);

router.post('/my',isAuthenticated,myNewTask);

router.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router;