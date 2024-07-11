const bcrypt = require('bcrypt');
const User = require("../models/Usuarios");



exports.postSignup = async (req, res) => {
    try {
        const data = {
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            contraseña: req.body.contraseña
        }
        const existingUser = await User.findOne({ usuario: data.usuario });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.contraseña, saltRounds);
            data.contraseña = hashedPassword;
            const userdata = await User.insertMany(data);
            console.log(userdata);
            return res.status(201).json({ message: 'Usuario creado exitosamente', user: userdata[0] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.postLogin = async (req, res) => {
    try {
        const check = await User.findOne({ usuario: req.body.usuario });
        if (!check) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.contraseña, check.contraseña);
        if (!isPasswordMatch) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }
        res.status(200).json({ mensaje: "Inicio de sesión exitoso" });
    } catch {
        console.error(error);
        res.send("wrong Details");
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

exports.postLogout = (req, res) => {
    res.status(200).json({ mensaje: "Cierre de sesión exitoso" });
};