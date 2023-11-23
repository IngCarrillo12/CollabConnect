import React, { useState, useEffect } from 'react'
import './styleInfluencersPage.css'
import { ListCardUsers } from '../../components/CardsUsers/ListCardUsers'
import { getAllUsers } from '../../resources/Auth'
import { Loader } from '../../components/Loader'
export const InfluencersPage = () => {
  const [influencers, setInfluencers] = useState()
  const [loading, setLoading] = useState(true)
  const loaddata = async()=>{
    const response = await getAllUsers()
    const marcas = response.filter(data=>!data.marca)
    setInfluencers(marcas)
    setLoading(false)
}
useEffect(() => {
  loaddata()
}, [])
  return (
    <div className='influencersPage'>
    {
      loading?(
          <Loader/>
      ):(
        <ListCardUsers users={influencers}/>
      )
  }
   
    </div>
  )
}
