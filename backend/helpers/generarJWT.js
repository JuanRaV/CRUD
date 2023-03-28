import jwt from 'jsonwebtoken'

const generarJWT = (id)=>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:'30d', //Se autentica cada 30 dias
    }); //Esto crea un nuevo JWT
}

export default generarJWT;