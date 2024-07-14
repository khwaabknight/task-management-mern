import { useDispatch, useSelector } from "react-redux"
import BgBlurContainerProvider from "../Providers/BgBlurContainerProvider"
import { RootState } from "../../store/store"
import { setTasks, TaskType } from "../../store/features/task/tasksSlice"
import { Button } from "../ui/button"
import axios from "axios"
import UpdateTaskButton from "./UpdateTaskButton"
import toast from "react-hot-toast"


function TaskList() {
    const dispatch = useDispatch();
    const {token} = useSelector((state:RootState) => state.user)
    const {tasks} = useSelector((state:RootState) => state.tasks)

    const deleteHandler = (task : string) => {
        console.log("delete : ",task)
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/task/${task}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            dispatch(setTasks(res.data.data))
            toast.success("Task deleted")
        }).catch(err => {
            console.log(err)
            toast.error("Task delete failed")
        })
    }
  return (
    <BgBlurContainerProvider hfull>
        <div className="w-full">
        {
            tasks.length === 0 ?
            <div>No tasks matching your filter</div> :
            tasks.map((task : TaskType) => (
                <div key={task._id} className="flex justify-between items-center border-b border-blue-300 p-2 w-full">
                    <div className="w-full flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h3 className="text-3xl font-semibold">{task.title}</h3>
                            <div className="flex gap-2">
                                <UpdateTaskButton task={task}/>
                                <Button type="button" className="hover:bg-red-600 bg-red-500 text-white rounded-lg" onClick={() => deleteHandler(task._id)}>Delete</Button>
                            </div>
                        </div>
                        <p className="text-gray-600 text-base pl-3">{task.description}</p>
                        <div className="flex gap-5">
                            <p className="rounded-sm px-3 py-1 bg-lime-200">Due by : {(new Date(task.dueDate)).toDateString()}</p>
                            <p className={`
                                ${task.priority === 5 && "bg-red-500"}
                                ${task.priority === 4 && "bg-orange-500"}
                                ${task.priority === 3 && "bg-yellow-500"}
                                ${task.priority === 2 && "bg-lime-500"}
                                ${task.priority === 1 && "bg-green-500"}
                                text-white rounded-sm px-3 py-1`
                            }>Priority : {task.priority}</p>
                            <p className={`
                                ${task.status === "DONE" && "bg-green-500"}
                                ${task.status === "DOING" && "bg-yellow-500"}
                                ${task.status === "TODO" && "bg-red-500"}
                                text-white rounded-sm px-3 py-1`
                            }>Status : {task.status}</p>
                        </div>
                    </div>
                    
                </div>
            ))
        }
        </div>
    </BgBlurContainerProvider>
  )
}

export default TaskList