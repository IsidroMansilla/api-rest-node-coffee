const { response } = require('express')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) =>{
    
    const {limite = "5", desde ="0"} = req.query;
    //const usuarios = await Usuario
    //                            .find({estado: true})
    //                            .skip(desde)
    //                            .limit(limite);
    //const total = await Usuario.countDocuments({estado: true});
    //Los await que hay encima son bloqueantes... Esperar a que termine el primero y despues esperar a que termine el segundo
    //Con Promise.all ejecuta los dos await de manera simultanea
    const [total, usuarios] = await Promise.all(
        [
            Usuario.countDocuments({estado: true}),
            Usuario
                .find({estado: true})
                .skip(desde)
                .limit(limite)
        ]
    )
    res.json({total, usuarios});
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

//*************************************************************************** */
//Normalmente no se hace de esta manera ya que perdemos toda la info del usuario
// , lo que se debe hacer es cambiar el estado,
//Miramos usuariosDelete siguiente
//*************************************************************************** */
//const usuariosDelete = async(req, res = response) =>{
//    const {id} = req.params;
//    const usuario = await Usuario.findByIdAndDelete(id);
//    res.json({
//        usuario
//    })
//};
const usuariosDelete = async(req, res = response) =>{
    const {id} = req.params;
    const uid = req.uid;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        usuario, uid
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}