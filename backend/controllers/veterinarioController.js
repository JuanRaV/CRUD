import Veterinario from "../models/Veterinario.js";
import generarJWT from '../helpers/generarJWT.js'
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async(req,res)=>{
    const {email,nombre} = req.body;

    //Prevenir usuarios duplicados
    const existeUsuario = await Veterinario.findOne({email}) //El await es por si tenemos 10 millones de usuarios espere hasta que tenga respuesta, {email:email}

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Guardamos un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        //Se guarda el objeto en la base de datos
        const veterinarioGuardado = await veterinario.save(); 

        //Enviar el email
        emailRegistro({
            email,
            nombre,
            token:veterinarioGuardado.token
        });

        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error);
    
    }
}

const perfil = (req,res)=>{
    //Tenemos almacecnado en la sesion del servidor al veterinario, en ves de consultar la base de datos
    const {veterinario} = req;

    res.json(veterinario)
}

const confirmar = async(req,res)=>{
    const {token} = req.params //Leer datos de la URL con req.params
    const usuarioConfirmar = await Veterinario.findOne({token})

    //Si no existe un usuario a confirmar
    if(!usuarioConfirmar){
        const error = new Error('Token no valido')
        return res.status(404).json({msg:error.message}) //El 404 siginifica no encontrado
    }

    try {
        //Cambiamos confirmado a true y eliminamos el token
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save() //Volvemos a guardar al usuario en la base de datos

        res.json({msg:'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    } 
}

const autenticar = async(req,res)=>{
    const {email,password} = req.body
    //Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg:error.message}) //El 404 siginifica no encontrado
    }

    //Comprobar que el usuario esta confirmado o no
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg:error.message})
    }

    //Revisar el password si es correcto
    if(await usuario.comprobarPassword(password)){
        console.log(usuario)
        //Autenticar
        res.json({
            _id:usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            telefono: usuario.telefono,
            web:usuario.web,
            token:generarJWT(usuario.id),
        })
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg:error.message})
    }
}

export{
    registrar,
    perfil,
    confirmar,
    autenticar,
}