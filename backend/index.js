import express from 'express'; //Cuando son dependencias que instalas via NPM no se requiere la extension JS
import dotenv from 'dotenv';
import cors from 'cors'
import conectarDB from './config/db.js'; //Cuando son archivos que creas se necesita la extension JS
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'

const app = express();
app.use(express.json())//Asi se hace para hacerle saber que le enviaremos datos tipos JSON

dotenv.config();

conectarDB();

const domioniosPermitidos = [process.env.FRONTEND_URL]

const corsOptions ={
    origin: function(origin,callback){
        if(domioniosPermitidos.indexOf(origin)!==-1){
            //El origen del request esta permitido
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.use('/api/veterinarios',veterinarioRoutes);
app.use('/api/pacientes',pacienteRoutes);

const PORT = process.env.PORT||4000;

app.listen(PORT,()=>{ //Registramos el servidor en el puerto que este libre ya en produccion
    console.log(`Servidor funcionando en el puerto ${PORT}`)
});
