import React, { useEffect } from 'react'
import './styleHomePage.css'
import { ListCardOfertas } from '../../components/cardsOfertas/ListCardOfertas'
import { useSelector } from 'react-redux'
export const HomePage = () => {
  const user = useSelector(state=>state.user)
  useEffect(() => {
  }, [user])
  
  return (
    <main className='homePage'>
        <section className='homePage_about'>
        <div className='about_contenido'>
        <h1>Las buenas colaboraciones dan grandes resultados</h1>
        <p>En CollabConnect podras postular a colaboraciones con marcas y empresas de alto nivel</p>
        </div>
       <div className='about_btns'>
       <button className='btn about_btns_btn-public'>Publica Oferta</button>
        <button className='btn about_btns_btn-recibe'>Recibe ofertas de colaboracines al correo</button>
       </div> 
        <div className='about_estadisticas'>
            <ul className='estadisticas_list'>
                <li><div className='estadisticas_list_container'><h3>+150.000</h3><span>Creadores</span></div></li>
                <li><div className='estadisticas_list_container'><h3>+150.000</h3><span>Marcas</span></div></li>
                <li><div className='estadisticas_list_container'><h3>+150.000</h3><span>Ofertas</span></div></li>
            </ul>
        </div>
    </section>
    <section className='partners'>
      <ul className='partners_list'>
        <li><img className='img-nike' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
        <li><img className='img-nike' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
        <li><img className='img-nike' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
        <li><img className='img-nike' src="https://s3-alpha-sig.figma.com/img/582a/4b38/6cbac024b352465ecc776720979dc778?Expires=1701043200&Signature=DZLBLK~9cii19VBeUodBxZGj-VoJtdWplkL2lAqp~hxsFKxsbL09DDcldGN1~hvZvpXhBWOehXlwducEMCLy4SEBlO9r0wGdkgmiiF2u10uSd5Xqzwgs66qaNvDNW6t5E9nqO3c3vEz~drt~UQXMsEBPn9DaeJk9-IOl8NAA-lHG5WqRIsRp-IuDXzRfiCe86FLP7EazQQBCzoiv81c32erRnefkERV8RP0ZLCQKX4h-6gpexp2X4aSJEJSjjTwZ6kTl6TCXuhIc~tVH4cLiJxk6AbXJSAQyQYps0hTDYILDxR2c2b8ktXcYoOlchTAxvgTosSTZ8AtgTmgcz~4jbg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" /></li>
    </ul>
    </section>
    <ListCardOfertas/>
    <ListCardOfertas/>
    </main>
  )
}
