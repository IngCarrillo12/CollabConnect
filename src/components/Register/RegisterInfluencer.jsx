import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Register.css'
import { signUp } from '../../resources/Auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/userSlice'
import Swal from "sweetalert2"

export const RegisterInfluencer = () => {
  const [user, setUser] = useState({firstName:'', lastName: "", birthday:{day:null,month:null,year:null}, marca:false, email:"", password:""})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const regexDia = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const regexMes = /^(0[1-9]|1[0-2])$/;
  const regexAno = /^(198\d|199\d|200[0-3])$/;
  const regexNombre = /^[A-Za-z]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
   if (name === 'day' || name === 'month' || name === 'year') {
      setUser((prevUser) => ({
        ...prevUser,
        birthday: {
          ...prevUser.birthday,
          [name]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
};


  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!regexDia.test(user.birthday.day)|| !regexMes.test(user.birthday.month) || !regexAno.test(user.birthday.year)){
      Swal.fire({
        title: "ERROR",
        text: "Fecha de nacimiento invalida. Por favor Corregir",
        icon: "error"
      });
      return;
    }
    if(!regexNombre.test(user.firstName) && !regexNombre.test(user.firstName)){
      Swal.fire({
        title: "ERROR",
        text: "Nombre Invalido, Por favor Corregir",
        icon: "error"
      });
      return;
    }
    try {
      const response = await signUp(user)
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
        <label htmlFor="firstName">FirtName:</label>
        <input onChange={handleChange} type="text" name='firstName' className="input input-name" placeholder="Jose" required/>
        </div>
       <div className='form_group'>
       <label htmlFor="lastName">LastName:</label>
        <input onChange={handleChange} type="text" name='lastName' className="input input-name" placeholder="Dominguez" required/>
       </div>
        </div>
        <div className='form_group'>
        <label htmlFor="">Fecha de nacimiento:</label>
        <div className='from_group-birthday'>
          <div className='form_group'>
            <input onChange={handleChange} type="number" name='day' className='input input-birthday' placeholder='Dia' required />
          </div>
          <div className='form_group'>
            <input onChange={handleChange} type="number" name='month' className='input input-birthday' placeholder='Mes' required />
          </div>
          <div className='form_group'>
            <input onChange={handleChange} type="number" name='year' className='input input-birthday' placeholder='Ano' required />
          </div>
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
