import React from 'react';
import {useState, useEffect} from 'react';
import {Icon} from 'leaflet';
import {MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker} from "react-leaflet";

import image from './airplane.svg'


const icon = new Icon({
    iconUrl: image,
    iconSize: [40, 40]
  });
  

export default function Map() {
    
    const [flights, setFlights] = useState([]);
    const [positions, setPositions] = useState([]);
    const [realTime, setRealTime] = useState({});
    
    useEffect(() => {
        socket.emit('FLIGHTS');
        socket.on('FLIGHTS', resp => setFlights(resp));
        
        socket.on('POSITION', resp => {
            setPositions(prev => [...prev, resp]);
            setRealTime(prev => ({
                ...prev,
                [resp.code]: resp.position
            }));
        });
    }, []);
    
    
    return (
        <div class="col-start-1 col-end-5 ...">
            <MapContainer className="markercluster-map" center={[0, 0]} zoom={2} maxZoom={18}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
            </MapContainer>
            {
                // Se crea los origenes y destinos de cada vuelo
                flights.map((flight) => {
                    const route = [flight.origin, flight.destination];

                    return (
                        <Polyline positions={route}/>
                    )
                })
            }
            {
                // Se crea los rastros del vuelo
                positions.map((position) => {
                    const x = position.position[0];
                    const y = position.position[1];
                    
                    return (
                        <CircleMarker center={{lat:x, lng:y}} fillColor="red" radius={3}>            
                        </CircleMarker>
                    )
                })
            }
            {
                // Se crea el punto para el origen
                flights.map((flight) => {
                    const coor = flight.origin;
                    
                    return (
                        <Marker positions={coor} key={coor}>
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
                        <Marker positions={coor} key={coor}>
                            <Popup>
                                <span>Coordenadas: {coor}</span>
                            </Popup>
                        </Marker>
                    )
                })
            }
            {
                // Se crea el codigo del vuelo asociado
                Object.entries(realTime).map(([position, code]) => {
                    return (
                        <Marker key={code} icon={icon} position={position}>
                            <Popup>
                                <span>Codigo de vuelo: {code}</span>
                            </Popup>
                        </Marker>
                    )
                    })
            }
        </div>
    )
}
