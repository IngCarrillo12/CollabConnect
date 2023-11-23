import React, { useEffect, useState } from 'react'
import { ListCardsOfertas } from '../../components/cardsOfertas/ListCardsOfertas'
import { obtenerTodasLasOfertas } from '../../resources/OfertasColaboracion'
export const OfertasPage = () => {
    const [ofertas, setOfertas] = useState([])
    const loadOfertas = async()=>{
        const ofertas = await obtenerTodasLasOfertas()
        setOfertas(ofertas)
    }
    useEffect(() => {
      loadOfertas()
    }, [])
    
  return (
    <div>
        <ListCardsOfertas ofertas={ofertas}/>
    </div>
  )
}
