import React, { useState, useEffect }from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../fireBase';
import './EditPerfil.css'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
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
  const {quill, quillRef} =useQuill({
    readOnly: !edit,
    modules:{
        toolbar: false
    }
})
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
      description: JSON.stringify(quill.getContents()),
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
  setEdit(!edit);
  quill.enable(!edit);
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
            await quill.setContents(JSON.parse(description))
          } else {
            console.error('No se encontró el documento del usuario.');
          }
        } catch (error) {
          console.error('Error al obtener el documento del usuario:', error);
        }
      }
    };
     
    
    fetchPhotoURL();
  }, [user, db, quill]);
  
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
                <div className='form_group firstName'>
                    <label htmlFor="FirstName">FirstName: </label>
                    <input onChange={handleChange} className='input' type="text" disabled={!edit}  name='firstName' value={userUpdate.firstName} />
                </div>
                <div className='form_group lastName'>
                    <label htmlFor="lastName">LastName: </label>
                    <input  onChange={handleChange} className='input' type="text" disabled={!edit} name='lastName' value={userUpdate.lastName}/>
                </div>
                <div className='form_group redsocial'>
                    <label  htmlFor="instagram">Red Social: </label>
                    <input  onChange={handleChange} className='input' type="text" disabled={!edit}  name='instagram' value={userUpdate.instagram} />
                </div>
                <div className='createoferta_description'>
                <label>Descripcion</label>
                <div className='description-oferta' ref={quillRef}>
                </div>
            </div>
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
                
            </form>
            </div>
            <button onClick={handleEdit} className='btn btn-editarPerfil'>
              {edit?('Guardar Cambios'):('Editar')}</button>
        </div>
    </div>
  )
}
