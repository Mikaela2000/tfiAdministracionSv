const { Router } = require("express");
const {
    loginUserHandler,
    createCuentaCorrienteHandler,
    getAllCuentaCorrienteForIdHandler,
    createCompraHandler,
    getAllCompraForIdHandler,
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/*************** RUTAS DEL USUARIO AUTENTICADO *******************/
publicRouter.post("/login", loginUserHandler); 

publicRouter.post("/cuenta/:clientId", createCuentaCorrienteHandler)

publicRouter.get("/cuenta/:clientId", getAllCuentaCorrienteForIdHandler)

publicRouter.post("/compra/:clientId", createCompraHandler)

publicRouter.get("/compra/:clientId", getAllCompraForIdHandler)

module.exports = publicRouter;
