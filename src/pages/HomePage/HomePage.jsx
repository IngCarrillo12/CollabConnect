import React, { useEffect, useState } from 'react'
import './styleHomePage.css'
import { ListCardsOfertas } from '../../components/cardsOfertas/ListCardsOfertas'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../resources/Auth'
import { useNavigate } from 'react-router-dom'
export const HomePage = () => {
  const ofertas = useSelector(state=> state.ofertas)
  const user = useSelector(state=>state.user)
  const [quantyMarcas, setQuantyMarcas] = useState(0)
  const [quantyInfluencer, setQuantyInfluencer] = useState(0)
  const navigate = useNavigate()
  const QuantyMarcasAndInfuencer = async () => {
    const users = await getAllUsers();
    let countMarcas = 0;
    let countInfluencer = 0;
    users.forEach((user) => {
      if (user.marca) {
        countMarcas++;
      } else {
        countInfluencer++;
      }
    });
    setQuantyMarcas(quantyMarcas + countMarcas);
    setQuantyInfluencer(quantyInfluencer + countInfluencer);
  };
  const handlePublicarOferta = ()=>{
    if(user.marca){
      navigate('/crearOferta')
    }else{
      navigate('/login')
    }
  }
  useEffect(() => {
    QuantyMarcasAndInfuencer()
  }, [])

  return (
    <main className='homePage'>
        <section className='homePage_about'>
        <div className='about_contenido'>
        <h1>Las buenas colaboraciones dan grandes resultados</h1>
        <p>En CollabConnect podras postular a colaboraciones con marcas y empresas de alto nivel</p>
        </div>
       <div className='about_btns'>
       <button onClick={handlePublicarOferta} className='btn about_btns_btn-public'>Publica Oferta</button>
        <button className='btn about_btns_btn-recibe'>Recibe ofertas de colaboracines al correo</button>
       </div> 
        <div className='about_estadisticas'>
            <ul className='estadisticas_list'>
                <li><div className='estadisticas_list_container'><h3>{quantyInfluencer}</h3><span>Creadores</span></div></li>
                <li><div className='estadisticas_list_container'><h3>{quantyMarcas}</h3><span>Marcas</span></div></li>
                <li><div className='estadisticas_list_container'><h3>{ofertas.length}</h3><span>Ofertas</span></div></li>
            </ul>
        </div>
    </section>
    <section className='partners'>
      <ul className='partners_list'>
        <li><img className='img' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
        <li><img className='img' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
        <li><img className='img' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
        <li><img className='img' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
    </ul>
    </section>
    <ListCardsOfertas ofertas={ofertas}/>
    </main>
  )
}
