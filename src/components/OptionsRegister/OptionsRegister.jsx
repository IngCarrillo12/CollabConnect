import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styleOptionsRegister.css'
export const OptionsRegister = ({setOptionsRegister}) => {
  const refOptions = useRef(null);
  const handleClickOutside = (event) => {
    if (refOptions.current && !refOptions.current.contains(event.target)) {
      setOptionsRegister(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOptionsRegister]);
  return (
    <div className='optionsRegister' ref={refOptions}>
        <Link to={'/register/marca'}>Marca</Link>
        <Link to={'/register/influencer'}>Influencer</Link>
    </div>
  )
}
