import React from 'react'
import './styleUserMenu.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../resources/Auth'
import { resetUser } from '../../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'


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
        <Link className='userMenu_linkEditPerfil' to={'/editperfil'}>Editar Perfil</Link>
        <button className='btn btn-logout' onClick={logOut}>Logout</button>
    </div>
  )
}
