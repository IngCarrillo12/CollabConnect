import { doc, collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../fireBase'; // Asegúrate de importar tu configuración de Firestore

export const crearOferta = async (userId, nuevaOferta) => {
  const { title, redsocial, pais, descripcion, requisitos } = nuevaOferta;

  try {
    // Crear una nueva oferta en la colección 'ofertas'
    const ofertaRef = await addDoc(collection(db, 'ofertas'), {
      title, 
      redsocial,
      pais,
      descripcion,
      requisitos,
      fechaPublicacion: new Date(), // Puedes ajustar la fecha según tus necesidades
      idMarca: userId,
    });

    Swal.fire({
      title: 'Éxito',
      text: 'Oferta creada exitosamente',
      icon: 'success',
    });

    return ofertaRef.id; // Devolver el ID de la oferta creada (opcional)
  } catch (error) {
    Swal.fire({
      title: 'ERROR',
      text: 'Error al crear la oferta',
      icon: 'error',
    });

    throw error; // Puedes manejar el error según tus necesidades
  }
};