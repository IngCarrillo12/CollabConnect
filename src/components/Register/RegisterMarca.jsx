import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Register.css'
import { signUp } from '../../resources/Auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/userSlice'
import Swal from "sweetalert2"

export const RegisterMarca = () => {
  const [user, setUser] = useState({razonsocial:'', marca:true, nit:'', email:"", password:""})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value, } = e.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await signUp(user)
      console.log(response)
      dispatch(addUser(response))
      if(response){
        Swal.fire({
          title: "success",
          text: "Registrado Correctamente",
          icon: "success"
        });
        if(response.marca){
          navigate("/formulario/marca") 
        }else{
          navigate("/formulario/influencer") 
        }
      }
      
    } catch (error) {
        throw error
    }
  }
  return (
    <>
   <div className='container-auth-register center'>
    <div className="form-container">
      <p className="title">Sign Up</p>
      <form action="" onSubmit={handleSubmit} className='form'>
      <div className='form_group-name'>
        <div className='form_group'>
        <label htmlFor="razonsocial">Razon social:</label>
        <input onChange={handleChange} type="text" name='razonsocial' className="input input-name" placeholder="Gatorade" required/>
        </div>
       <div className='form_group'>
       <label htmlFor="nit">Nit:</label>
        <input onChange={handleChange} type="number" name='nit' className="input input-name" placeholder="10202032423" required/>
       </div>
        </div>
        <div className='form_group'>
        <label htmlFor="email">Email:</label>
        <input onChange={handleChange} type="email" name='email' className="input" placeholder="YourEmail@company.com"/>
        </div>
        <div className='form_group'>
        <label htmlFor="password">Password:</label>
        <input onChange={handleChange} type="password" name='password' className="input" placeholder="*******"/>
        <label className='message-info' htmlFor="">Debe tener min 6 caracteres</label>
        </div>
        <button className="form-btn" type='submit'>Sign Up</button>
        </form>
      <p className="sign-up-label">
      Do you already have an account?<Link to={"/login"} className="sign-up-link">Log In</Link>
      </p>
      </div>
      </div>
    </>
  )
}
