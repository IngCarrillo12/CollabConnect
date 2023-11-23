import React from 'react'
import { Link } from 'react-router-dom'
export const CardUser = ({userId, name, pais, nit, redsocial, marca, image}) => {
  return (
    <Link to={`/viewUser/${userId}`} className='card'>
    <div className='card_img'>
        <img src={image} alt="Foto Perfil" />
    </div>
    <div className='card_contenido'>
        <h3>{name}</h3>
        <span>{marca?(`Nit: ${nit}`):('')}</span>
    </div>
    <div className='card_red-social'>
        <p>{redsocial}</p>
    </div>
    <div className='card_fecha-pais'>
        <p>{pais}</p>
    </div>
</Link>
  )
}
