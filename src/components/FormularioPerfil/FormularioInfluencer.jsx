import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { actualizarFirestore, subirImagen } from '../../resources/Auth';
import { useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import toolbar from '../../toolbar'
import './styleFormularios.css'

export const FormularioInfluencer = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState({ instagram: '', description: '', pais: ''});
  const [image, setImage] = useState(null);
  const {quill, quillRef} =useQuill({
        modules:{
            toolbar:toolbar
        }
    })
  const paises = ["Colombia", "Chile", "Mexico", "Argentina", "Uruguay"];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {
        const data = {
          ...updateUser,
          description: JSON.stringify(quill.getContents())
      }
        const newImageUrl = await subirImagen(user.userId, image);
        await actualizarFirestore(user.userId,{...data,photoURL:newImageUrl} );
        navigate('/')
      }
      
    } catch (error) {
      console.error('Error al manejar el formulario:', error);
      // Puedes manejar este error según tus necesidades
    }
  };

  return (
    <div className='center container-formPerfil'>
      <div className='formPerfil'>
        <h1>Completando informacion requerida</h1>
      <form action="" className='formPerfil_form' onSubmit={handleSubmit}>
        <div className='form_container_form_group'>
        <div className='form_group form_group-formPerfil'>
          <label htmlFor="instagram">@ Instragram</label>
          <input className='input input-formPerfil' onChange={handleChange} type="text" name="instagram" placeholder="@CandyFiesta" />
        </div>
        <div className='form_group form_group-formPerfil'>
              <label htmlFor="pais">País:</label>
              <select className='input input-formPerfil' onChange={handleChange} name="pais" required>
                <option value="" disabled selected>Selecciona un país</option>
                {paises.map((pais, index) => (
                  <option key={index} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div  className='form_group'>
          <label htmlFor="image">Subir Imagen</label>
          <input onChange={handleImageChange} type="file" name="image" required />
        </div>
            <label htmlFor="">Description</label>
            <div className='createoferta_description'>
                <div className='description-oferta' ref={quillRef}>
                </div>
            </div>
        
        <button className='btn' type="submit">Guardar</button>
      </form>
    </div>
    </div>
  );
};