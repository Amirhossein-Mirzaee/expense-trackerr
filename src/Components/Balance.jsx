// import React, { useContext } from 'react'
// import { GlobalContext } from '../context/GlobalState'
// export const Balance = () => {
//     const {transactions} = useContext(GlobalContext)

//     const amount = transactions.map(transaction => transaction.amount);
//     const total = 
//   return (
//     <div>
//         <h4>Your Balance</h4>
//         <h1 id='balance'>${total}</h1>
//     </div>
//   )
// }
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export const Balance = () => {
const {transactions} = useContext(GlobalContext)
 
const amount = transactions.map((transaction)=>transaction.amount)
const total = amount.reduce((acc, item ) =>(acc += item),0).toFixed(2)
  return (
    <div>
      <h1>Your Balance</h1>
      <h4 id='balance'>${total}</h4>
    </div>
  )
}
