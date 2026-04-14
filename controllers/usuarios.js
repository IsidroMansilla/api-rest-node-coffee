const { response } = require('express')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) =>{
    
    //const query = req.query;
    const {nombre = null, apellido = null} = req.query 
    res.json({
        msg: 'get API - Controlador',
        //query
        nombre,
        apellido
    })
};

const usuariosPut = async(req, res = response) =>{
    
    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;

    //Validar contra BD
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: `Modificamos el usuario: ${id}`,
        usuario
    })
};

const usuariosPost = async(req, res = response) =>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    
    
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        });
    }


    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //Guardar en BD
    await usuario.save()

    res.json({
        usuario
    });
};

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'delete API - Controlador'
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}