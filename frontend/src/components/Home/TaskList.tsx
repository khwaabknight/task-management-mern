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
                <div key={task._id} className="flex justify-between items-center border-b border-blue-300 py-2 w-full">
                    <div>
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                        <p>
                        {
                            (new Date(task.dueDate)).toDateString()
                        }
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <UpdateTaskButton task={task}/>
                        <Button type="button" className="hover:bg-red-600 bg-red-500 text-white rounded-lg" onClick={() => deleteHandler(task._id)}>Delete</Button>
                    </div>
                </div>
            ))
        }
        </div>
    </BgBlurContainerProvider>
  )
}

export default TaskList