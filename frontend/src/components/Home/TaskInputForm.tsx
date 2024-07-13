import { TaskType } from "../../store/features/task/tasksSlice"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DrawerClose } from "../ui/drawer";

type TaskInputFormProps = {
    submitHandler: () => void;
    setFormData: React.Dispatch<React.SetStateAction<TaskType>>;
    formData : TaskType;
}

function TaskInputForm({submitHandler, formData, setFormData} : TaskInputFormProps) {

    const {title, description, priority, status, dueDate} = formData;

    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitHandler();
    }

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onPriorityValueChange = (value:string) => {
        setFormData({
            ...formData,
            priority: parseInt(value) as 1 | 2 | 3 | 4 | 5
        })
    }

    const onStatusValueChange = (value:string) => {
        setFormData({
            ...formData,
            status: value as "TODO" | "DOING" | "DONE"
        })
    }

    const setdueDate = (date:Date) => {
        setFormData({
            ...formData,
            dueDate: date
        })
        console.log()
    }


  return (
    <form onSubmit={onSubmitHandler} className="pb-20 flex flex-col gap-3">
        <Input 
            type="text" 
            placeholder="Enter Task Title"
            value={title}
            name="title"
            required
            onChange={changeHandler}
            className="w-full"
        />

        <Textarea 
            placeholder="Enter Task Description"
            value={description}
            name="description"
            required
            onChange={changeHandler}
            className="w-full"
        />

        <Select
            name="status"
            onValueChange={onStatusValueChange}
            value={status}          
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Enter status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="TODO">TODO</SelectItem>
                <SelectItem value="DOING">DOING</SelectItem>
                <SelectItem value="DONE">DONE</SelectItem>
            </SelectContent>
        </Select>

        <Select
            name="priority"
            onValueChange={onPriorityValueChange}
            value={priority && priority.toString()}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Enter priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">Priority 1</SelectItem>
                <SelectItem value="2">Priority 2</SelectItem>
                <SelectItem value="3">Priority 3</SelectItem>
                <SelectItem value="4">Priority 4</SelectItem>
                <SelectItem value="5">Priority 5</SelectItem>
            </SelectContent>
        </Select>

        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a dueDate</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => setdueDate(date as Date)}
                    initialFocus
                />
            </PopoverContent>
        </Popover>

        <DrawerClose>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 mt-5">
                Submit
            </Button>
        </DrawerClose>

    </form>
  )
}

export default TaskInputForm