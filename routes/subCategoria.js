const { Router } = require('express')
const { createSubCategoria, getSubCategorias, updateSubCategoria, deleteSubCategoria, getSubCategoriasPorCategoria, getSubCategoriaNinguno} = require('../controllers/subCategoria')


const router = Router()


// crear
router.post('/', createSubCategoria)

// editar categoria
router.put('/', updateSubCategoria)

// listar
router.get('/', getSubCategorias)

// listar por categoria
router.get('/sub_categorias_por_categoria/:id', getSubCategoriasPorCategoria)

//traer id ninguno
router.get('/ninguno', getSubCategoriaNinguno)

//Eliminar categoria

router.delete('/', deleteSubCategoria)

module.exports = router
