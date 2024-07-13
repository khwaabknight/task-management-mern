import { Request, Response } from 'express';
import Task from '../models/task.model';
require('dotenv').config();

type Filter = "All" | "TODO" | "DOING" | "DONE" | "Priority-1" | "Priority-2" | "Priority-3" | "Priority-4" | "Priority-5";

export const allTasks = async (req: Request, res: Response) => {
    // get all tasks
    // return success response
    try {
        const userId = req.body.user._id;
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

    const userId = req.body.user._id;
    const {title, description, status, dueDate, priority } = req.body;

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
            dueDate:new Date(dueDate),
            priority,
        });
        await newTask.save();

        const newTasks = await Task.find({author: userId}).sort({createdAt: -1}).exec();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Task created successfully",
            data: newTasks,
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
    // check if user is authorized to update task
    // update task
    // return success response

    const userId = req.body.user._id;
    const { taskId } = req.params;
    const { title, description, status, dueDate, priority } = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task || task.author.toString() !== userId.toString()){
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

        const newTasks = await Task.find({author: userId}).sort({createdAt: -1}).exec();

        return res.status(200).json({
            success: true,
            error: false,
            message: "Task updated successfully",
            data: newTasks,
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
    // check if user is authorized to delete task
    // delete task
    // return success response

    const userId = req.body.user._id;
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        console.log("task : ",task);
        if (!task || task.author.toString() !== userId.toString()){
            return res.status(404).json({
                success: false,
                error: true,
                message: "Task not found",
                data: null,
            });
        }
        await Task.findByIdAndDelete(taskId);
        const newTasks = await Task.find({author: userId}).sort({createdAt: -1}).exec();
        return res.status(200).json({
            success: true,
            error: false,
            message: "Task deleted successfully",
            data: newTasks,
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

    const userId = req.body.user._id;
    const { search} = req.query ?? "";

    console.log("userId : ",userId,"\nsearch : ",search);
    

    try {
        const tasks = await Task.find({
            author: userId,
            title:{ $regex: `^${search}`, $options: 'i' },
        }).exec();
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

export const filterTasks = async (req: Request, res: Response) => {
    // check if required fields are provided
    // search task
    // return success response

    const userId = req.body.user._id;

    const { filter } = req.query ?? "All";

    try {
        let tasks;
        if(filter === "Priority-1" || filter === "Priority-2" || filter === "Priority-3" || filter === "Priority-4" || filter === "Priority-5"){
            tasks = await Task
            .find({author: userId, priority: parseInt(filter[filter.length - 1])})
            .exec();
        }else if(filter === "TODO" || filter === "DOING" || filter === "DONE"){
            tasks = await Task
            .find({author: userId, status: filter})
            .exec();
        }else{
            tasks = await Task
            .find({author: userId})
            .exec();
        }
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