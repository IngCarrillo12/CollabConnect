import React from 'react'
import './styleUserMenu.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../resources/Auth'
import { resetUser } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
export const UserMenu = ({name, email, image, setOpenMenu}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut = ()=>{
      logout()
      dispatch(resetUser())
      setOpenMenu(false)
      navigate('/')
  }
  return (
    <div className='userMenu'>
      <div className='userMenu_group'>
        <img width={"38px"}  src={image} alt="foto perfil" />
         <h3 className='userMenu_name'> {name}</h3>
      </div>
        <h4 className='userMenu_email'><b>Email:</b><br/> {email}</h4>
        <button className='btn btn-login' onClick={logOut}>Logout</button>
    </div>
  )
}
