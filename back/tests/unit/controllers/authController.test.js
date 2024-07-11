const bcrypt = require('bcrypt');
const { postSignup, postLogin, postLogout } = require('../../../src/controllers/authController');
const User = require('../../../src/models/Usuarios');

jest.mock('../../../src/models/Usuarios');
jest.mock('bcrypt');

describe('Auth Controller', () => {
  describe('postSignup', () => {
    it('should create a new user successfully', async () => {
      const req = {
        body: {
          nombre: 'Test User',
          usuario: 'testuser',
          contraseña: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.insertMany.mockResolvedValue([{ ...req.body, contraseña: 'hashedPassword' }]);

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Usuario creado exitosamente',
        user: expect.objectContaining({
          nombre: 'Test User',
          usuario: 'testuser'
        })
      });
    });

    it('should return 400 if user already exists', async () => {
      const req = {
        body: {
          nombre: 'Existing User',
          usuario: 'existinguser',
          contraseña: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue({ usuario: 'existinguser' });

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'El usuario ya existe' });
    });
  });

  describe('postLogin', () => {
    it('should login successfully with correct credentials', async () => {
      const req = {
        body: {
          usuario: 'testuser',
          contraseña: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue({
        usuario: 'testuser',
        contraseña: 'hashedPassword'
      });
      bcrypt.compare.mockResolvedValue(true);

      await postLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensaje: "Inicio de sesión exitoso" });
    });

    it('should return 404 if user not found', async () => {
      const req = {
        body: {
          usuario: 'nonexistentuser',
          contraseña: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue(null);

      await postLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ mensaje: "Usuario no encontrado" });
    });

    it('should return 401 if password is incorrect', async () => {
      const req = {
        body: {
          usuario: 'testuser',
          contraseña: 'wrongpassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      User.findOne.mockResolvedValue({
        usuario: 'testuser',
        contraseña: 'hashedPassword'
      });
      bcrypt.compare.mockResolvedValue(false);

      await postLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ mensaje: "Contraseña incorrecta" });
    });
  });

  describe('postLogout', () => {
    it('should logout successfully', () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      postLogout(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensaje: "Cierre de sesión exitoso" });
    });
  });
});