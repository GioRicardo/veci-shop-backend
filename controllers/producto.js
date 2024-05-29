
const { request, response } = require('express');
const Usuario = require('../models/usuario');
const Producto = require("../models/producto");
const Categoria = require("../models/categoria");
const SubCategoria = require("../models/subCategoria");
/**
 * crear
 */
const createProducto = async (req = request, res = response) => {
    try {
        const { usuario, sub_categoria, nombre, descripcion, precio, stock, img } = req.body;

        const usuarioBD = await Usuario.findOne({
            _id: usuario
        })
        if(!usuarioBD){
            return res.status(400).json({
                msj: 'No existe el usuario'
            })
        }
        const categoriaBD = await SubCategoria.findOne({
            _id: sub_categoria
        })
        if(!categoriaBD){
            return res.status(400).json({
                msj: 'No existe la subcategoria'
            })
        }
        const datos = {
            usuario,
            sub_categoria,
            nombre,
            descripcion,
            precio,
            stock,
            img
        }

        const producto = new Producto(datos); 

        await producto.save();

        

        return res.status(201).json(producto);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

 }
/**
 * Consultar todos 
 */
const getProductos = async (req, res = response) => {
    try {
        const productoDB = await Producto.find().populate({
            path: 'usuario'
        });
        return res.json(productoDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Consultar por Id
 */
const getProductoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {_id: id}
        const productoDB = await Producto.findOne(query).populate({
            path: 'usuario'
        });
        return res.json(productoDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

const getProductosPorUsuario = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {"usuario": id}
        const productosDB = await Producto.find(query).populate({
            path: 'usuario'
        }).populate({
            path: 'sub_categoria'
        });
        return res.json(productosDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

const getProductosPorSubCategoria = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {"sub_categoria": id}
        const productosDB = await Producto.find(query).populate({
            path: 'usuario'
        }).populate({
            path: 'sub_categoria'
        });
        return res.json(productosDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

const getProductosPorCategoria = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const subCategoriasDB = await SubCategoria.find({"categoria": id});
        const subCategoriasIds = subCategoriasDB.map(subCategoria => subCategoria._id);
        const productosDB = await Producto.find({sub_categoria: {$in: subCategoriasIds}}).populate({
            path: 'usuario'
        }).populate({
            path: 'sub_categoria'
        });
        return res.json(productosDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza por su ID
 */
const updateProductoPorId = async (req = request, res = response) => {
    try {
                      
        const { id } = req.params
               
        if(req.body.usuario && req.body.categoria){
            const { usuario, categoria, nombre, descripcion, precio, stock, img } = req.body
            
            const data = {
                usuario,
                categoria,
                nombre,
                descripcion,
                precio,
                stock,
                img
            }
            const usuarioBD = await Usuario.findOne({
                _id: usuario
            })
            if(!usuarioBD){
                return res.status(400).json({
                    msj: 'No existe el usuario'
                })
            }
            const categoriaBD = await Categoria.findOne({
                _id: categoria
            })
            if(!categoriaBD){
                return res.status(400).json({
                    msj: 'No existe la categoria'
                })
            }
            const producto = 
                await Producto.findByIdAndUpdate(id, data, {new : true});

        return res.status(201).json(producto)  
        } else {

            const { id } = req.params
            const data = req.body

            const productoDB = await Producto.findByIdAndUpdate(id, data, {new : true});

            if(!productoDB) return res.json({msg: 'No hay datos con ese ID de producto'})
        
            return res.json(productoDB)
        }
        
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Borrar por su ID
 */
const deleteProductoByID = async (req = request, res = response) => {
    try{
        const id = req.params.id;
        const producto = await Producto.findByIdAndDelete(id);

        if (!producto) {
            // Si el producto no se encontró
            return res.status(404).json({ msj: "Producto no encontrado" });
        }

        // Si el producto se eliminó correctamente
        return res.status(200).json({ msj: "Producto eliminado con éxito", producto });

         }catch(e) {
            console.log(e);
            return res.status(500).json({msj: e})
        }
}


module.exports = { 
    createProducto,
    getProductos,
    getProductoPorId,
    updateProductoPorId,
    deleteProductoByID,
    getProductosPorUsuario,
    getProductosPorSubCategoria,
    getProductosPorCategoria
}