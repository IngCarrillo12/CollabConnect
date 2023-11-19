import React, { useEffect, useState } from 'react'
import "./Header.css"
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserMenu } from '../menuUser/UserMenu'
import { addUser } from '../../redux/userSlice'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../fireBase'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [openMenu, setOpenMenu] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser)dispatch(addUser(currentUser));
        });
    
        return () => unsubscribe();
      }, [dispatch]);
    
  return (
    <header className='header'>
        <div className='header_logo-title'>
            <img className='header_logo' src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg" alt="Logo" />
            <h3 className='header_title'>CollabConnect</h3>
        </div>
            <form action="" className='form-search'>
                <div className='form-search_group'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
                    <input type="text" />
                </div>
                <button className='form-search_btn btn' type="submit">Search</button>
            </form>
            <div className='header_btnsAuth'>
                {
                    !user.email?(
                        <>
                        <button onClick={()=>navigate('/login')} className='header_btnsAuth_btn-login btn'>Login</button>
                        <button onClick={()=>navigate('/register')} className='header_btnsAuth_btn-register btn' >Register</button>
                        </>
                        
                    ):(
                        <div className='userAuth'>
                        <img width="50" onClick={()=>setOpenMenu(!openMenu)} height="50" src={user.photoURL} alt="user-male-circle"/>
                       
                        {
                            openMenu&&(
                                <UserMenu name={user.nombre} email={user.email} image={user.photoURL} setOpenMenu={setOpenMenu}/>
                            )
                           
                        }
                       
                         </div>
                    )
                }
                
            </div>
    </header>
  )
}
