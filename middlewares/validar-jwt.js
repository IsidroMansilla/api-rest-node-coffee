const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async(req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No existe Token'
        });
    }
    try {
        //Verifica que el token es válido -> tiene que tener forma de token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        //Verificar si el uid tiene estado = true
        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe'
            })
        }
        
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario no válido para eliminiar'
            })
        }

        req.usuario = usuario;
        next();
        
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })

    }

}


module.exports = {
    validarJWT
}