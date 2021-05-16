import React from 'react'

export default function Information({flights}) {
    return (
        <div className="grid grid-cols-4 gap-6">
            {
                flights.map(flight => {
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
    )
}
