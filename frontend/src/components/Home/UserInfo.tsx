import { Button } from '../ui/button'
import { TbLogout } from "react-icons/tb";
import { resetUser } from '../../store/features/user/userSlice';
import BgBlurContainerProvider from '../Providers/BgBlurContainerProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { resetTasks } from '../../store/features/task/tasksSlice';
import toast from 'react-hot-toast';


function UserInfo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state:RootState) => state.user)
    const {fullname, email} = user;

    const handleLogout = () => {
        dispatch(resetUser())
        dispatch(resetTasks())
        navigate('/login')
        toast.success('Logout successfully!');
    }
  return (
    <BgBlurContainerProvider>
        <div className="flex items-center gap-5">
            <div className="w-16 h-16 aspect-square overflow-hidden rounded-full">
                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${fullname}`} alt="" className="w-full" />
            </div>
            <div>
                <div> {fullname} </div>
                <div> {email} </div>
            </div>
        </div>
        <Button 
            type="button" 
            variant={'outline'} 
            className="rounded-full aspect-square h-12 w-12 p-3"
            onClick={handleLogout}
        >
            <TbLogout size={24} className=" text-gray-300 hover:text-gray-400"/>
        </Button>
    </BgBlurContainerProvider>
  )
}

export default UserInfo