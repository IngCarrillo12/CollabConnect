import React, { useState, useEffect }from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../fireBase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditPerfil.css'
import { useQuill } from 'react-quilljs'

import Swal from "sweetalert2"

export const EditPerfil = () => {
  const user = useSelector(state=>state.user)
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userUpdate, setUserUpdate] = useState(user)
  const [edit, setEdit] =useState(false)
  const regexDia = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;
  const regexMes = /^(0[1-9]|1[0-2])$/;
  const regexAno = /^(198\d|199\d|200[0-3])$/;
  const regexNombre = /^[A-Za-z]+$/;
  const paises = ["Colombia", "Chile", "Mexico", "Argentina", "Uruguay"];
  const [quillValue, setQuillValue] = useState('');
  const modules = {
    toolbar: !edit ? false : { container: [['bold', 'italic', 'underline', 'strike'], ['link']] },
  };
const handleChange = (e) => {
  const { name, value } = e.target;
if (name === 'day' || name === 'month' || name === 'year') {
    setUserUpdate((prevUser) => ({
      ...prevUser,
      birthday: {
        ...prevUser.birthday,
        [name]: value,
      },
    }));
  } else {
    setUserUpdate((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
};
const handleEdit = async() => {
  if (edit) {
    if(userUpdate.marca){
// Si estamos en modo de edición y cumple con las ExpRegulares, guardamos los cambios en Firestore
  const userDocRef =  doc(collection(db, 'users'), user.userId);
  const updatedData = {
    nameMarca: userUpdate.nameMarca,
    description: JSON.stringify(quillValue),
    nit: userUpdate.nit,
    instagram: userUpdate.instagram,
    pais: userUpdate.pais,
  };

  updateDoc(userDocRef, updatedData)
    .then(() => {
    Swal.fire({
      title: "success",
      text: "Cambios Guardados",
      icon: "success"
    });
    })
    .catch((error) => {
    Swal.fire({
      title: "error",
      text: "Error al guardar verifique todo",
      icon: "error"
    });
  });
    }else{
      //Validamos que cumplan con las exprRegulares
   if(!regexDia.test(userUpdate.birthday.day)|| !regexMes.test(userUpdate.birthday.month) || !regexAno.test(userUpdate.birthday.year)){
    Swal.fire({
      title: "ERROR",
      text: "Fecha de nacimiento invalida. Por favor Corregir",
      icon: "error"
    });
    return;
  }
  if(!regexNombre.test(userUpdate.firstName) && !regexNombre.test(userUpdate.firstName)){
    Swal.fire({
      title: "ERROR",
      text: "Nombre Invalido, Por favor Corregir",
      icon: "error"
    });
    return;
  }
  // Si estamos en modo de edición y cumple con las ExpRegulares, guardamos los cambios en Firestore
  const userDocRef =  doc(collection(db, 'users'), user.userId);
  const updatedData = {
    firstName: userUpdate.firstName,
    lastName: userUpdate.lastName,
    instagram: userUpdate.instagram,
    description: JSON.stringify(quillValue),
    birthday: userUpdate.birthday,
  };

  updateDoc(userDocRef, updatedData)
    .then(() => {
      Swal.fire({
        title: "success",
        text: "Cambios Guardados",
        icon: "success"
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "error",
        text: "Error al guardar verifique todo",
        icon: "error"
      });
    });
    }
 
  }
  setEdit(!edit);
};
   useEffect(() => {

    setUserUpdate(user);
    setImageUrl('');
    const fetchPhotoURL = async () => {
      if (user.userId) {
        try {
          const userDocRef = doc(db, 'users', user.userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            await userDocSnap.data().photoURL;
            const description = await userUpdate.description
            setQuillValue(JSON.parse(description))
          } else {
            console.error('No se encontró el documento del usuario.');
          }
        } catch (error) {
          console.error('Error al obtener el documento del usuario:', error);
        }
      }
    };
     
    
    fetchPhotoURL();
  }, [user, db]);
  
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    if (!image) {
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }
    try {
      setUploading(true);
      // Subir la nueva imagen
      const storageRef = ref(getStorage(), `images/${user.userId}/${image.name}`);
      await uploadBytes(storageRef, image);
      const newImageUrl = await getDownloadURL(storageRef);

      // Actualizar el campo photoURL en la colección users
      const userDocRef = doc(collection(db, 'users'), user.userId);
      await updateDoc(userDocRef, { photoURL: newImageUrl });

      setImageUrl(newImageUrl);
      console.log('Imagen cargada con éxito. URL:', newImageUrl);
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  
  return (
    <div className='editPerfil'>
      <div className='container'>
        <div className='editPerfil_container'>
       
            <div className='editPerfil_container_img'>
                <img src={user.photoURL} alt="" />
                <div className='editPerfil_container_input-image'>
                <input className='input' type="file" onChange={handleImageChange} disabled={!edit}/>
                <button className='btn' onClick={handleUpload} disabled={uploading || !edit}>
          {uploading ? 'Subiendo...' : 'Subir Imagen'}
        </button>
      </div>
            </div>
            <form className='editPerfil_container_form'>
              <h1>Perfil</h1>
              {
                userUpdate.marca?(
                  <>
                <div className='form_group firstName'>
                    <label htmlFor="nameMarca">Razon Social: </label>
                    <input onChange={handleChange} className='input' type="text" disabled={!edit}  name='nameMarca' value={userUpdate.nameMarca} />
                </div>
                <div className='form_group lastName'>
                <label htmlFor="nit">Nit: </label>
                <input  onChange={handleChange} className='input' type="text" disabled={!edit} name='nit' value={userUpdate.nit}/>
            </div>
            <div className='form_group form_group-formPerfil pais'>
              <label htmlFor="pais">País:</label>
              <select value={userUpdate.pais} disabled={!edit} className='input input-formPerfil' onChange={handleChange} name="pais" required>
                <option value="" disabled selected>Selecciona un país</option>
                {paises.map((pais, index) => (
                  <option key={index} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
            </div>
                <div className='form_group redsocial'>
                    <label  htmlFor="instagram">Instagram: </label>
                    <input  onChange={handleChange} className='input' type="text" disabled={!edit}  name='instagram' value={userUpdate.instagram} />
                </div>
                <div className='createoferta_description'>
                <label>Descripcion</label>
                <ReactQuill value={quillValue} modules={modules} theme='snow' onChange={(value) => setQuillValue(value)}/>
            </div>
            </>
                ):(
                  <>
                  <div className='form_group firstName'>
                    <label htmlFor="firstName">Nombre: </label>
                    <input onChange={handleChange} className='input' type="text" disabled={!edit}  name='firstName' value={userUpdate.firstName} />
                </div>
                <div className='form_group lastName'>
                <label htmlFor="lastName">Apellido: </label>
                <input  onChange={handleChange} className='input' type="text" disabled={!edit} name='lastName' value={userUpdate.lastName}/>
            </div>
                  <div className='form_group pais'>
                    <label  htmlFor="pais">Pais: </label>
                    <input  onChange={handleChange} className='input' type="text" disabled={!edit}  name='pais' value={userUpdate.pais} />
                </div>
                <div className='form_group redsocial'>
                    <label  htmlFor="instagram">Instagram: </label>
                    <input  onChange={handleChange} className='input' type="text" disabled={!edit}  name='instagram' value={userUpdate.instagram} />
                </div>
            <div className='form_group_birthday'>
            <label htmlFor="">Fecha de nacimiento:</label>
            <div className='container-form_group-birthday'>
          <div className='form_group'>
            
            <input onChange={handleChange} value={userUpdate.birthday.day} disabled={!edit} type="number" name='day' className='input birthday' placeholder='Dia' required />
          </div>
          <div className='form_group'>
            <input onChange={handleChange} value={userUpdate.birthday.month} disabled={!edit} type="number" name='month' className='input birthday' placeholder='Mes' required />
          </div>
          <div className='form_group'>
            <input onChange={handleChange} value={userUpdate.birthday.year} disabled={!edit} type="number" name='year' className='input birthday' placeholder='Ano' required />
          </div>
        </div>
        </div>
        <div className='createoferta_description'>
                <label>Descripcion</label>
                <div className='description-oferta' ref={quillRef}>
                </div>
            </div>
                  </>
                )
              }
                
            </form>
            </div>
            <button onClick={handleEdit} className='btn btn-editarPerfil'>
              {edit?('Guardar Cambios'):('Editar')}</button>
        </div>
    </div>
  )
}
