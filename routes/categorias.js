const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth');
const {
    crearCategoria,
    CategoriaGet,
    CategoriaPut,
    CategoriaDelete,
    CategoriaGetID
} = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', CategoriaGet);

//Obtener una categoria por ID - pubico 
router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], CategoriaGetID);

//Crear categoria - privado - cualquier persona con un token valido 
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquier con token valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], CategoriaPut);


//Borrar una categoria - solo si es un admin
router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un Id valido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
    ],
    CategoriaDelete);

module.exports = router;