import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
    const [ app, setApp ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ user, setUser ] = useState('')
    const [ email, setEmail ] = useState('')
  const navigate = useNavigate()

  const passwsCollection = collection(db, "passws")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( passwsCollection, { app: app, pass: pass, user: user, email: email } )
    navigate('/')
    //console.log(e.target[0].value)
  }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Create Passw</h1>
                 <form onSubmit={store}>
                 <div className='mb-3'>
                        <label className='form-label'>App</label>
                        <input
                            value={app}
                            onChange={ (e) => setApp(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  

                    <div className='mb-3'>
                        <label className='form-label'>Pass</label>
                        <input
                            value={pass}
                            onChange={ (e)=> setPass(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>User</label>
                        <input
                            value={user}
                            onChange={ (e)=> setUser(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={ (e)=> setEmail(e.target.value)} 
                            type="email"
                            className='form-control'
                        />                 
                    </div>  
                    <button type='submit' className='btn btn-primary'>Store</button>
                 </form>   
            </div>
        </div>
    </div> 
  )
}

export default Create