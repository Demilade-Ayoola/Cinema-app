import {React,useEffect, useState} from 'react'
import PayStackPop from "@paystack/inline-js"
import {Alert} from 'react-bootstrap'
import Ticket from './Ticket'
import {NumericFormat} from 'react-number-format'
import {Link} from 'react-router-dom'

function Paystack({ticket}) {
const [flag, setFlag] = useState(false)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [message, setMessage]= useState('')
const [cancel, setCancel]=useState('')
const [amount, setAmount]= useState('')
const [home, setHome]= useState(true)

useEffect(() => {
  
setAmount(3000* ticket)
}, [])

function handlePay(e){
    e.preventDefault();
if(!email || !name ){
    setFlag(true);
}else{
    setFlag(false)
    const paystack= new PayStackPop()
    paystack.newTransaction({
        key:'pk_test_8a7597f7dd06572719f20a315cf00871def662ff',
    amount: amount * 100,
    name,
    email,
    onSuccess(transaction){
        setMessage(`Payment Complete! Check your E-mail for details. Reference ${transaction.reference}`)
        
},
onCancel(){
    setCancel('You have Canceled the transaction')
}
    })
}
}
    return (
    <>
    {home? (    
        <div bg = 'dark'>
    {message ? <Link to='/'><Alert color="primary" variant = 'info'>
        {message}
    </Alert></Link> 
    : null}
{cancel ?  <Alert color="primary" variant = 'info'>
        {cancel}
    </Alert>
    : null}
    <div className="progress-container">
            <div className="progress-text">
              <div className="mini-title">Step 2 of 2</div>
              </div>
              <div className="progress-indicator"><span className="line2"></span></div></div>
   
    <form className='form-control2' onSubmit={handlePay}>
        <h3 className='text-center brand-color py-2'>Make Payment</h3>
    <div className='fields'>
    <div>
        <label className='text-light'> YOUR NAME</label>
    <input  className=' input m-1 p-1 px-3' type='text' value={name} placeholder='Enter Name'onChange={(event)=>setName(event.target.value)}/>
    </div>

    <div>
        <label className='text-light'>YOUR EMAIL</label>
    <input  className=' input m-1 p-1 px-3' type='email' value={email} placeholder='Enter Your Email'onChange={(event)=>setEmail(event.target.value)}/>
    </div>
    <div>
        <label className='text-light'> AMOUNT</label>
    <div>
   <input readOnly className=' input m-1 p-1 px-3' type='number' value= {amount}  prefix={'₦'} onChange={(event)=>setAmount(event.target.value)}/>
    </div>
    </div>
    <button  className=" input input-button text-center m-1 my-2 btn" type='submit'>
        Pay
    </button>
    </div>
    {flag && (
    <Alert color="primary" variant = 'danger'>
        Please fill correct info
    </Alert>
)
}
    </form>

    </div>
  
    ):(
        <Ticket/>
    )}
    </>
  )
}

export default Paystack