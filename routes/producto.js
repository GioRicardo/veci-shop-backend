const { Router } = require('express');

const  { 
    createProducto,
    getProductos,
    getProductoPorId,
    updateProductoPorId,
    deleteProductoByID,
    getProductosPorUsuario,
    getProductosPorCategoria,
    getProductosPorSubCategoria
} = require('../controllers/producto');

const router = Router();

/**
 * Obtiene todos
 */

router.get('/productos_por_usuario/:id', getProductosPorUsuario);
router.get('/productos_por_categoria/:id', getProductosPorCategoria);
router.get('/productos_por_subcategoria/:id', getProductosPorSubCategoria);
router.get('/', getProductos);

/**
 * Obtiene  por id
 */
 router.get('/:id', getProductoPorId);

/**
 * Crear 
 */
router.post('/', createProducto);

/**
 * Actualiza por id
 */
router.put('/:id', updateProductoPorId);

router.delete('/:id', deleteProductoByID);

/**
 * Actualiza una parte del tipos de equipos
 */
/*router.patch('/:id', (req, res) => {
    res.json({});
});*/

/**
 * Borra un tipos de equipos por id
 */
 //router.delete('/:id', deleteTipoEquipoByID);

module.exports = router;