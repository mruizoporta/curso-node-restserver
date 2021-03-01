const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagenCloudinary, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarEntradaArchivo } = require('../middlewares');

const router = Router();

router.post('/', [validarEntradaArchivo], cargarArchivo);

router.put('/:coleccion/:id', [
    validarEntradaArchivo,
    check('id', 'El Id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
//actualizarImagen

router.get('/:coleccion/:id', [
    check('id', 'El Id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router;