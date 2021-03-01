const Role = require('../models/role');
const { Usuario, Categoria } = require('../models');

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

const existeCategoria = async(id) => {

    // Verificar si la categoria existe
    const existeCategoria = await Categoria.findById({ _id: id });
    if (!existeCategoria) {
        throw new Error(`La categoria no existe ${ id }`);
    }
}

const existeProducto = async(id) => {

    // Verificar si el producto existe
    const existeProducto = await Producto.findById({ _id: id });

    if (!existeProducto) {
        throw new Error(`El producto no existe ${ id }`);
    }
}

//Validad opciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}



module.exports = {
    esroleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}