import mongoose, { ObjectId, Schema } from "mongoose";

export type TaskType = {
    _id: string;
    title: string;
    description: string;
    author: ObjectId;
    status: "TODO" | "DOING" | "DONE";
    dueDate: Date;
    priority: 1 | 2 | 3 | 4 | 5;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<TaskType>({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        index:true,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["TODO","DOING","DONE"],
        default:"TODO",
    },
    dueDate:{
        type:Date,
        default:Date.now(),
    },
    priority:{
        type:Number,
        enum:[1,2,3,4,5],
        default:1,
    }
},{timestamps:true});

export const Task = mongoose.model<TaskType>("Task", taskSchema);
export default Task;