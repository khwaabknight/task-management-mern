import BgBlurContainerProvider from '../Providers/BgBlurContainerProvider'
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { useState } from 'react';
import { MdOutlinePostAdd } from "react-icons/md";
import TaskInputForm from './TaskInputForm';
import { setTasks, TaskType } from '../../store/features/task/tasksSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import toast from 'react-hot-toast';

function AddTaskButton() {

    const dispatch = useDispatch();
    const {token} = useSelector((state:RootState) => state.user)

    const [formData, setFormData] = useState<TaskType>({
        _id: "",
        title: "",
        description: "",
        priority: 1,
        status: "TODO",
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const clearForm = () => {
        setFormData({
            _id: "",
            title: "",
            description: "",
            priority: 1,
            status: "TODO",
            dueDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

    const submitHandler = () => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/task`,formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            dispatch(setTasks(res.data.data))
            clearForm();
            toast.success("Task created")
        }).catch(err => {
            console.log(err)
            toast.error("Task creation failed")
        })
    }
    
  return (
    <BgBlurContainerProvider>
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="secondary" className="w-full h-fit hover:bg-blue-600 bg-blue-500 text-white text-lg rounded-md gap-3">
                    <MdOutlinePostAdd size={20}/>
                    <p>Add Task</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle className='text-2xl'>Create a New Task</DrawerTitle>
                        <DrawerDescription>Enter details to create a new task:</DrawerDescription>
                    </DrawerHeader>
                    <TaskInputForm 
                        submitHandler={submitHandler}
                        setFormData={setFormData}
                        formData={formData}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    </BgBlurContainerProvider>
  )
}

export default AddTaskButton