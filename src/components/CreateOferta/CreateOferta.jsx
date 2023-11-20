import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { crearOferta } from '../../resources/OfertasColaboracion'
export const CreateOferta = () => {
    const user = useSelector(state=>state.user)
    const [oferta, setOferta] = useState({
        title:'',
        redsocial:'',
        pais:'',
        description:'',
        requisitos:''
    })
    const handleChange = (e)=>{
        const {name, value} = e.target
        setOferta({
            ...oferta,
            [name]:value,
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        crearOferta(user.userId, oferta)
    }
  return (
    <div>
        <form action="">
            <input type="text" name='title' placeholder='Title' />
            <input type="text" name='redsocial' placeholder='Red social' />
            <input type="text" name='pais' placeholder='Pais' />
            <input type="text" name='description' placeholder='Descripcion' />
            <input type="text" name='requisitos' placeholder='Requisitos' />
            <button type='submit'>Crear</button>
        </form>
    </div>
  )
}
