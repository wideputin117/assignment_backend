import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    title:{type: String, required:true},
    description:{type:String , required:true},
    status:{
        type:String,
        enum:["active","completed"],
        default:"active"
    },
    tasks:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Task"
    }],
},{
    timestamps:true
})

export const Project = mongoose.model("Project",ProjectSchema)