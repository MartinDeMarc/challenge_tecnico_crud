const { deleteProducto } = require("../../../src/controllers/productoController");
const Productos = require('../../../src/models/Productos');

jest.mock('../../../src/models/Productos');

describe('deleteProducto', () => {
  it('should delete a product and return it', async () => {
    const mockProducto = {
      _id: "668eac7c11b30e4e0a1d4886",
      nombre: "pepsi",
      tipo: "bebidas",
      precio: 432,
      image: "https://gulagu.es/wp-content/uploads/2020/12/hamburguesa-generica-01-600x600.jpg",
      isPromotion: false,
      status: "active",
      ingredientes: ["Azucar"],
      dateCreated: "2024-07-10T15:45:00.101Z",
      __v: 0
    };

    Productos.findById.mockResolvedValue(mockProducto);
    Productos.findByIdAndDelete.mockResolvedValue(mockProducto);

    const req = { params: { id: '668eac7c11b30e4e0a1d4886' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await deleteProducto(req, res);

    expect(Productos.findById).toHaveBeenCalledWith('668eac7c11b30e4e0a1d4886');
    expect(Productos.findByIdAndDelete).toHaveBeenCalledWith({ _id: '668eac7c11b30e4e0a1d4886' });
    expect(res.json).toHaveBeenCalledWith(mockProducto);
  });

  it('should return 404 if product not found', async () => {
    Productos.findById.mockResolvedValue(null);

    const req = { params: { id: 'nonexistentid' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await deleteProducto(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Producto no encontrado' });
  });
});