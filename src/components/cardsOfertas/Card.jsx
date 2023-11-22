import React from 'react'
import { Link } from 'react-router-dom'
export const Card = ({ofertaId, title, marca, redsocial, fecha, pais, image}) => {
    console.log(marca)
    const fechaObjeto = new Date(fecha);
// Obtener día y mes
    const dia = fechaObjeto.getDate();
    const mes = fechaObjeto.getMonth() + 1;
  return (
    <Link to={`/oferta/${ofertaId}`} className='card'>
        <div className='card_img'>
            <img src={image} alt="" />
        </div>
        <div className='card_contenido'>
            <h3>{title}</h3>
            <span>{marca}</span>
        </div>
        <div className='card_red-social'>
            <p>{redsocial}</p>
        </div>
        <div className='card_fecha-pais'>
            <span>{dia+'/'+mes }</span>
            <p>{pais}</p>
        </div>
    </Link>
  )
}
