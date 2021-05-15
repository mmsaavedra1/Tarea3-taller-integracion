import React from 'react'

export default function Information() {
    
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        socket.emit('FLIGHTS');
        socket.on('FLIGHTS', resp => setFlights(resp));
    }, []);
    
    return (
        <div class="col-start-2 col-span-4 ...">
            {
                flights.map(flight => {
                    
                })
            }
        </div>
    )
}
