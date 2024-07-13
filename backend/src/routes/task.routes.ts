import express from "express";
const router = express.Router();

import { allTasks, createTask, deleteTask, updateTask, searchTask, filterTasks } from "../controllers/task.controller";
import { auth } from "../middlewares/auth.middleware";

router.get("/",auth ,allTasks);
router.post("/",auth ,createTask);
router.put("/:taskId",auth, updateTask);
router.delete("/:taskId",auth ,deleteTask);
router.get("/search",auth, searchTask);
router.get("/filter",auth, filterTasks);

export default router;