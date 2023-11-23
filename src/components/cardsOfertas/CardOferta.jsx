import React from 'react'
import { Link } from 'react-router-dom'
export const CardOferta = ({ofertaId, title, marca, redsocial, fecha, pais, image}) => {
   
    function convertirAFechaObjeto(fecha) {
        if (fecha && fecha.seconds !== undefined && fecha.nanoseconds !== undefined) {
          // Es un objeto Timestamp
          return new Date(fecha.seconds * 1000 + fecha.nanoseconds / 1000000);
        } else if (fecha instanceof Date) {
          // Ya es un objeto Date
          return fecha;
        } else {
          // Otro formato de fecha (puede ser una cadena ISO)
          return new Date(fecha);
        }
      }
    const fechaString = convertirAFechaObjeto(fecha)
    const dia = fechaString.getDate()
    const mes = fechaString.getMonth()
  return (
    <Link to={`/oferta/${ofertaId}`} className='card'>
        <div className='card_img'>
            <img src={image} alt="foto user" />
        </div>
        <div className='card_contenido'>
            <h3>{title}</h3>
            <span>{marca}</span>
        </div>
        <div className='card_red-social'>
            <p>{redsocial}</p>
        </div>
        <div className='card_fecha-pais'>
            <span>{`${dia} / ${mes}` }</span>
            <p>{pais}</p>
        </div>
    </Link>
  )
}
