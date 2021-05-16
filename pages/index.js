import dynamic from 'next/dynamic'
import Head from 'next/head';
import {useState, useEffect} from 'react';

import Navbar from '../components/Navbar';
import Information from '../components/Information';
//import Map from '../components/Map';
const Map = dynamic(() => import("../components/Map"), {
    loading: () => <p>A map is loading.</p>,
    ssr: false
   });


import io from 'socket.io-client';


export default function Home() {
  
  // Se crean las variables de estado
  const [flights, setFlights] = useState([]);
  const [mapFlights, setMapFlights] = useState([]);
  
  // Se consume el websocket
  useEffect(() => {
    
    const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
        path: '/flights'
    });
    
    socket.emit('FLIGHTS');
    socket.on('FLIGHTS', data => {
      setFlights(data); 
      setMapFlights(data); 
    });
  }, []);
    
    
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main>
      <div className="grid mx-20 my-20 text-center 	">
        <div className="grid grid-cols-6 gap-4 grid-flow-col		">
          <Map flights={mapFlights}/>
          <div className="border-4 border-blue-300 col-end-7 col-span-2 rounded-lg">
            Chat
          </div>
          <div className="grid col-start-1 col-span-5 justify-center ">
            <h1><b>Información de vuelos en curso</b></h1><br/>
            <Information flights={flights} />
          </div>
        </div>
      </div>
      </main>    
    </div>
  )
}
