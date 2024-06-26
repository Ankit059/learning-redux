export const depositeMoney =  (amount) =>{
    return (dispatch)=>{
        // call dispatch
        dispatch({
            type:'deposite',
            payload: amount
        })
    }
}

export const withdrawMoney =  (amount) =>{
    return (dispatch)=>{
        dispatch({
            type:'withdraw',
            payload: amount
        })
    }
}