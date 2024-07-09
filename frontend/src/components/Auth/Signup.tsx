import React, { useState } from 'react'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { IoLogInOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/features/user/userSlice';
import BgProvider from '../Providers/BgProvider';

type SignupFormVals = {
    fullname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<SignupFormVals>({
        fullname:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
        
    }

    const submitHandler = (e:any) => {
        e.preventDefault();
        console.log(formData)
    
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`,formData)
        .then((res) => {
          console.log(res)
    
          const token = res?.data?.data?.token;
          const user = res?.data?.data?.user;
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(user))

          dispatch(setUser(user))
          navigate('/')
        }).catch((error) => {
          console.log(error);
        })
    }

    return (
        <BgProvider>
            <div className='flex justify-around items-center px-10'>
                <div className='md:w-1/2 sm:w-2/5 w-0 md:p-20 sm:p-10 flex justify-center items-center overflow-hidden'>
                    <div>
                        <img src='/images/signup-side.jpg' alt='' className='object-contain w-full'/>
                    </div>
                </div>

                <div className='md:w-2/3 sm:w-3/5 w-full flex justify-center items-center pt-20 pb-8'>
                    <div className='border rounded-lg relative flex flex-col items-center gap-3 p-5 sm:px-2 md:w-full h-full w-5/6'>
                        <div className='rounded-full p-1 border bg-white absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                            <div className='aspect-square rounded-full overflow-hidden '>
                                <img src='/images/auth.jpg' alt='' className='object-contain h-16 w-full'/>
                            </div>
                        </div>
                        <div className='text-center w-full sm:mb-20 mb-10'>
                            <h2 className='py-3 font-bold text-lg'>Register</h2>
                            <p>Sign up as a New User</p>
                        </div>

                        <form className='max-w-[250px] w-full flex flex-col gap-5' onSubmit={submitHandler}>
                            {/* Name */}
                            <div>
                                <Label htmlFor='fullname'/>
                                <Input type='text' placeholder='Enter name' name='fullname' id='fullname' value={formData.fullname} onChange={changeHandler}/>
                            </div>
                            {/* Email */}
                            <div>
                                <Label htmlFor='email'/>
                                <Input type='email' placeholder='Enter email' name='email' id='email' value={formData.email} onChange={changeHandler}/>
                            </div>

                            {/* Password */}
                            <div className='relative'>
                                <Label htmlFor='password'/>
                                <Input type={showPass ? 'text' : 'password'} placeholder='Enter password' name='password' id='password' className='pr-16' onChange={changeHandler} value={formData.password}/>
                                <button type='button' className='absolute bottom-1/2 translate-y-1/2 right-5' onClick={() => setShowPass(!showPass)}>
                                    {
                                    !showPass ? <RxEyeClosed/> : <RxEyeOpen />
                                    }
                                </button>
                            </div>
                            <div className='relative'>
                                <Label htmlFor='confirmPassword'/>
                                <Input type={showPass ? 'text' : 'password'} placeholder='Re-enter password' name='confirmPassword' id='confirmPassword' className='pr-16' onChange={changeHandler} value={formData.confirmPassword}/>
                                <button type='button' className='absolute bottom-1/2 translate-y-1/2 right-5' onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                    {
                                    !showConfirmPass ? <RxEyeClosed/> : <RxEyeOpen />
                                    }
                                </button>
                            </div>

                            {/* Submit */}
                            <Button type='submit' className='gap-4'>
                                <p>Signup</p>
                                <IoLogInOutline size={18} />
                            </Button>

                            {/* Signup link */}
                            <div>
                                <div className='relative'>
                                    <div className='absolute inset-0 flex items-center'>
                                    <div className='w-full border-t border-gray-300'/>
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                    <span className=' bg-white px-2 text-gray-500'>
                                        Or
                                    </span>
                                    </div>
                                </div>
                                <div className='flex gap-2 justify-center text-sm px-2 my-2 text-gray-500'>
                                    <p>Already have an account?</p>
                                    <Link to={'/login'} className='underline cursor-pointer'>
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </BgProvider>
    )
}

export default Signup