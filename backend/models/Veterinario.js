import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import generarId from '../helpers//generarId.js'

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true, //Le quita los espacios en blanco tanto en el inicio como en el final
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    telefono:{
        type:String,
        default:null,
        trim: true
    },
    web:{
        type:String,
        default:null,
    },
    token:{
        type:String,
        default: generarId(),
    },
    confirmado:{
        type:Boolean,
        default:false
    }
});

//Hasheamos el registro
veterinarioSchema.pre('save', async function(next){//Modificamos antes de almacenarlo en la base de datos
    if(!this.isModified('password')){ //Esto es para que un password que ya esta hasheado no lo vuelva a hashear
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario,this.password)
}

const Veterinario = mongoose.model("Veterinario",veterinarioSchema) //Registramos el modelo en la base de datos
export default Veterinario;