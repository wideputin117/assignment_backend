import  express from "express"
import { authenticateToken } from "../middlewares/authMiddleware.js"
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/projectController.js"
const router = express.Router()

router.route(`/`).post(authenticateToken,createProject).get(authenticateToken,getAllProjects)
router.route(`/:id`).get(authenticateToken,getProjectById).patch(authenticateToken,updateProject).delete(authenticateToken,deleteProject)

export default router