import React from 'react'

export default function Main() {
  return (
    <div className='flex justify-center mt-6 bg-slate-100 h-14  '>
            <button className='border-blue-900 mt-3 rounded border-2 h-9 w-12 bg-red-400 text-xl font-bold active:w-10 h'>-</button>
            <h1 className='text-2xl mx-6 mt-3'>Update Balance</h1>
            <button className='border-blue-900 mt-3 rounded border-2 h-9 w-12 bg-green-400 text-xl font-bold active:w-10'>+</button>
        </div>
  )
}
