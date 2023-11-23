import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obtenerTodasLasOfertas } from '../../resources/OfertasColaboracion'
import { ListCardsOfertas } from '../../components/cardsOfertas/ListCardsOfertas'
import { Loader } from '../../components/Loader'
import './styleOfertasCategoriaPage.css'

export const OfertasCategoriaPage = () => {
    const {categoria} = useParams()
    const [ofertasCategoria, setOfertasCategoria] = useState([])
    const [loading, setLoading] = useState(true)
    const loadOfertas = async()=>{
        try {
            const allOfertas = await obtenerTodasLasOfertas()
            const ofertasCategoria = allOfertas.filter(oferta=>oferta.categoria.toLowerCase()===categoria.toLowerCase())
            setOfertasCategoria(ofertasCategoria)
            setLoading(false)
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
      loadOfertas()
    }, [categoria])
     
  return (
    <div className='ofertasCategoriaPage'>
        {
            loading?(
                <Loader/>
            ):(
                <>
                {
                    ofertasCategoria.length?(
                        <ListCardsOfertas ofertas={ofertasCategoria}/>
                    ):(
                        <div className='ofertasCategoriaPage_message'>
                            <h3>No se encontrados ofertas de esta categoria ({categoria})</h3>
                        </div>
                        
                    )
                }
                </>
                
            )
        }
        
    </div>
  )
}
