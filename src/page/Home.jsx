import React, { useEffect } from 'react'
import Nav from '../componentes/Nav'
import Conteo from '../componentes/Conteo'
import ContainChat from '../componentes/ContainChat'
import notificar from '../services/conectados/notificar';
import Pizzarra from '../componentes/Pizzarra';
import JoinTeam from '../componentes/JoinTeam';
import { useLocalStorage } from '../hooks/useLocalStorage';
export default function Home() {
  const { localStorageValue, updateLocalStorageValue } = useLocalStorage("token");

    useEffect(()=>{
       notificar();
    });
  return (
    <div className='flex flex-col w-full'>
        <Nav/>
  
  <div className='flex w-full justify-evenly'>
  <div className='flex items-start w-1/2 px-4 mt-10 gap-x-2 '>
        <Conteo/>
        {
          localStorageValue.length > 10 ? <ContainChat token={localStorageValue}/> : <p>Cargando</p>
        }
        
         </div>

         <div className='mt-10 '>
         <Pizzarra/>
         <JoinTeam/>
         </div>
  </div>
      

     
        
        
    
      
 
    </div>
  )
}
