const { Router } = require('express');
// Importar todos los routers;
const employeeRouter =require("./employeeRouter")
const adminRouter =require("./adminRouter")
const publicRouter =require("./publicRouter")


const router = Router();

/***********CONFIGURAR LAS RUTAS*************/

//Rutas privadas
router.use("/employee",employeeRouter);
router.use("/admin",adminRouter);
router.use("/public",publicRouter);

module.exports = router;