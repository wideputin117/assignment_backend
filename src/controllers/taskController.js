import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";
import ApiError from "../utils/error/ApiError.js";
import { asyncHandler } from "../utils/error/asyncHandler.js";

export const createTask = asyncHandler(async(req,res ,next)=>{
    const userId = req.user?._id
    const { projectId } = req.params
    const { title, description,due_date, status } = req.body
    
    let project_exists = await Project.findOne({_id:projectId,userId:userId })
    if(!project_exists){
        return next(new ApiError("Invalid User or Project",500))
    }
    const task_data = await Task.create({
        title:title,
        description:description,
        status:status,
        due_date:due_date,
        projectId:projectId
    })

    if(!task_data){
        return next(new ApiError("Unable to create task",500))
    }
      project_exists.tasks.push(task_data._id);
      await project_exists.save();
    return res.status(201).json({message:"Task Added Successfully",data:task_data, success:true})
})



export const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;

  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, status, due_date },
    { new: true, runValidators: true }
  );

  if (!task) {
    return next(new ApiError("Task not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

 
export const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return next(new ApiError("Task not found", 404));
  }

   await Project.findByIdAndUpdate(task.projectId, {
    $pull: { tasks: task._id },
  });

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

 
export const getTasksByProject = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;
  const { status } = req.query;

  const filter = { projectId };

  if (status) {
    filter.status = status;
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});