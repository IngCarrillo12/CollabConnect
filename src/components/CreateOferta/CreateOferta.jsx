import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearOferta } from '../../resources/OfertasColaboracion'
import { addOferta } from '../../redux/ofertasSlice'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styleCreateOferta.css'
import toolbar from '../../toolbar'
export const CreateOferta = () => {
    const user = useSelector(state=>state.user)
  const [quillValue, setQuillValue] = useState('');
  const modules = {
    toolbar: toolbar,
  };
    const paises = ["Colombia", "Peru", "Chile", "Mexico", "Argentina"];
    const categorias = ["Bebidas", "Ropa", "Comida", "Automotriz", "Otros"];

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [oferta, setOferta] = useState({
        title:'',
        redsocial:'',
        pais:'',
        categoria:''
    })
    const handleChange = (e)=>{
        const {name, value} = e.target
        setOferta({
            ...oferta,
            [name]:value,
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = {
            ...oferta,
            description: JSON.stringify(quillValue)
        }
        try {
        const ofertas = await crearOferta(user.userId, user.nameMarca, user.photoURL, data)
        dispatch(addOferta(ofertas))
        Swal.fire({
            title: "success",
            text: "Oferta Publicada",
            icon: "Success"
          });
        navigate('/')
        } catch (error) {
            throw error
        }
        
    }
  return (
    <div className='center'>
        <div className='container-createOferta'>
        <div className='createOferta'>
        <h1>Crear Oferta</h1>
        <form className='createOferta_form' action="" onSubmit={handleSubmit}>
            <div  className='form_group form_group_CreateOferta'>
                <label htmlFor="">Title:</label>
                <input className='input' onChange={handleChange} type="text" name='title' placeholder='Title' required />
            </div>
            <div className='form_group form_group_CreateOferta'>
                <label htmlFor="">Red Social:</label>
                <input className='input' onChange={handleChange} type="text" name='redsocial' placeholder='Red social' required />
            </div>
            
            <div className='form_group form_group_CreateOferta'>
              <label htmlFor="pais">País:</label>
              <select className='input' onChange={handleChange} name="pais" required>
                <option value="" disabled selected>Selecciona un país</option>
                {paises.map((pais, index) => (
                  <option key={index} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
            </div>
            <div className='form_group form_group_CreateOferta'>
              <label htmlFor="categoria">Categoría:</label>
              <select className='input' onChange={handleChange} name="categoria" required>
                <option value="" disabled selected>Selecciona una categoría</option>
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className='createoferta_description'>
               <ReactQuill value={quillValue} modules={modules} theme='snow' onChange={(value) => setQuillValue(value)}/>
            </div>
            <button className='btn btn-createOferta' type='submit'>Publicar Oferta</button>
        </form>
    </div>
    </div>
    </div>
  )
}
