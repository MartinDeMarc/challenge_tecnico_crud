const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.post('/',  productoController.crearProducto) 

router.get('/', productoController.obtenerProductos)

router.put('/:id', productoController.actualizarProducto)

router.get('/:id', productoController.getProducto)

router.delete('/:id', productoController.deleteProducto)

module.exports = router;