import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { obtenerOfertaPorId, postularseAOferta } from '../../resources/OfertasColaboracion'
import { Loader } from '../../components/Loader'
import { useSelector } from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styleOfertaPage.css'
export const OfertaPage = () => {
   const user = useSelector(state=>state.user)
   const navigate = useNavigate()
    const {id} = useParams()
    const [oferta, setOferta] = useState()
    const [loading, setLoading] = useState(true)
    const [postulado, setPostulado] = useState(false)
    const [quillValue, setQuillValue] = useState('');
    const modules = {
      toolbar: false,
    };
    const handlePostularse = async()=>{
        if(user.userId){
            const response = await postularseAOferta(id,user.userId)
            if(response==='postulado'){
                setPostulado(true)
            }
            if(response==='despostulado'){
                setPostulado(false)
            }
        }else{
            navigate('/login')
        }
       
    }
    if(oferta){
        var fecha = new Date(oferta.oferta.fechaPublicacion.seconds * 1000 + oferta.oferta.fechaPublicacion.nanoseconds / 1000000)
        
    }
    useEffect(() => {
        const loadOferta = async(id)=>{
            const oferta = await obtenerOfertaPorId(id)
            setOferta(oferta)
            setLoading(false)
            const encontrado = oferta.oferta.postulados.find(id=>id===user.userId)
            if(encontrado){
                setPostulado(true)
            }
            const description = await oferta.oferta.description
            setQuillValue(JSON.parse(description))
        }
      loadOferta(id)
    }, [id])
  return (
    <main className='center'>
        {
            loading?(
                <Loader/>
            ):(
                <div className='container-oferta'>
                <div className='oferta_infoMarca'>
                <div className='infoMarca_containerImg'>
                    <img src={oferta.marca.photoURL} alt="foto marca" />
                </div>
                <div className='infoMarca_red-fecha'>
                    <h3>{oferta.marca.nameMarca}</h3>
                    <span>{`${fecha.getDate()} / ${fecha.getMonth()} / ${fecha.getFullYear()}`}</span>
                </div>
            </div>
            <div className='oferta_infoOferta'>
                <h1>{oferta.oferta.title}</h1>
                <div className='oferta_infoOferta_pais-red'>
                    <span>{oferta.oferta.pais}</span>
                    <span>{oferta.oferta.redsocial}</span>
                </div>
                <div className='oferta_infoPostulados'>
                <img width="24" height="24" src="https://img.icons8.com/ios-glyphs/30/000000/person-male.png" alt="person-male"/>
                <span className=''>Postulados ({oferta.oferta.postulados.length})</span>
                </div>
                
                {
                    !user.marca&&(
                        <button className='btn btn-postularse' onClick={handlePostularse}>{postulado?'Cancelar Postulacion':'Postularse' }</button>
                    )
                }
                
            </div>
            
            <div className='oferta_description'>
            <h2>Description:</h2>
            <ReactQuill value={quillValue} modules={modules} theme='snow'/>
            </div>
            </div>
            )
        }
        
    </main>
  )
}
