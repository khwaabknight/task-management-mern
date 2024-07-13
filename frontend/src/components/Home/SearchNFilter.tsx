import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FaSearch } from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import BgBlurContainerProvider from '../Providers/BgBlurContainerProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../store/features/task/tasksSlice';
import toast from 'react-hot-toast';

type Filter = "All" | "TODO" | "DOING" | "DONE" | "Priority-1" | "Priority-2" | "Priority-3" | "Priority-4" | "Priority-5";
function SearchNFilter() {
    const dispatch = useDispatch();
    const {token} = useSelector((state:RootState) => state.user)
    const [searchString, setSearchString] = useState("");
    const [filter, setFilter] = useState<Filter>("All");
    const handleSearch = (e:any) => {
        e.preventDefault();
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/task/search`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                search: searchString
            }
        })
        .then(res => {
            dispatch(setTasks(res.data.data))
            toast.success("Search completed")
        }).catch(err => {
            console.log(err)
            toast.error("Search failed")
        });
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/task/filter`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                filter
            }
        })
        .then(res => {
            dispatch(setTasks(res.data.data))
            toast.success("Filter completed")
        }).catch(err => {
            console.log(err)
            toast.error("Filter failed")
        });
    },[filter]);

  return (
    <BgBlurContainerProvider >
        <form onSubmit={handleSearch} className='flex gap-2'>
            <Input 
                type="text" 
                placeholder="Search" 
                value={searchString} 
                className="rounded-md border border-gray-500 py-2 px-5 w-fit"
                onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white p-2 aspect-square">
                <FaSearch />
            </Button>
        </form>

        <Select onValueChange={(value : Filter) => setFilter(value)}>
            <SelectTrigger className="w-[180px] border-gray-500">
                <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="TODO">TODO</SelectItem>
                <SelectItem value="DOING">DOING</SelectItem>
                <SelectItem value="DONE">DONE</SelectItem>
                <SelectItem value="Priority-1">Priority-1</SelectItem>
                <SelectItem value="Priority-2">Priority-2</SelectItem>
                <SelectItem value="Priority-3">Priority-3</SelectItem>
                <SelectItem value="Priority-4">Priority-4</SelectItem>
                <SelectItem value="Priority-5">Priority-5</SelectItem>
            </SelectContent>
        </Select>
    </BgBlurContainerProvider>
  )
}

export default SearchNFilter