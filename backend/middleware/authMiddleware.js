import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

const checkAuth = async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token= req.headers.authorization.split(' ')[1]; //Split regresa un arreglo y el token estara en la posicion 1
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //Guardamos el veterinario que esta autentciado
            req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado') //NO quiero el password ni el token ni el confirmado

            return next();
        } catch (error) {
            //Nunca hubo un token
            const er = new Error('Token no valido')
            return res.status(403).json({msg:er.message});
        }
    }

    if(!token){
        const error = new Error('Token no valido o inexistente')
        return res.status(403).json({msg:error.message});
    }
    next();
}

export default checkAuth;