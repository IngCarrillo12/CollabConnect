import React, { useEffect, useState } from 'react'
import './styleListCardOfertas.css'
import { Card } from './Card'
import { useSelector } from 'react-redux'
import { Loader } from '../Loader'
export const ListCardOfertas = () => {
  const user = useSelector(state=>state.user)
  const ofertas = useSelector(state=> state.ofertas)
  const [loading, setloading] = useState(true)
  useEffect(() => {
   if(ofertas.length)setloading(false)
  }, [ofertas])
  return (
    <section className='listCardOfertas'>
      <div className='container-listCards'>
        <div className='listCardOfertas_header'>
            <p>Ofertas de colaboracion</p>
        </div>
        <div className='cards-Ofertas'>
              {
                loading?(
                  <Loader/>
                ):(
                  ofertas.map(oferta=><Card key={oferta.id} ofertaId={oferta.id} title={oferta.title} marca={oferta.marca} redsocial={oferta.redsocial} fecha={oferta.fechaPublicacion} pais={oferta.pais} image={oferta.image} />)
                )
              
              }
        </div>
        </div>
    </section>
  )
}
