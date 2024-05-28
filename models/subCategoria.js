const { Schema, model } = require('mongoose')


const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
}, { timestamps: true})

module.exports = model('SubCategoria', CategoriaSchema)

