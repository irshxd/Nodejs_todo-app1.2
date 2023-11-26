import { Router } from "express"; 
import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      
      // Assuming Task is your Mongoose model for tasks
      const task = await Task.create({
        title,
        description,
        user: req.user, // Assuming you have a user object attached to the request
      });

      res.status(201).json({
        success: true,
        message: "Task added successfully",
        task: task, // You can send back the created task if needed
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  export const myNewTask= async (req,res,next)=>{
    try {
    const userId  = req.user._id;
    const tasks = await Task.find({user:userId});

    res.status(201).json({
        success:true,
        tasks,
    })
  }  catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: 'Task updated',
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};


export const deleteTask= async(req,res)=>{
    const {id }= req.params;
    const task = await Task.findById(id);
    task.isCompleted =!task.isCompleted;
    await task.deleteOne();
    res.status(201).json({
        success:true,
        message:"Task deleted"
    })
}
  