// controllers/adminControllers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, CuentaCorriente, Compra } = require("../db");

/**************** CONTROLLERS DEL USUARIO AUTORIZADO(ADMIN) ****************/

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    // Verificar si el usuario existe
    if (!user) {
        throw new Error('El usuario no existe');
    }

    // Verificar si el usuario está habilitado
    if (!user.enabled) {
        throw new Error('Este usuario está bloqueado');
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar el token
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { user, token }; // Retorna el usuario y el token
};
const createNewCuentaCorriente = async (
    fecha,
    description,
    importe,
    saldo,
    tipoTransaccion,
    clientId
) => {
    if (!fecha || !description || !importe || !saldo || !tipoTransaccion || !clientId) {
        throw new Error("All fields are required");
    }
    const newCuenta = await CuentaCorriente.create({
        fecha,
        description,
        importe,
        saldo,
        tipoTransaccion,
        ClientId: clientId
    });
    return newCuenta;
};

const getAllCuentaCorrienteForClient = async (clientId) => {
    try {
        const cuentaForClient = await CuentaCorriente.findAll({
            where: {
                ClientId: clientId
            }

        });
        return cuentaForClient;
    } catch (error) {
        throw new Error("Error getting all cuenta for client: " + error.message);
    }
};


const createCompraCorriente = async (
    nameSoft,
    description,
    version,
    price,
    metodoPago,
    clientId
) => {
    if (!nameSoft || !description || !version || !price || !metodoPago || !clientId) {
        throw new Error("All fields are required");
    }
    const newCompra = await Compra.create({
        nameSoft,
        description,
        version,
        price,
        metodoPago,
        ClientId: clientId
    });
    return newCompra;
};

const getAllCompraForClient = async (clientId) => {
    try {
        const CompraForClient = await Compra.findAll({
            where: {
                ClientId: clientId
            }

        });
        return CompraForClient;
    } catch (error) {
        throw new Error("Error getting all compra for client: " + error.message);
    }
};

module.exports = { loginUser, createNewCuentaCorriente, getAllCuentaCorrienteForClient, createCompraCorriente, getAllCompraForClient };
