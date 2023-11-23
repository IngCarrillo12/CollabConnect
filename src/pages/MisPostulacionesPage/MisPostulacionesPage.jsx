import React, { useEffect, useState } from 'react'
import { obtenerTodasLasOfertas } from '../../resources/OfertasColaboracion'
import { useSelector } from 'react-redux'
import { ListCardsOfertas } from '../../components/cardsOfertas/ListCardsOfertas'
import { Loader } from '../../components/Loader'

export const MisPostulacionesPage = () => {
    const user = useSelector(state=>state.user)
    const [misOfertas, setMisOfertas] = useState([])
    const [loading, setLoading] = useState(true)
    const loadOfertas = async()=>{
        const ofertas = await obtenerTodasLasOfertas()
        const misOfertas = ofertas.filter(oferta=>oferta.postulados.includes(user.userId))
        setMisOfertas(misOfertas)
        setLoading(false)
    }
    useEffect(() => {
      loadOfertas()
    }, [user])
  return (
    <div>
        {
            loading?(
                <Loader/>
            ):(
                <>
                {
                    misOfertas.length?(
                        <ListCardsOfertas ofertas={misOfertas}/>
                    ):(
                        <h1>no hay</h1>
                    )
                }
                </>
               
            )
        }
       
    </div>
  )
}
