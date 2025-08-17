import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String, required:true},
    status:{
        type:String,
        enum:["todo","in-progress","done"],
        default:"todo"
    },
    due_date:{
        type:Date
    },
    projectId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Project"
    }
},{
    timestamps:true
})
export const Task = mongoose.model("Task",TaskSchema)