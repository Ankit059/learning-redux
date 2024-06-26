import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import {actionCreator} from '../state/index'
import { useSelector } from 'react-redux'

export default function Main() {

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreator,dispatch);
  const balance = useSelector(state=>state.amount)

  return (
    <div className='flex justify-center mt-6 bg-slate-100 h-14  '>
            <button onClick={()=>{actions.withdrawMoney(100)}} className='border-blue-900 mt-3 rounded border-2 h-9 w-12 bg-red-400 text-xl font-bold active:w-10 h'>-</button>
            <h1 className='text-2xl mx-6 mt-3'>Update Balance is $ {balance}</h1>
            <button onClick={()=>{actions.depositeMoney(100)}} className='border-blue-900 mt-3 rounded border-2 h-9 w-12 bg-green-400 text-xl font-bold active:w-10'>+</button>
        </div>
  )
}
