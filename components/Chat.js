import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

export default function Chat() {
    
    // Propiedades de componente para almacenar los valores
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    
    
    useEffect(() => {
        // Se carga el socket para generar la conversacion
        const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights'
        });
        
        // Se empieazan a escuchar los mensajes entrantes
        socket.on('CHAT', message => {
            setMessages([...messages, message]);
        });
        
        
        // Para que no corrar indefinidamente
        return () => {
            socket.off()
        }
    }, [messages]);
    
    
     // Se toma la logica del login
     const login = (event) => {
        event.preventDefault();
        if (nickname){
            setIsLogin(true);
        } else {
            alert("¡Debes colocar un nickname antes de chatear!");
        }
    }
    
    // Enviamos el mensaje actual al chat
    const submit = (event) => {
        
        event.preventDefault();
        
        // Se carga el socket para generar la conversacion
        const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {
            path: '/flights'
        });
        
        socket.emit("CHAT", {
            name: nickname,
            message: message
        });
      
        // Deja el mensaje en blanco
        setMessage("");
    };  
    
    
    return (
        <div className="border-4 border-blue-300 col-end-7 col-span-2 rounded-lg">
            {
                !isLogin &&
                <div className="mx-5 my-2">
                    <form className="w-full max-w-sm" onSubmit={login}>
                            <div className="flex items-center border-b border-blue-500 py-2">
                                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Ingresa un nickname..."  value={nickname} onChange={event => setNickname(event.target.value)}/>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Chatear!
                                </button>
                            </div>
                        </form>   
                </div>
         
            }
            { isLogin &&
                <div className="mx-5 my-2">
                    <b><h2>Chat room</h2></b>
                    <div id="chatMessages" className="mx-5 my-2 border border-blue-200 scrolling-auto overflow-auto overscroll-auto  h-60">
                        {
                            messages.map( (req, index) => 
                                <div key={index}>    
                                    {
                                        `${req.name}: ${req.message} (${new Date(req.date).toTimeString().split(" ")[0]})`
                                    }
                                </div>
                            )
                        }
                    </div>
                    <form className="w-full max-w-sm" onSubmit={submit}>
                        <div class="flex items-center border-b border-blue-500 py-2">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Escriba un mensaje"  value={message} onChange={event => setMessage(event.target.value)}/>
                            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Enviar
                            </button>
                        </div>
                    </form>
                    
                </div>
            }
        </div>
    )
}

