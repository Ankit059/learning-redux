import React from 'react'
import { useSelector } from 'react-redux'

export const Nav = () => {

    const amount = useSelector(state=>state.amount)

  return (
    <>
        <div className='flex justify-center mt-6 bg-slate-100 h-14  '>
            <h1 className='text-2xl mx-6 mt-3'>Account Balance $ <span className='font-semibold text-blue-500'>{amount}</span></h1>
        </div>
    </>
  )
}
