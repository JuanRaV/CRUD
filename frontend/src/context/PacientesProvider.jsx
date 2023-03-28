import { createContext,useState,useEffect } from "react";
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth";

const PacienteContext = createContext();

//De donde vienen los datos
const PacientesProvider = ({children})=>{
    const [pacientes,setPacientes] = useState([]);
    const [paciente,setPaciente] = useState({});
    const{ auth} = useAuth();

    useEffect(()=>{
        const obtenerPacientes = async()=>{
            //Obtenemos el token porque ahi esta la informacion del veterinario
            try {
                const token = localStorage.getItem('token');
                if(!token)
                    return
                
                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const{data}= await clienteAxios('/pacientes',config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
            


        obtenerPacientes();
    },[auth])

    const guardarPaciente = async(paciente)=>{
        const token = localStorage.getItem('token')
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){ //En caso que estemos editando
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config)

                const pacientesActualizado = pacientes.map(pacienteState=>pacienteState._id === data._id ? data:pacienteState) //Itera sobre el state, busca el id que estamos modificando y reescribe todo el objeto
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const {data} = await clienteAxios.post('/pacientes',paciente,config)
                const {createdAt,updatedAt,__v,...pacienteAlmacenado} = data //Crea un nuevo objeto con lo que no se tiene en el "destructuring"
    
                setPacientes([pacienteAlmacenado,...pacientes]);
    
            } catch (error) {
                console.log(error.response.data.msg)
            } 
        }
    }

    const setEdicion = (paciente)=>{
        setPaciente(paciente);
    }


    const eliminarPaciente = async id=>{
        const confirmar = confirm('Deseas eliminar?')
        if(confirmar){
            try{
                const token = localStorage.getItem('token')
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data}=await clienteAxios.delete(`/pacientes/${id}`,config)
                const pacientesActualizado= pacientes.filter(pacientesState=>pacientesState._id!==id)

                setPacientes(pacientesActualizado)
            }catch(error){
                console.log(error)
            }
        }
    }
    return(
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
}

export{
    PacientesProvider
}
export default PacienteContext;
