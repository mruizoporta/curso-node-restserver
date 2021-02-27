const { response, request } = require('express');
const { Categoria, Producto } = require('../models')

const productosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        productos
    })
}

const ProductoGetID = async(req, res = response) => {
    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto)
}

const crearproducto = async(req, res = response) => {
    const {
        nombre,
        precio,
        categoria,
        descripcion
    } = req.body;
    try {

        //Generar la data a guardar
        const data = {
            nombre,
            precio,
            categoria,
            descripcion,
            usuario: req.usuario.id
        }

        const producto = await new Producto(data);
        producto.save();

        res.status(201).json(producto);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al guardar categoria'
        })
    }

}

const productosPut = async(req, res) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(producto);
}

const productosDelete = async(req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(producto);
}


module.exports = {
    ProductoGetID,
    productosGet,
    crearproducto,
    productosPut,
    productosDelete
}