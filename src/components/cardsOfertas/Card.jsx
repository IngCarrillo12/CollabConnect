import React from 'react'

export const Card = () => {
  return (
    <div className='card'>
        <div className='card_img'>
            <img src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg" alt="" />
        </div>
        <div className='card_contenido'>
            <h3>Gatorade Sandia</h3>
            <span>Gatorade</span>
        </div>
        <div className='card_red-social'>
            <p>Instagram</p>
        </div>
        <div className='card_fecha-pais'>
            <span>25/10</span>
            <p>Colombia</p>
        </div>
    </div>
  )
}
