import './App.css'
import { Navigate ,Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Register } from './components/Register/Register.jsx'
import { Login } from './components/Login/Login.jsx'
import { FormularioMarca } from './components/FormularioPerfil/FormularioMarca.jsx'
import { FormularioInfluencer } from './components/FormularioPerfil/FormularioInfluencer.jsx'
import { CreateOferta } from './components/CreateOferta/CreateOferta.jsx'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />}/>
        <Route path='/formulario/marca' element={<FormularioMarca/>}/>
        <Route path='/formulario/influencer' element={<FormularioInfluencer/>}/>
        <Route path='/creatingOfert' element={<CreateOferta/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
