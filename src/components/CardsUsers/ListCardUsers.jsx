import React from 'react'
import { CardUser } from './CardUser'
export const ListCardUsers = ({users}) => {
  return (
    <section className='listCards'>
      <div className='container-listCards'>
        <div className='listCards_header'>
          {
            users[0].marca?(
                <p>Marcas Asociadas</p>
            ):(
              <p>Influencer Asociados</p>
            )
          }
            
        </div>
        <div className='cards'>
              {
                  users.map(data=><CardUser key={data.userId} userId={data.userId} nit={data.nit} name={data.nameMarca || `${data.firstName} ${data.lastName}`}  marca={data.marca} redsocial={data.instagram} pais={data.pais} image={data.photoURL} />)
              }
        </div>
        </div>
    </section>
  )
}
