import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { collection } from 'firebase/firestore';
import {doc, setDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../fireBase";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from "sweetalert2"

const validatedError = (error)=>{
  if(error ==="auth/invalid-login-credentials"){
    Swal.fire({
      title: "ERROR",
      text: "Credenciales Invalidas",
      icon: "error"
    });
    return;
  }if(error==="auth/missing-password"){
    Swal.fire({
      title: "ERROR",
      text: "Ingrese su contrasena",
      icon: "error"
    });
    return;
  }if(error==="auth/invalid-email"){
    Swal.fire({
      title: "ERROR",
      text: "Email Invalido",
      icon: "error"
    });
    return;
  }if(error==="auth/missing-email"){
    Swal.fire({
      title: "ERROR",
      text: "Ingrese su correo",
      icon: "error"
    });
    return;
  }else{
    Swal.fire({
      title: "ERROR",
      text: error,
      icon: "error"
    });
    return;
  }
}
export const signUp = async (userInfo) => {
  const { email, password, firstName, lastName, birthday, marca, razonsocial, nit } = userInfo;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if(!marca){
    try {
      await updateProfile(user, {
        displayName:`${firstName} ${lastName}`,
      });
      const userId = user.uid;
      const userData = {
        userId,
        email,
        firstName,
        lastName,
        birthday,
        marca,
      };

      // Guardar los datos en Firestore
      const userDocRef = doc(db, 'users', userId);
      try {
        await setDoc(userDocRef, userData);
        return {...userData,userId};
      } catch (error) {
        validatedError(error.code)
      }
    }catch (error) {
      validatedError(error.code)
    }
  }
  if(marca){
    try {
      await updateProfile(user, {
        displayName: razonsocial,
      });
      const userId = user.uid;
      const userData = {
        userId,
        email,
        nameMarca:razonsocial,
        nit,
        marca,
      };

      // Guardar los datos en Firestore
      const userDocRef = doc(db, 'users', userId);
      try {
        await setDoc(userDocRef, userData);
        return {...userData,userId};
      } catch (error) {
        validatedError(error.code)
      }
    }catch (error) {
      validatedError(error.code)
    }
  }
  } catch (error) {
    validatedError(error.code)
  }
};
export const login = async (correo, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, correo, password);
    const userId = data.user.uid;
    // Obtener información adicional del usuario desde Firestore
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return { userId, ...userData };
    } else {
      console.error('El documento del usuario no existe en Firestore.');
      // Puedes manejar el caso en el que no se encuentra la información del usuario.
      return null;
    }
  } catch (error) {
    validatedError(error.code);
    return null; // Devuelve null si el inicio de sesión no es exitoso
  }
};
export const loginWithGoogle =()=>{
  const  GoogleProvider = new GoogleAuthProvider()
  return signInWithPopup(auth, GoogleProvider)
}
export const logout = async() => await signOut(auth);
export const actualizarFirestore = async (userId, newInfo) => {
  const userDocRef = doc(db, 'users', userId);
  const {description, instagram, pais, photoURL,nameMarca} = newInfo
  try {
    if(nameMarca){
      await updateDoc(userDocRef, {
        description,
        instagram,
        pais,
        photoURL,
        nameMarca,
      });
    }else{
      await updateDoc(userDocRef, {
        description,
        instagram,
        pais,
        photoURL,
      });
    }
   

    Swal.fire({
      title: "success",
      text: "Informacion guardada",
      icon: "success"
    });
  } catch (error) {
    Swal.fire({
      title: "ERROR",
      text: error,
      icon: "error"
    });
  }
};
export const getUserById = async (userId) => {
  try {
    const userDocRef = doc(collection(db, "users"), userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      // El usuario existe en Firestore, puedes acceder a los datos con userSnapshot.data()
      const userData = userSnapshot.data();
      // Incluir el ID en el objeto de retorno
      return { userId: userSnapshot.id, ...userData };
    } else {
      // El usuario no existe
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const subirImagen = async (userId, image) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${userId}/${image.name}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error; // Puedes manejar este error según tus necesidades
  }
};
export const getAllUsers = async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);

  const users = [];
  usersSnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users;
};
