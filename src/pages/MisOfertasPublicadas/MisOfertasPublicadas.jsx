import React, { useEffect, useState } from 'react'
import {obtenerTodasLasOfertas} from '../../resources/OfertasColaboracion'
import { useSelector } from 'react-redux'
import { Loader } from '../../components/Loader'
import { ListCardsOfertas } from '../../components/cardsOfertas/ListCardsOfertas'
export const MisOfertasPublicadas = () => {
    const user = useSelector(state=>state.user)
    const [misOfertas, setMisOfertas] = useState([])
    const [loading, setLoading] = useState(true)
    const loadOfertas = async()=>{
        const ofertas = await obtenerTodasLasOfertas()
        console.log(ofertas)
        const misOfertas = ofertas.filter(oferta=>oferta.idMarca === user.userId)
        setMisOfertas(misOfertas)
        setLoading(false)
    }
    useEffect(() => {
      loadOfertas()
    }, [user])
    console.log('entro')
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
