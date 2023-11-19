import React from 'react'
import './styleListCardOfertas.css'
import { Card } from './Card'
export const ListCardOfertas = () => {
  return (
    <section className='listCardOfertas'>
      <div className='container'>
        <div className='listCardOfertas_header'>
            <p>Ofertas de colaboracion con marcas de Bebidas</p>
        </div>
        <div className='cards-Ofertas'>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
        </div>
        </div>
    </section>
  )
}
