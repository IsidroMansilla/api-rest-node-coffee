const {response} = require('express');

const esAdminRole = (req, res = response, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const {rol, nombre} = req.usuario ;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede realizar esta acción`
        })
    }
    next();
}
const tieneRole = ( ...roles ) => {
    console.log(roles)
    return (req, res = response, next) => {
        if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    if(!roles.includes(req.usuario.rol)){
        return res.status(401).json({
            msg: `El rol ${req.usuario.rol} no es válido para realizar esta acción`
        })
    }
    next();
    }
    
}

module.exports = {
    esAdminRole, tieneRole
}