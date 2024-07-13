import React from 'react'

type BgBlurContainerProviderProps = {
    children: React.ReactNode;
    hfull?: boolean;
}

function BgBlurContainerProvider({children,hfull}: BgBlurContainerProviderProps) {
  return (
    <div className={`rounded-lg bg-blue-100/70 border border-blue-300 px-8 py-4 flex justify-between ${hfull && "h-full"}`}>
        {children}
    </div>
  )
}

export default BgBlurContainerProvider