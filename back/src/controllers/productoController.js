const Productos = require("../models/Productos");


exports.crearProducto = async (req, res) => {

        try{ 
            const producto = new Productos(req.body);
            await producto.save();
            res.send(producto) 
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
}


exports.obtenerProductos = async (req, res) => {
    try {
        console.log('Query params:', req.query); 

        let filter = {};

        if (req.query.name) {
            filter.nombre = { $regex: req.query.name, $options: 'i' };
        }
        if (req.query.type) {
            filter.tipo = req.query.type;
        }
        if (req.query.priceFrom) {
            filter.precio = { $gte: parseFloat(req.query.priceFrom) };
        }
        if (req.query.priceTo) {
            filter.precio = { ...filter.precio, $lte: parseFloat(req.query.priceTo) };
        }
        if (req.query.isPromotion !== undefined) {
            filter.isPromotion = (req.query.isPromotion === '1');
        }

        
        const orderBy = req.query.orderBy || 'nombre'; 
        const orderDirection = req.query.orderDirection || 'asc'; 

        
        const productos = await Productos.find(filter).sort({ [orderBy]: orderDirection });

        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, tipo, precio, image, isPromotion, discount, status, ingredientes } = req.body;
        let producto = await Productos.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ msg: 'Producto no encontrado' });
        }
        producto.nombre = nombre;
        producto.tipo = tipo;
        producto.precio = precio;
        producto.image = image;
        producto.isPromotion = isPromotion;
        producto.discount = discount;
        producto.status = status;
        producto.ingredientes = ingredientes;
        producto.dateModified = Date.now();
        producto = await Productos.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');

    }
}



exports.getProducto = async (req, res) => {
    try {
        let producto = await Productos.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' }); 
        }
      
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.deleteProducto = async (req, res) => {
    try {
        let producto = await Productos.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        
       const productoEliminado = await Productos.findByIdAndDelete({ _id: req.params.id });
        
       res.json(productoEliminado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
