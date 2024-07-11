const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de autenticación
router.post("/login", authController.postLogin);
router.post("/registro", authController.postSignup);
router.post("/logout", authController.postLogout);



module.exports = router;