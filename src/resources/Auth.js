import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../fireBase";
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
  const { email, password, firstName, lastName, birthday, photoURL,marca } = userInfo;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    try {
      await updateProfile(user, {
        displayName:`${firstName} ${lastName}`,
        photoURL,
      });
      const userId = user.uid;
      const userData = {
        email,
        firstName,
        lastName,
        birthday,
        photoURL,
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
    } catch (error) {
      validatedError(error.code)
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
export const logout = () => signOut(auth);
export const actualizarFirestore = async (userId, newInfo) => {
  const userDocRef = doc(db, 'users', userId);
  const {description, instagram} = newInfo
  try {
    await updateDoc(userDocRef, {
      description,
      instagram,
    });

    Swal.fire({
      title: "Success",
      text: "Informacion guardada",
      icon: "Success"
    });
  } catch (error) {
    Swal.fire({
      title: "ERROR",
      text: error,
      icon: "error"
    });
  }
};