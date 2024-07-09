

function BgProvider({children}: {children: React.ReactNode}){
  return (
    <div>
        <img src='/images/bg-pattern.jpg' alt='' className='object-cover w-full h-screen absolute inset-0 blur-sm -z-10'/>
        <div className='w-11/12 max-w-7xl mx-auto bg-white/20 backdrop-blur-lg mt-16 md:mt-20 lg:mt-32 rounded-lg'>
            {children}
        </div>
    </div>
  )
}

export default BgProvider