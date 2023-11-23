import React, { useEffect } from 'react'
import './styleCardViewUser.css'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
export const CardVistaUser = ({user}) => {
    const {quill, quillRef} =useQuill({
        readOnly: true,
        modules:{
            toolbar: false
        }
    })
    const loadDescription = async () => {
        if (quill && quillRef.current) {
          const data = await user.description;
          const description = await JSON.parse(data);
          quill.setContents([]);
    
          // Establece el nuevo contenido
          quill.setContents(description);
        }
      };
    useEffect(() => {
      loadDescription()
    }, [quill,user])
    
  return (
    <div className='editPerfil'>
    <div className='container'>
      <div className='editPerfil_container'>
          <div className='editPerfil_container_img'>
              <img src={user.photoURL} alt="" />
          </div>
          <div className='editPerfil_container_form'>
            <h1>Perfil</h1>
            {
              user.marca?(
                <>
              <div className='form_group firstName'>
                  <label htmlFor="nameMarca">Razon Social: </label>
                  <input disabled className='input' value={user.nameMarca} type="text"  name='nameMarca'  />
              </div>
              <div className='form_group lastName'>
              <label htmlFor="nit">Nit: </label>
              <input disabled className='input' value={user.nit} type="text"  name='nameMarca'  />
          </div>
          </>
              ):(
                <>
               <div className='form_group firstName'>
                  <label htmlFor="firstName">Nombre: </label>
                  <input disabled className='input' value={user.firstName} type="text"  name='firstName'  />
              </div>
              <div className='form_group lastName'>
              <label htmlFor="lastName">Apellido: </label>
              <input disabled className='input' value={user.lastName} type="text"  name='lastName'  />
          </div>
          <div className='form_group_birthday'>
          <label htmlFor="">Fecha de nacimiento:</label>
          <div className='container-form_group-birthday'>
        <div className='form_group'>
        <input disabled className='input birthday' value={user.birthday.day} type="text"  name='day'  />
        </div>
        <div className='form_group'>
        <input disabled className='input birthday' value={user.birthday.month} type="text"  name='month'  />
        </div>
        <div className='form_group'>
        <input disabled className='input birthday' value={user.birthday.year} type="text"  name='year}'  />
        </div>
      </div>
      </div>
                </>
              )
            }
              <div className='form_group form_group-formPerfil pais'>
            <label htmlFor="pais">País:</label>
            <input disabled className='input' value={user.pais} type="text"  name='namePais' />
          </div>
              <div className='form_group redsocial'>
                  <label  htmlFor="instagram">Instagram: </label>
                  <input disabled className='input' value={user.instagram} type="text"  name='instagram'  />
              </div>
              <div className='createoferta_description'>
              <label>Descripcion</label>
              <div className='description-oferta' ref={quillRef}>
              </div>
          </div>
          </div>
          </div>
          
      </div>
  </div>
  )
}
