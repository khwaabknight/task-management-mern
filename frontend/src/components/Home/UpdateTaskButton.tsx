import { Button } from "../ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer"
import TaskInputForm from "./TaskInputForm";
import { useState } from "react";
import { setTasks, TaskType } from "../../store/features/task/tasksSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import toast from "react-hot-toast";

function UpdateTaskButton({task} : {task:TaskType}) {
    const dispatch = useDispatch();
    const {token} = useSelector((state:RootState) => state.user)

    const [formData, setFormData] = useState<TaskType>(task);

    const submitHandler = () => {
        axios.put(`${import.meta.env.VITE_API_BASE_URL}/task/${formData._id}`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            dispatch(setTasks(res.data.data));
            toast.success("Task updated")
        }).catch(err => {
            console.log(err)
            toast.error("Task update failed")
        })
    }
  return (
    <Drawer>
        <DrawerTrigger asChild>
            <Button className="hover:bg-blue-600 bg-blue-500 text-white rounded-lg">
                <p>Edit</p>
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                    <DrawerTitle className='text-2xl'>Edit Task</DrawerTitle>
                    <DrawerDescription>Enter details to edit the task:</DrawerDescription>
                </DrawerHeader>
                <TaskInputForm 
                    submitHandler={submitHandler}
                    setFormData={setFormData}
                    formData={formData}
                />
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default UpdateTaskButton