const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No existe Token'
        });
    }
    try {
        //Verifica que el token es válido -> tiene que tener forma de token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;
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