const{ Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, esEmailRepetido, existeUsuarioId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', 
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioId),
        check('rol').custom(esRolValido),
        validarCampos
    ] 
    ,usuariosPut);
//Validaciones
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor de 6 caracteres').isLength({min: 6}),
        //check('correo', 'Correo no válido').isEmail(),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('correo').custom(esEmailRepetido),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    usuariosPost);
router.delete('/:id',
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioId),
        validarCampos
    ]
    ,usuariosDelete);


module.exports = router;