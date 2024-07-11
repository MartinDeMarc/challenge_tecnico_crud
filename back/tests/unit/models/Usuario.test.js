const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('../../../src/models/Usuarios');

dotenv.config({ path: 'variables.env' });

jest.setTimeout(30000); 

describe('Usuario Model Test', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Usuario.deleteMany({});
  });

  it('should create & save user successfully', async () => {
    const validUser = new Usuario({
      nombre: 'Juan Perez',
      usuario: 'juanperez',
      contraseña: 'password123'
    });
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.nombre).toBe(validUser.nombre);
    expect(savedUser.usuario).toBe(validUser.usuario);
    expect(savedUser.contraseña).toBe(validUser.contraseña);
  });

  it('should fail when required fields are missing', async () => {
    const userWithoutRequiredField = new Usuario({ nombre: 'Test' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should not create user with duplicate usuario', async () => {
    const user1 = new Usuario({
      nombre: 'Juan Perez',
      usuario: 'juanperez',
      contraseña: 'password123'
    });
    await user1.save();

    const user2 = new Usuario({
      nombre: 'Juan Perez',
      usuario: 'juanperez',
      contraseña: 'password123'
    });
    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000);  
  });

});