import { Request, Response } from 'express';
import User from '../models/user.model';
import Task from '../models/task.model';
import mongoose from 'mongoose';
require('dotenv').config();

export const allTasks = async (req: Request, res: Response) => {
    // get all tasks
    // return success response
    try {
        const {userId} = req.params;
        const tasks = await Task.find({author: userId}).sort({createdAt: -1}).exec();
        return res.status(200).json({
            success: true,
            error: false,
            message: "All tasks fetched successfully",
            data: tasks,
        });        
    } catch (error) {
        console.error("Error in GET_ALL_TASKS controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });        
    }    
}

export const createTask = async (req: Request, res: Response) => {
    // check if required fields are provided
    // create new task
    // push task id to user tasks array
    // return success response

    const { userId, title, description, status, dueDate, priority } = req.body;
    if (!userId || !title || !description) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Insufficient Data",
            data: null,
        });
    }

    try {
        const newTask = new Task({
            title,
            description,
            author: userId,
            status,
            dueDate,
            priority,
        });
        await newTask.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Task created successfully",
            data: newTask,
        });
        
    } catch (error) {
        console.error("Error in CREATE_TASK controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });        
    }
}

export const updateTask = async (req: Request, res: Response) => {
    // check if required fields are provided
    // check if task exists
    // update task
    // return success response

    const { taskId, title, description, status, dueDate, priority } = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Task not found",
                data: null,
            });
        }
        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;
        if (priority) task.priority = priority;
        await task.save();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Task updated successfully",
            data: task,
        });
        
    } catch (error) {
        console.error("Error in UPDATE_TASK controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });        
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    // check if required fields are provided
    // check if task exists
    // delete task
    // return success response

    const { taskId } = req.body;

    try {
        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({
            success: true,
            error: false,
            message: "Task deleted successfully",
            data: null,
        });
        
    } catch (error) {
        console.error("Error in DELETE_TASK controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });        
    }
}

export const searchTask = async (req: Request, res: Response) => {
    // check if required fields are provided
    // search task
    // return success response

    const { userId, search} = req.params;

    try {
        const tasks = await Task.find({author: userId, title:{ $regex: `^${search}`, $options: 'i' }}).exec();
        return res.status(200).json({
            success: true,
            error: false,
            message: "Task searched successfully",
            data: tasks,
        });
        
    } catch (error) {
        console.error("Error in SEARCH_TASK controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }
}

export const filterTaskByPriority = async (req: Request, res: Response) => {
    // check if required fields are provided
    // search task
    // return success response

    const { userId, priority } = req.params;
    try {
        const tasks = await Task.find({author: userId, priority}).exec();
        return res.status(200).json({
            success: true,
            error: false,
            message: "Task filtered successfully",
            data: tasks,
        });        
    } catch (error) {
        console.error("Error in FILTER_TASK_BY_PRIORITY controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }    
}

export const filterTaskByStatus = async (req: Request, res: Response) => {
    // check if required fields are provided
    // search task
    // return success response

    const { userId, status } = req.params;
    try {
        const tasks = await Task.find({author: userId, status}).exec();
        return res.status(200).json({
            success: true,
            error: false,
            message: "Task filtered successfully",
            data: tasks,
        });        
    } catch (error) {
        console.error("Error in FILTER_TASK_BY_STATUS controller: ", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal Server Error",
            data: null,
        });
    }    
}