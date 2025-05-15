const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
// Importar servicios
const createToken = require("../services/jwt");

const register = async(req, res) => {
    
    // Obtener parametros por POST a guardar
    let params = req.body;

    if(!params.username || !params.email || !params.password){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }
    
    if(validator.isAlphanumeric(params.username) && validator.isEmail(params.email)) {

        // Validamos si usuario a registrarse ya existe en la BD
        try {
            const userDuplicado = await User.find({email: params.email.toLowerCase()});

            if(userDuplicado.length >= 1){
                return res.status(200).send({
                    status: "success",
                    message: "Usuario ya se encuentra registrado."
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error en la consulta.",
                error: error.message
            });
        }

        // Cifrar contrasena
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        // Crear objeto de User
        let userToSave = new User(params);

        let userStored;

        try {
            // Guardamos usuario en BD
            userStored = await userToSave.save();

            if(!userStored) return res.status(500).json({
                status: "error",
                message: "Error al guardar usuario."
            });

        } catch (error) {
            return res.status(500).send({status: "error", message: "Error al guardar el usuario"});
        }

        return res.status(200).json({
                status: "success",
                message: "Usuario registrado correctamente.",
                user: userStored
            });

    } else{
        return res.status(500).json({
            status: "error",
            message: "Username o email no cumplen con formato."
        });
    }
}

const login = async(req, res) => {
    
    // Obtener parametros
    let parametros = req.body;

    if(!parametros.email || !parametros.password){
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // Buscar en la BD si existe el usuraio
    let user;
    try {
        user = await User.findOne({email: parametros.email});

        if(!user) return res.status(404).json({
            status: "error",
            message: "No existe el usuario."
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al encontrar usuario."
        });
    }

    // Comprobar contrasena
    const pwd = bcrypt.compareSync(parametros.password, user.password);

    if(!pwd){
        return res.status(400).send({
            status: "error",
            message: "No te has identificado correctamente"
        });
    }

    // Conseguir token
    const token = createToken.createToken(user);
    
    return res.status(200).json({
        status: "success",
        message: "Te has identificado correctamente.",
        user: {
            id: user.id,
            username: user.username
        },
        token
    });
}

module.exports = {
    register,
    login
}