import React, {useState, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import Icon from 'leaflet';
import {MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker} from "react-leaflet";
import io from 'socket.io-client';


const icon = new Icon({
    iconUrl: "./airplane.svg",
    iconSize: [35, 35]
  });
  
  
const mark = new Icon({
iconUrl: "./map.svg",
iconSize: [30, 30]
});

export default function Map({flights}) {   
    
    // Se crean las variables de estado
    const [positions, setPositions] = useState([]);
    const [realTime, setRealTime] = useState({});
    
        
    // Se consume el websocket
    useEffect(() => {
        
        const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights'
        }, {transports: ["websocket"]});
        
        socket.on('POSITION', mensaje => {
        setPositions((prev) => ([...prev, mensaje]));
        setRealTime((prev) => ({...prev, [mensaje.code]: mensaje.position}));
        })
        
    }, []);
        
    return (
        <div className=" border-4 border-blue-300 col-start-1 col-end-5 rounded-lg" >      
            <MapContainer 
                className="markercluster-map" center={[-33.8, -56.5]} 
                zoom={4} scrollWheelZoom={false} 
                style={{height:400, width: "100%"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                {
                    // Se crea los origenes y destinos de cada vuelo
                    flights.map((flight) => {
                        const route = [flight.origin, flight.destination];

                        return (
                            <Polyline positions={route} fillColor="black" pathOptions={{ color: 'black' }}/>
                        )
                    })
                }
                {
                    // Se crea los rastros del vuelo
                    positions.map((position) => {
                        const x = position.position[0];
                        const y = position.position[1];
                        
                        return (
                            <CircleMarker center={{lat:x, lng:y}} fillColor="green" pathOptions={{ color: 'green' }} radius={3}>            
                            </CircleMarker>
                        )
                    })
                }
                {
                    
                    // Se crea el punto para el origen
                    flights.map(flight => {
                        const coor = flight.origin;
                        
                        return (
                            <Marker position={[flight.origin[0], flight.origin[1]]} icon={mark}>
                                <Popup>
                                    <span>Coordenadas: {coor}</span>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                {
                    // Se crea el punto para el destino
                    flights.map((flight) => {
                        const coor = flight.destination;
                        
                        return (
                            <Marker position={coor} icon={mark}>
                                <Popup>
                                    <span>Coordenadas: {coor}</span>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                {
                    Object.entries(realTime).map(([code, position]) => (
                    <Marker key={code}  icon={icon} position={[position[0], position[1]]}>
                        <Popup>Codigo de vuelo: {code}</Popup>
                    </Marker>
                    ))
                }
            </MapContainer>
            </div>
    )
}
