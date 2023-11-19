import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup ,updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import {doc, setDoc } from "firebase/firestore";
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
  const { email, password, firstName, lastName, birthday, photoURL } = userInfo;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    try {
      await updateProfile(user, {
        displayName:firstName +' '+lastName,
        photoURL,
      });
      const userId = user.uid;
      const userData = {
        email,
        firstName,
        lastName,
        birthday,
        photoURL,
      };

      // Guardar los datos en Firestore
      const userDocRef = doc(db, 'users', userId);
      try {
        await setDoc(userDocRef, userData);
        console.log('Usuario registrado con éxito y datos adicionales guardados en Firestore.');
        return user;
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
export const login = async(correo, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, correo, password);
    const {email,displayName,photoURL} = data.user
    return {email,displayName,photoURL}; // Devuelve true si el inicio de sesión es exitoso
  } catch (error) {
    validatedError(error.code)
  }

};
export const loginWithGoogle =()=>{
  const  GoogleProvider = new GoogleAuthProvider()
  return signInWithPopup(auth, GoogleProvider)
}
export const logout = () => signOut(auth);