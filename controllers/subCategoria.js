const SubCategoria = require('../models/subCategoria')
const {request, response} = require('express')
const Categoria = require("../models/categoria");


//Creación

const createSubCategoria = async (req = request,
    res = response) => {
    try{

        const { categoria } = req.body;

        const categoriaBD = await Categoria.findOne({
            _id: categoria
        })
        if(!categoriaBD){
            return res.status(400).json({
                msj: 'No existe la categoria'
            })
        }
        console.log(req.body)
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const subCategoriaBD = await SubCategoria.findOne({nombre})
        if(subCategoriaBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre,
            categoria
        }
        const subcategoria = new SubCategoria(data)
        await subcategoria.save()
        return res.status(201).json(subcategoria)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}


//Edición de categoria

const updateSubCategoria = async ( req = request, res = response) => {
    try{
        const { id } = req.query
        const data = req.body

        const categoriasDB = await SubCategoria.findByIdAndUpdate(id,data, {new: true})

        if(!categoriasDB) return res.json({msg: 'No hay datos'})
        
        return res.json({categoriasDB})

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

//Listar todos

const getSubCategorias = async (req = request,
    res = response,next) => {
    try{
        if(req.query.estado) return next();

        const categoriasDB = await SubCategoria.find({})
        if(categoriasDB.length == 0 ) {
            return res.json({msg: 'No hay datos'})
        } else {
            return res.json(categoriasDB)
        }
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}

const getSubCategoriaNinguno = async (req = request,
    res = response,next) => {
    try{
        if(req.query.estado) return next();

        const query = {"nombre": "NINGUNO"}
        const categoriasDB = await SubCategoria.find(query).populate({
            path: 'categoria'
        });
        if(categoriasDB.length == 0 ) {
            return res.json({msg: 'No hay datos'})
        } else {
            return res.json(categoriasDB)
        }
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}

const getSubCategoriasPorCategoria = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {"categoria": id}
        const subCategoriasDB = await SubCategoria.find(query).populate({
            path: 'categoria'
        });
        return res.json(subCategoriasDB)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}


const deleteSubCategoria = async ( req = request, res = response) => {
    try{
        const { id } = req.query

        const categoriasDB = await SubCategoria.findById(id)

        if(categoriasDB){
            const categoriasDBfound = await SubCategoria.findByIdAndDelete(id)
            return res.json({msg: 'La categoria fue eliminada con exito'})
        }
        if(!categoriasDB){
            return res.json({msg: 'No existe ese id'})
        } 
        

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}

module.exports = {createSubCategoria, getSubCategorias, updateSubCategoria, deleteSubCategoria, getSubCategoriasPorCategoria, getSubCategoriaNinguno}