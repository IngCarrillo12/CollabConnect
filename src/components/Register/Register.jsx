import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Register.css'
import { signUp } from '../../resources/Auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/userSlice'
export const Register = () => {
  const [user, setUser] = useState({firstName:'', lastName: "", birthday:{day:'',month:'',year:''}, marca:false, email:"", password:"", photoURL:""})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Manejar cambios en el checkbox
      setUser((prevUser) => ({
        ...prevUser,
        [name]: checked,
      }));
    } else if (name === 'day' || name === 'month' || name === 'year') {
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
        photoURL: 'https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg',
      }));
    }
};


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await signUp(user)
      dispatch(addUser(response))
      if(response)navigate("/") 
    } catch (error) {
      
    }
  }
  return (
    <>
   <div className='container center'>
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
        <div className='from_group-birthday'>
          <div className='form_group'>
            <label htmlFor="day">Dia</label>
            <input onChange={handleChange} type="number" name='day' className='input input-birthday' placeholder='12' required />
          </div>
          <div className='form_group'>
            <label htmlFor="month">Mes</label>
            <input onChange={handleChange} type="number" name='month' className='input input-birthday' placeholder='7' required />
          </div>
          <div className='form_group'>
            <label htmlFor="year">Anho</label>
            <input onChange={handleChange} type="number" name='year' className='input input-birthday' placeholder='2001' required />
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
        <div className="form_group checkbox">
              <label htmlFor="marca">Eres una Marca?</label>
              <input
                onChange={handleChange}
                type="checkbox"
                name="marca"
                className="input"
                checked={user.marca}
              />
            </div>
            <label className='message-info' htmlFor="">Al no marcar que eres marca asumiremos que eres influencer</label>
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
