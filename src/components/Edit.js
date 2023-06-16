import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    const [ app, setApp ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ user, setUser ] = useState('')
    const [ email, setEmail ] = useState('')

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const passw = doc(db, "passws", id)
        const data = {app: app, pass: pass, user: user, email: email}
        await updateDoc(passw, data)
        navigate('/')
    }

    const getPasswById = async (id) => {
        const passw = await getDoc( doc(db, "passws", id) )
        if(passw.exists()) {
            //console.log(product.data())
            setApp(passw.data().app)    
            setPass(passw.data().pass)
            setUser(passw.data().user)    
            setEmail(passw.data().email)
        }else{
            console.log('La app no existe')
        }
    }

    useEffect( () => {
        getPasswById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit Passw</h1>
                 <form onSubmit={update}>
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
                            type="number"
                            className='form-control'
                        />                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>User</label>
                        <input
                            value={user}
                            onChange={ (e)=> setUser(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div> 
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={ (e)=> setEmail(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  
                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit