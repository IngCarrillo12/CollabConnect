import React, { useEffect, useState, useRef } from 'react'
import "./Header.css"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserMenu } from '../menuUser/UserMenu'
import { OptionsRegister } from '../OptionsRegister/OptionsRegister.jsx'

export const Header = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const user = useSelector(state => state.user)
    const [openMenu, setOpenMenu] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    const [currentPage, setCurrentPage] = useState('');
    const [optionsRegister, setOptionsRegister] = useState(false)
    const handleOptionsRegister = (e)=>{
        e.stopPropagation();
        setOptionsRegister(!optionsRegister)
    }
    const handleCreateOfert = ()=>{
        navigate('/crearOferta')
    }
    const handleSearchChange = (e)=>{
        setValueSearch(e.target.value)
    }
    const handleSubmitSearch = (e)=>{
        e.preventDefault();
        navigate(`/ofertas/${valueSearch}`);
        setValueSearch('')
    }
    const handlePerfil =(e)=>{
        e.stopPropagation();
        setOpenMenu(!openMenu)
    }
    useEffect(() => {
        const path = location.pathname.split('/')[1];
        setCurrentPage(path);
        
    }, [location])
    
    
  return (

        <header className='header_info'>
        <Link to={'/'} className='header_logo-title'>
            <img className='header_logo' src="/Logo-CollabConnect.webp" alt="Logo" />
            <h3 className='header_title'>CollabConnect</h3>
        </Link>
            <form action="" onSubmit={handleSubmitSearch} className='form-search'>
                <div className='form-search_group'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVR4nNWUvWsVURDF1wgqREvBRrQIEu0VUliI1oJiZZFCwUTQRvwD/IgfQTsVLPwPRBBMYyPYaGdlJ2IjFoEgPN85Z2b9GLlvrxGevrd3jUE8sN3Z85s7c+9U1b8UyZ0unXLokkNXa+ismU2vOdjM9jm5ZOA3p2L4M+plTR78s3DghIHIYR+MvCfoXA2dceiWg28GEPCLkRc7hUs6YuBnA786dDkitgx7ImJjDc0ZqARK4KLwiJhMFZf+pJ/FGMldrQAjL+S2PCqqqKoqh242M+H9dgD0YlA9OVMKiF5vezMLLafWjTZGbEg9NfBTREyUApKMepUKk7S7GqWI2DZoD/i26ignl5q54cA4wMRgYNRKV4Dl1rY+QCNfZ+Pe0vCImDSQBvYjYtNYs0PXmlvEO6UAQefzzXvYau73+zvSkA2sJR1q85vZHiM/pkdZA/uLKqqh+bwGegYcG+kjZ5x633j1vOoih66sLjnwmUunU2Cq0smT6SH+sgSh650gBhx38N3vNmnepitOPh6C3OgEiYjNBjvq5F0nnzj41MAHTs5GxNZ82sU1QUrk0MIQ5PZ/C1lcnREISVPrAVnI4Yf/evgPrUvl4/Qd5uJR/W64uyQAAAAASUVORK5CYII="/>
                    <input type="text" value={valueSearch} onChange={handleSearchChange} />
                </div>
                <button className='form-search_btn btn' type="submit">Search</button>
            </form>
            <nav className='header_nav'>
                <ul>
                    <li><Link to={'/influencers'} className={currentPage === 'influencers' ? 'active' : ''}>Influencers</Link></li>
                    <li><Link to={'/marcas'} className={currentPage === 'marcas' ? 'active' : ''}>Marcas</Link></li>
                    <li><Link to={'/ofertas'} className={currentPage === 'ofertas' ? 'active' : ''}>Ofertas</Link></li>
                </ul>
            </nav>
            <div className='header_btnsAuth'>
                {
                    !user.email?(
                        <>
                        <button onClick={()=>navigate('/login')} className='header_btnsAuth_btn-login btn'>Login</button>
                        <button onClick={handleOptionsRegister} className='header_btnsAuth_btn-register btn' >Register</button>
                        {
                     optionsRegister&&(
                        <OptionsRegister setOptionsRegister={setOptionsRegister}/>
                    )
                }
                        </>
                        
                    ):(
                        <div className='userAuth'>
                        <img width="50" onClick={handlePerfil} height="50" src={user.photoURL} alt="user-male-circle"/>
                       {
                        user.marca&&(
                           <button onClick={handleCreateOfert} className='btn btn-crearOferta'>Crear Oferta</button> 
                        )
                       }
                       
                        {
                            openMenu&&(
                                <UserMenu marca={user.marca}  name={user.nameMarca || `${user.firstName} ${user.lastName}`} email={user.email} image={user.photoURL} setOpenMenu={setOpenMenu}/>
                            )
                        }
                        
                       
                         </div>
                    )
                }
                
            </div>
            </header>
  )
}
