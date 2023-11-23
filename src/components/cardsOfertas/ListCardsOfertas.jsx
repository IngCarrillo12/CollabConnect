import React from 'react'
import './styleListCards.css'
import { CardOferta } from './CardOferta'
export const ListCardsOfertas = ({ofertas}) => {
  return (
    <section className='listCards'>
      <div className='container-listCards'>
        <div className='listCards_header'>
            <p>Ofertas de colaboracion</p>
        </div>
        <div className='cards'>
              {
                
                  ofertas.map(data=><CardOferta key={data.id} ofertaId={data.id} title={data.title}  marca={data.marca} redsocial={data.redsocial} fecha={data.fechaPublicacion} pais={data.pais} image={data.image} />)
                
              
              }
        </div>
        </div>
    </section>
  )
}
