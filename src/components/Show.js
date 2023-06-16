import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
  //----------------------------------------------1 - configuramos los hooks
  const [passws, setPassws] = useState( [] )

  //----------------------------------------------2 - referenciamos a la DB firestore
  const passwsCollection = collection(db, "passws")

  //----------------------------------------------3 - Funcion para mostrar TODOS los docs
  const getPassws = async ()   => {
   const data = await getDocs(passwsCollection)
   //console.log(data.docs)
   setPassws(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(passws)
  }
  //----------------------------------------------4 - Funcion para eliminar un doc
  const deletePassw = async (id) => {
   const passwDoc = doc(db, "passws", id)
   await deleteDoc(passwDoc)
   getPassws()
  }
  //----------------------------------------------5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el pass?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deletePassw(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }
  //----------------------------------------------6 - usamos useEffect
  useEffect( () => {
    getPassws()
    // eslint-disable-next-line
  }, [] )
  //----------------------------------------------7 - devolvemos vista de nuestro componente
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>App</th>
                <th>Pass</th>
                <th>User</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { passws.map( (passw) => (
                <tr key={passw.id}>
                  <td>{passw.app}</td>
                  <td>{passw.pass}</td>
                  <td>{passw.user}</td>
                  <td>{passw.email}</td>
                  <td>
                    <Link to={`/edit/${passw.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(passw.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show