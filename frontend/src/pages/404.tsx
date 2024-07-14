import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div className='w-11/12 max-w-6xl flex flex-col items-center justify-center mx-auto mt-32'>
        <h1 className='text-red-500 text-3xl'>404 - Not Found</h1>
        <img src="/images/404.jpg" alt="" className='w-1/2'/>
        <Link to={'/'} className="bg-orange-400 px-8 py-3 text-white rounded-md mt-10">
            Go back
        </Link>    
    </div>)
}

export default NotFound