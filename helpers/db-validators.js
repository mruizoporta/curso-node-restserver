const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esroleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const existeEmail = async(correo = '') => {

    const existeemail = await Usuario.findOne({ correo });
    if (existeemail) {
        throw new Error("Ese correo ya esta registrado");
    }
}

const existeUsuarioPorId = async(id) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = { esroleValido, existeEmail, existeUsuarioPorId }