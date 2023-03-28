import mongoose from 'mongoose'

const conectarDB = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        const url = `${db.connection.host}:${db.connection.port}`
        //console.log(`MongoDB conectado en: ${url}`)

    } catch (error) {
        //Imprime msj de error si no se logra conectar a la base de datos
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;