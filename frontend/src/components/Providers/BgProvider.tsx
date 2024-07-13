

function BgProvider({children,imgSrc}: {children: React.ReactNode,imgSrc:string}){
  return (
    <div className="flex items-center h-screen">
        <img src={imgSrc} alt='' className='object-cover w-full h-screen absolute inset-0 blur-sm -z-10'/>
        <div className='w-11/12 max-w-7xl mx-auto'>
            {children}
        </div>
    </div>
  )
}

export default BgProvider