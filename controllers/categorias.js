const { response, request } = require("express");
const { Categoria } = require('../models')

//Obtener categorias - paginado - Total - populate
const CategoriaGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        categorias
    })
}

//Obtener categoria - populate{}
const CategoriaGetID = async(req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findOne({ _id: id }).populate('usuario', 'nombre');
    res.json(categoria)
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    try {

        const categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            });
        }

        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = await new Categoria(data);
        categoria.save();

        res.status(201).json(categoria);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al guardar categoria'
        })
    }

}

//Actualizar categoria 

const CategoriaPut = async(req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
}

//Borrar categoria - estado : false
const CategoriaDelete = async(req, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoria);
}

module.exports = {
    crearCategoria,
    CategoriaGet,
    CategoriaGetID,
    CategoriaPut,
    CategoriaDelete
}