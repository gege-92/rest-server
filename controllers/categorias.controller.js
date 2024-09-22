const { response } = require('express'); 
const { request } = require('express');
const { Categoria } = require('../models');

//obtenerCategorias (paginado - total de categorias - populate)
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true }
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre') 
            .skip(desde)
            .limit(limite)
    ]);

    res.status(200).json({
        msg:'CategoriasGet OK!',
        total,
        categorias
    });

}

//obtenerCategoria - populate (devuelve el objeto)
const obtenerCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id );

    res.status(200).json({
        categoria
    })
}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase(); // filtro busqueda

    //Verifico que no exista esa categoria
    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria: ${ categoriaDB.nombre }, ya existe`
        })
    }

    // Generar la data
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria ( data );
    
    //Guardo en la DB
    await categoria.save();

    res.status(201).json({
        msg:'crearCategoria OK!',
        categoria
    });

}

//actualizarCategoria
const actualizarCategoria = async(req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    // Modifico la data que quiero actualizar
    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id; 
    

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }); 

    res.json( categoria );

}

//borrarCategoria - estado:false
const borrarCategoria = async(req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado:false })

    res.json({
        categoria
    })

}


module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}