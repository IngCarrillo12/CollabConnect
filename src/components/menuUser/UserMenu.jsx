// UserMenu.jsx
import React, { useEffect, useRef } from 'react';
import './styleUserMenu.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../resources/Auth';
import { resetUser } from '../../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export const UserMenu = ({ name, email, image, setOpenMenu, marca }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const logOut = () => {
    logout();
    dispatch(resetUser());
    setOpenMenu(false);
    navigate('/');
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };
  useEffect(() => {
   
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenMenu]);

  return (
    <div className='userMenu' ref={modalRef}>
      <div className='userMenu_group'>
        <img width={'38px'} src={image} alt='foto perfil' />
        <h3 className='userMenu_name'> {name}</h3>
      </div>
      <h4 className='userMenu_email'>
        <b>Email:</b>
        <br/> {email}
      </h4>
      <Link className='userMenu_linkEditPerfil' to={marca?('/ofertasPublicadas'):('/mispostulaciones')}>
        {
          marca?(
            'Ofertas Publicadas'
          ):(
            "Mis Postulaciones"
            )
        
        }
      </Link>
      <Link className='userMenu_linkEditPerfil' to={'/editperfil'}>
        Editar Perfil
      </Link>
      <button className='btn btn-logout' onClick={logOut}>
        Logout
      </button>
    </div>
  );
};
