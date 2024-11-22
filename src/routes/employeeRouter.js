const { Router } = require("express");
const {
  createClientUserHandler,
  getAllClientHandler,
  createInteractionHandler,
  deleteClientHandler, 
  getAllInteractionForIdHandler,
  updateInteractionHandler,
  deleteInteractionHandler,
  getUserByIdHandler,
  getClientByDniHandler,
  updateUserHandler,
  updateClientHandler,
  createReporteHandler,
  getAllReporteHandler,
  updateEstadoReportenHandler
} = require("../handlers/employeeHanders");

const employeeRouter = Router();

/*************** RUTAS DEL USUARIO AUTENTICADO *******************/


// Crear un nuevo cliente
employeeRouter.post("/client/:userId", createClientUserHandler);
//Mostrar todos los clientes
employeeRouter.get("/client", getAllClientHandler)
//Eliminar un cliente
employeeRouter.delete("/client/:id", deleteClientHandler);
//Crear nueva interaccion
employeeRouter.post("/interaction/:userId/:clientId", createInteractionHandler)
//Mostrar todos las interacciones por cliente
employeeRouter.get("/interaction/:clientId", getAllInteractionForIdHandler)
//Actualizar interaccion
employeeRouter.put("/interaction/:interactionId/:userId", updateInteractionHandler)
//Eliminar una interaccion
employeeRouter.delete("/interaction/:id", deleteInteractionHandler);

employeeRouter.get("/info/:id", getUserByIdHandler);

employeeRouter.get("/client/info/:dni", getClientByDniHandler);

employeeRouter.put("/user/update/:id", updateUserHandler)

employeeRouter.put("/client/:clientId", updateClientHandler)

employeeRouter.post("/reporte/:userId", createReporteHandler)

employeeRouter.get("/reporte", getAllReporteHandler)

employeeRouter.put("/reporte/:reporteId/:userId", updateEstadoReportenHandler)


module.exports = employeeRouter;
