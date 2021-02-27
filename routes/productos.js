const { Router } = require('express');
const { check } = require('express-validator');
const { esroleValido, existeEmail, existeUsuarioPorId, existeProducto, existeCategoria } = require('../helpers/db-validators');

const {
    ProductoGetID,
    productosGet,
    crearproducto,
    productosPut,
    productosDelete
} = require('../controllers/productos');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
} = require('../middlewares')


const router = Router();

router.get('/', productosGet);

router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    // check('id').custom(existeProducto),
    validarCampos
], ProductoGetID);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El Id de categoria no es Id valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearproducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    //check('id').custom(existeProducto),
    check('categoria').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], productosPut);

router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un Id valido').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos
    ],
    productosDelete);



module.exports = router;