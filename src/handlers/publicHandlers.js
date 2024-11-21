// handlers/publicHandlers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUser, createNewCuentaCorriente, getAllCuentaCorrienteForClient, createCompraCorriente, getAllCompraForClient } = require("../controllers/publicControllers");

// Función para generar el token JWT
const generateToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role }; // Datos del usuario que se incluirán en el token
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); // Firmar el token con una clave secreta y establecer una duración
};

// Handler para el login
const loginUserHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar que los campos no estén vacíos
        if (!email || !password) {
            throw new Error("Completar todos los campos");
        }

        // Llamar al controlador de login
        const { user, token } = await loginUser(email, password);

        // Enviar la respuesta con el token y los datos del usuario
        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ error: error.message }); // Mostrar mensaje de error
    }
};


const createCuentaCorrienteHandler = async (req, res) => {
    const { clientId } = req.params;
    const {
        fecha,
        description,
        importe,
        saldo,
        tipoTransaccion } = req.body;
    try {
        if (!fecha || !description || !importe || !saldo || !tipoTransaccion) {
            throw Error("All fields are not complete");
        }
        const newCuenta = await createNewCuentaCorriente(
            fecha,
            description,
            importe,
            saldo,
            tipoTransaccion,
            clientId
        );
        if (!newCuenta) {
            throw Error("Cuenta is not created");
        }
        res.status(201).json(newCuenta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getAllCuentaCorrienteForIdHandler = async (req, res) => {
    const { clientId } = req.params;
    try {
        const allCuentas = await getAllCuentaCorrienteForClient(clientId);
        if (allCuentas.length === 0) {
            throw new Error("No cuentas found for this client");
        }
        res.status(200).json(allCuentas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const createCompraHandler = async (req, res) => {
    const { clientId } = req.params;
    const {
        nameSoft,
        description,
        version,
        price,
        metodoPago } = req.body;
    try {
        if (!nameSoft || !description || !version || !price || !metodoPago) {
            throw Error("All fields are not complete");
        }
        const newCompra = await createCompraCorriente(
            nameSoft,
            description,
            version,
            price,
            metodoPago,
            clientId
        );
        if (!newCompra) {
            throw Error("Compra is not created");
        }
        res.status(201).json(newCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllCompraForIdHandler = async (req, res) => {
    const { clientId } = req.params;
    try {
        const allCompra = await getAllCompraForClient(clientId);
        if (allCompra.length === 0) {
            throw new Error("No compras found for this client");
        }
        res.status(200).json(allCompra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUserHandler,
    createCuentaCorrienteHandler,
    getAllCuentaCorrienteForIdHandler,
    createCompraHandler,
    getAllCompraForIdHandler,
};
