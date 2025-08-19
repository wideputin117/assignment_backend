import { Project } from "../models/Project.js";
import ApiError from "../utils/error/ApiError.js";
import { asyncHandler } from "../utils/error/asyncHandler.js";

export const createProject = asyncHandler(async(req, res, next)=>{
    const userId = req?.user?._id
    const {title,description,status} = req.body;
    if(!title || !description){
        return next(new ApiError("Inavlid Request",400))
    }
    const data= await Project.create({
        userId:userId,
        title:title,
        description:description,
    })

    if(!data){
        return next(new ApiError("Failed to create the project",500))
    }
    return res.status(201).json({message:"Project Created Successfully",data:data, success:true})
})

export const getAllProjects = asyncHandler(async (req, res, next) => {
  const userId = req?.user?._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Project.countDocuments({ userId });
  const projects = await Project.find({ userId })
    .populate("tasks")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const paginate={
      totalPages:Math.ceil(total / limit),
      total:total,
      page:page,
      limit:limit
    }
  return res.status(200).json({
    success: true,
    paginate:paginate,
    data: projects,
  });
});

 
export const getProjectById = asyncHandler(async (req, res, next) => {
  const userId = req?.user?._id;
  const { id } = req.params;

  const project = await Project.findOne({ _id: id, userId }).populate("tasks");

  if (!project) {
    return next(new ApiError("Project not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: project,
  });
});

 
export const updateProject = asyncHandler(async (req, res, next) => {
  const userId = req?.user?._id;
  const { id } = req.params;
  const { title, description, status } = req.body;

  const project = await Project.findOneAndUpdate(
    { _id: id, userId },
    { title, description, status },
    { new: true, runValidators: true }
  );

  if (!project) {
    return next(new ApiError("Project not found or not authorized", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

 
export const deleteProject = asyncHandler(async (req, res, next) => {
  const userId = req?.user?._id;
  const { id } = req.params;

  const project = await Project.findOneAndDelete({ _id: id, userId });

  if (!project) {
    return next(new ApiError("Project not found or not authorized", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});