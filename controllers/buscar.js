const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuarios, Categoria, Producto, Role } = require('../models');

const coleccionespermitidas = [
    'usuarios',
    'categorias',
    'productos'
]

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //True

    if (esMongoID) {
        const usuario = await Usuarios.findById(termino);
        return res.json({ results: (usuario) ? [usuario] : [] });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuarios.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]

    });
    res.json({ results: [usuarios] });
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //True

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({ results: (categoria) ? [categoria] : [] });
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });
    res.json({ results: [categorias] });
}


const buscarProductos = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //True

    if (esMongoID) {
        const productos = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({ results: (productos) ? [productos] : [] });
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true });
    res.json({ results: [productos] });
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionespermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionespermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            });
    }


}

module.exports = { buscar }