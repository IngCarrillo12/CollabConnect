import './App.css'
import { Navigate ,Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Register } from './components/Register/Register.jsx'
import { Login } from './components/Login/Login.jsx'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
