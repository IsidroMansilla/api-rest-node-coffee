const { response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const login = async(req, res = response) => {

    const { correo, password} = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario'
            });
        }
        //Usuario activo en BD?
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        //Verificar passw
        const validPassword = bcryptjs.compareSync(password, usuario.password);
         if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        //Generar JWT


        res.json({
            msg: 'Login ok'
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Contacte con el administrador'
        })
    }

}

module.exports = {
    login
}