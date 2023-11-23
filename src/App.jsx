import './App.css'
import { Navigate ,Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { RegisterMarca } from './components/Register/RegisterMarca.jsx'
import { Login } from './components/Login/Login.jsx'
import { FormularioInfluencer } from './components/FormularioPerfil/FormularioInfluencer.jsx'
import { CreateOferta } from './components/CreateOferta/CreateOferta.jsx'
import { OfertaPage } from './pages/ofertaPage/OfertaPage.jsx'
import { EditPerfil } from './components/EditPerfil/EditPerfil.jsx'
import { FormularioMarca } from './components/FormularioPerfil/FormularioMarca.jsx'
import { RegisterInfluencer } from './components/Register/RegisterInfluencer.jsx'
import { addUser } from './redux/userSlice.js'
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from './fireBase.js'
import { getUserById } from './resources/Auth.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { OfertasPage } from './pages/ofertasPage/OfertasPage.jsx';
import { obtenerTodasLasOfertas } from './resources/OfertasColaboracion.js';
import { MarcasPage } from './pages/MarcasPage/MarcasPage.jsx';
import { InfluencersPage } from './pages/InfluencersPage/InfluencersPage.jsx';

import { addOferta, resetOferta } from './redux/ofertasSlice.js'
import { OfertasCategoriaPage } from './pages/OfertasCategoriaPage/OfertasCategoriaPage.jsx'
import { MisPostulacionesPage } from './pages/MisPostulacionesPage/MisPostulacionesPage.jsx'
import { MisOfertasPublicadas } from './pages/MisOfertasPublicadas/MisOfertasPublicadas.jsx'

function App() {
  const dispatch = useDispatch()
  const findUser = async(currentUser)=>{
    const user = await getUserById(currentUser.uid)
    dispatch(addUser(user))
   
}
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
           findUser(currentUser)
        }
    });
    const loadingOfertas = async () => {
      try {
        const ofertasCargadas = await obtenerTodasLasOfertas();
        if (ofertasCargadas.length) {
          
          // Serializar las fechas antes de agregarlas al estado
          const ofertasSerializadas = ofertasCargadas.map(oferta => ({
            ...oferta,
            fechaPublicacion: oferta.fechaPublicacion.toDate().toISOString(),
          }));
          dispatch(resetOferta());
           dispatch(addOferta(ofertasSerializadas));
          
        
          
        }
      } catch (error) {
        console.error('Error al cargar las ofertas:', error);
      }
    };
  
    loadingOfertas();
    return () => unsubscribe();
  }, [dispatch])
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/marca" element={<RegisterMarca />}/>
        <Route path="/register/influencer" element={<RegisterInfluencer />}/>
        <Route path='/formulario/marca' element={<FormularioMarca/>}/>
        <Route path='/formulario/influencer' element={<FormularioInfluencer/>}/>
        <Route path='/mispostulaciones' element={<MisPostulacionesPage/>}/>
        <Route path='/ofertasPublicadas' element={<MisOfertasPublicadas/>}/>
        <Route path='/crearOferta' element={<CreateOferta/>}/>
        <Route path='/ofertas' element={<OfertasPage/>}/>
        <Route path='/ofertas/:categoria' element={<OfertasCategoriaPage/>}/>
        <Route path='/marcas' element={<MarcasPage/>}/>
        <Route path='/influencers' element={<InfluencersPage/>}/>
        <Route path='/oferta/:id' element={<OfertaPage/>}/>
        <Route path='/editperfil' element={<EditPerfil/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
