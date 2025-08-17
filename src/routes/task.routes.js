import express from 'express'
import { authenticateToken } from '../middlewares/authMiddleware.js'
import { createTask, deleteTask, getTasksByProject, updateTask } from '../controllers/taskController.js'

const router = express.Router()
router.route(`/:projectId`).post(authenticateToken,createTask).get(authenticateToken,getTasksByProject)
router.route(`/user/:id`).patch(authenticateToken,updateTask).delete(authenticateToken,deleteTask)
export default router