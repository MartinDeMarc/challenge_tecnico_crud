const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Producto = require('../../../src/models/Productos');

dotenv.config({ path: 'variables.env' }); 

jest.setTimeout(30000); 

describe('Producto Model Test', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save product successfully', async () => {
    const validProduct = new Producto({
      nombre: 'Hamburguesa Clásica',
      tipo: 'burger',
      precio: 10.99,
      ingredientes: ['pan', 'carne', 'lechuga', 'tomate']
    });
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.nombre).toBe(validProduct.nombre);
    expect(savedProduct.image).toBe("https://gulagu.es/wp-content/uploads/2020/12/hamburguesa-generica-01-600x600.jpg");
    expect(savedProduct.status).toBe('active');
  });

  it('should fail when required fields are missing', async () => {
    const productWithoutRequiredField = new Producto({ nombre: 'Test' });
    let err;
    try {
      await productWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });


});