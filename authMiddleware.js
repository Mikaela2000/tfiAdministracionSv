const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Obtiene el token del encabezado

    if (!token) {
        return res.sendStatus(403); // Prohibido
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Prohibido
        }
        req.user = user; // Guarda la información del usuario en la solicitud
        next(); // Llama al siguiente middleware o ruta
    });
};

module.exports = authenticateJWT;