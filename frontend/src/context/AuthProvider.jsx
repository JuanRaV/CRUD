import { useState,useEffect,createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext= createContext();

const AuthProvider = ({children})=>{
    const[auth,setAuth]=useState({})
    const[cargando,setCargando] = useState(true);


    useEffect(()=>{
        const autenticarUsuario= async()=>{
            //Revisamos el token
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false);
                return
            }
                
            
            const config = {
                headers:{
                    "Contet-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil',config);
                setAuth(data);
            
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false);
        }
        autenticarUsuario();
    },[]) //Las dependencias vacias hacen que se ejecute una sola vez

    const cerrarSesion=()=>{
        localStorage.removeItem('token');
        setAuth({})
    }

    return(
        // {/* //Desde aqui nacen los datos */}
        <AuthContext.Provider
            value = {{ //Decidimos que poner a disposicion para acceder en los diferentes componentes
                auth,
                setAuth,
                cargando,
                cerrarSesion,
            }}
        >
            {children} 
        </AuthContext.Provider>
        // {/* //Children quiere decir que todos los componentes que esten dentro de auth provider en app.jsx */}
    )
}

export{
    AuthProvider
}
export default AuthContext;