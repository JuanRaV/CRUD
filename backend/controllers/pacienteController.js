import Paciente from "../models/Paciente.js"

const agregarPaciente = async(req,res)=>{
    const paciente = new Paciente(req.body);
    paciente.veterinario=req.veterinario._id; //Lo datos del veterinario ya se encuentran en esta sesion //En la columna de veterinario le pasamos el id del veterinario
    try{
        //Lo almacenamos en la base de datos
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado)
    }catch(error){
        console.log(error)
    }
}

const obtenerPacientes = async(req,res)=>{
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario) //Nos traemos los pacientes del respectivo veterinario
    res.json(pacientes)
}

const obtenerPaciente =async(req,res)=>{
    
    const{id} = req.params;
    const paciente = await Paciente.findById(id.trim());

    if(!paciente){
        return res.status(404).json({msg:'No Encontrado'});
    }
    //Hacemos una autenticacion
    //Revisa si ese paciente fue agregado por el veterinario autenticado porque solo el puede verlo
    if(paciente.veterinario._id.toString()!== req.veterinario._id.toString()){ //Como son ObjectId, se convierten a string para que los marque como el mismo tipo de datos y no haya errores aunq son el mismo veterinario
        return res.json({msg:'Accion no valida'});
    }
  
    res.json(paciente)
    
}

const actualizarPaciente = async(req,res)=>{
    const{id} = req.params;
    const paciente = await Paciente.findById(id.trim())

    if(!paciente){
        return res.status(404).json({msg:'No Encontrado'});
    }

    //La persona que creo al paciente sera quien la editara
    if(paciente.veterinario._id.toString()!== req.veterinario._id.toString()){ //Como son ObjectId, se convierten a string para que los marque como el mismo tipo de datos y no haya errores aunq son el mismo veterinario
        return res.json({msg:'Accion no valida'});
    }
    //Actualizar paciente
    paciente.nombre=req.body.nombre || paciente.nombre; //Si no tiene nada dejale lo que tenia, el nombre anterior
    paciente.propietario=req.body.propietario ||paciente.propietario
    paciente.email=req.body.email ||paciente.email
    paciente.fecha=req.body.fecha ||paciente.fecha
    paciente.sintomas=req.body.sintomas||paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save();
        return res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente=async(req,res)=>{
    const{id} = req.params;
    const paciente = await Paciente.findById(id.trim())

    if(!paciente){
        return res.status(404).json({msg:'No Encontrado'});
    }

    //La persona que creo al paciente sera quien la editara
    if(paciente.veterinario._id.toString()!== req.veterinario._id.toString()){ //Como son ObjectId, se convierten a string para que los marque como el mismo tipo de datos y no haya errores aunq son el mismo veterinario
        return res.json({msg:'Accion no valida'});
    }
    try {
        await paciente.deleteOne();
        res.json({msg:"Paciente eliminado"})
    } catch (error) {
        console.log(error)
    }
}
export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}