import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { actualizarFirestore } from '../../resources/Auth'

export const FormularioInfluencer = () => {
    const user = useSelector(state=>state.user)
    const [updateUser, setUpdateUser] = useState({instagram:'', description:''})
    const handleChange = (e)=>{
        const {name, value} = e.target
        setUpdateUser({
            ...updateUser,
            [name]:value
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await actualizarFirestore(user.userId, updateUser)
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="instagram">@ Instragram</label>
            <input onChange={handleChange} type="text" name="instagram" id="" placeholder='@CandyFiesta' />
        </div>
        <div>
            <label htmlFor="description">Descripcion sobre de que se trata tu contenido</label>
            <textarea name='description' onChange={handleChange} type="text" />
        </div>
        <button type='submit'>Guardar</button>
        </form>

    </div>
  )
}
