import express from "express";
const router = express.Router();

import { allTasks, createTask, deleteTask, updateTask, searchTask } from "../controllers/task.controller";

router.get("/", allTasks);
router.post("/", createTask);
router.delete("/:taskId", deleteTask);
router.put("/", updateTask);
router.get("/search", searchTask);

export default router;