import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';



export default function Information() {
    
    const [ifPrendido, setifPrendido] = useState(false);
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
     
    
     const submit = (event) => {
        // Deja el mensaje en blanco
        event.preventDefault();
        
        const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights'
        });
        
        socket.emit('FLIGHTS');
        socket.on('FLIGHTS', data => {
        setFlights(data); 
        setMapFlights(data); 
        });
        
        setifPrendido(true);
    };  
    
    
    return (
        <div className="justify-items-center">
            <div className="grid justify-items-center">
            <form className="w-full max-w-sm" onSubmit={submit}>
                <div class="flex items-center border-blue-500 py-2">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Obtener informacion de vuelos
                    </button>
                </div>
            </form>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {
                    ifPrendido && flights.map(flight => {
                        return (
                            <div className=" border-4 border-blue-300 rounded-lg">
                                <ol>
                                    <li><b>Aerolinea: </b>{flight.airline}</li>
                                    <li><b>Avion: </b>{flight.plane}</li>
                                    <li><b>Asientos: </b>{flight.seats}</li>
                                    <br></br>
                                </ol>
                                <div className=" mx-5 my-auto border border-blue-200">
                                    {
                                        <span><b>Pasajeros a bordo:</b></span>
                                    }
                                    {
                                        flight.passengers.map(passenger => {
                                            return (
                                                <div className="">
                                                    <ul>
                                                        <li>{passenger.name} -  {passenger.age} años.</li>
                                                    </ul>                                           
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <br></br>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
