import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../resources/Auth'
import { Loader } from '../../components/Loader'
import './styleViewUserPage.css'
import { CardViewUser } from '../../components/cardViewUser/cardViewUser'

export const ViewUserPage = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const loadUser = async(id)=>{
        const user = await getUserById(id)
        setUser(user)
        setLoading(false)
    }
    useEffect(() => {
      loadUser(id)
    }, [])
    
  return (
        <div className='viewUserPage'>
        {
            loading?(
                <Loader/>
            ):(
            <CardViewUser user={user}/>
            )
        }
        
    </div>
  )
}
