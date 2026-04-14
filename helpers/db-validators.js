const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '' )  => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const esEmailRepetido = async(email = '') =>{
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El correo ${email} ya está validado anteriormente`); 
    }
}
const existeUsuarioId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`); 
    }
}


module.exports = {
    esRolValido, esEmailRepetido, existeUsuarioId
};