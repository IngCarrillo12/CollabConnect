import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../fireBase'; // Asegúrate de importar tu configuración de Firestore

export const crearOferta = async (userId, nameMarca, photoURL, nuevaOferta) => {
  const { title, redsocial, pais, description, categoria } = nuevaOferta;
  const ofertaInfo ={
      title, 
      redsocial,
      pais,
      description,
      fechaPublicacion: new Date(),
      idMarca: userId,
      categoria,
      marca: nameMarca,
      postulados: [],
      image:photoURL,
  }
  try {
    // Crear una nueva oferta en la colección 'ofertas'
    const ofertaRef = await addDoc(collection(db, 'ofertas'), ofertaInfo);
    const ofertaId = ofertaRef.id
    Swal.fire({
      title: 'success',
      text: 'Oferta creada exitosamente',
      icon: 'success',
    });

    return {ofertaId,...ofertaInfo }; // Devolver el ID de la oferta creada (opcional)
  } catch (error) {
    Swal.fire({
      title: 'ERROR',
      text: 'Error al crear la oferta',
      icon: 'error',
    });

    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const obtenerTodasLasOfertas = async () => {
  try {
    // Obtener todas las ofertas sin restricciones
    const q = collection(db, 'ofertas');
    const querySnapshot = await getDocs(q);

    // Mapear los documentos a un array de objetos con el ID de Firebase
    const ofertas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return ofertas;
  } catch (error) {
    console.error('Error al obtener todas las ofertas:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const obtenerOfertaPorId = async (idOferta) => {
  try {
    // Obtener el documento de la oferta por su ID
    const ofertaDocRef = doc(db, 'ofertas', idOferta);
    const ofertaSnapshot = await getDoc(ofertaDocRef);

    if (ofertaSnapshot.exists()) {
      // El documento de la oferta existe en Firestore, puedes acceder a los datos con ofertaSnapshot.data()
      const ofertaData = ofertaSnapshot.data();
      // Obtener información de la marca que creó la oferta
      const marcaId = ofertaData.idMarca;

      const marcaDocRef = doc(db, 'users', marcaId);
      const marcaSnapshot = await getDoc(marcaDocRef);

      if (marcaSnapshot.exists()) {
        // El documento de la marca existe en Firestore, puedes acceder a los datos con marcaSnapshot.data()
        const marcaData = marcaSnapshot.data();

        // Devolver un objeto que contenga tanto los datos de la oferta como los datos de la marca
        return { oferta: ofertaData, marca: marcaData };
      } else {
        // El documento de la marca no existe
        return null;
      }
    } else {
      // El documento de la oferta no existe
      return null;
    }
  } catch (error) {
    console.error('Error al obtener la oferta con la marca por ID:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const postularseAOferta = async (ofertaId, userId) => {
  try {
    // Obtener la oferta
    const ofertaDocRef = doc(collection(db, 'ofertas'), ofertaId);
    const ofertaDoc = await getDoc(ofertaDocRef);

    if (ofertaDoc.exists()) {
      // Verificar si el usuario ya está postulado
      const postuladosActuales = ofertaDoc.data().postulados || [];
      const estaPostulado = postuladosActuales.includes(userId);

      if (estaPostulado) {
        // El usuario ya está postulado, eliminarlo de la lista
        const nuevosPostulados = postuladosActuales.filter((id) => id !== userId);

        // Actualizar la oferta sin el usuario postulado
        await updateDoc(ofertaDocRef, { postulados: nuevosPostulados });

        return 'despostulado'; // Indicar que la despostulación fue exitosa
      } else {
        // El usuario no está postulado, postularlo
        const nuevosPostulados = [...postuladosActuales, userId];

        // Actualizar la oferta con el nuevo postulado
        await updateDoc(ofertaDocRef, { postulados: nuevosPostulados });

        return 'postulado'; // Indicar que la postulación fue exitosa
      }
    } else {
      console.error('La oferta no existe');
      return false; // Indicar que la oferta no existe
    }
  } catch (error) {
    console.error('Error al postularse/despostularse a la oferta:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};