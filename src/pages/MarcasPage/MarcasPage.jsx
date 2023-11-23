import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../resources/Auth'
import { Loader } from '../../components/Loader'
import './styleMarcasPage.css'
import { ListCardUsers } from '../../components/CardsUsers/ListCardUsers'
export const MarcasPage = () => {
    const [marcas, setMarcas] = useState()
    const [loading, setLoading] = useState(true)
    const loaddata = async()=>{
        const response = await getAllUsers()
        const marcas = response.filter(data=>data.marca)
        setMarcas(marcas)
        setLoading(false)
    }
    useEffect(() => {
      loaddata()
    }, [])
    
  return (
    <div className='marcasPage'>
        {
            loading?(
                <Loader/>
            ):(
             <ListCardUsers users={marcas}/>
            )
        }
        
    </div>
  )
}
