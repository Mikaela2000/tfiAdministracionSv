const { Router } = require("express");

const {
    registerNewUserHandler,
    changeEnabledUserHandler,
    getAllUsersHandler,
    changeRoleUserHandler,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/************ RUTAS DEL USUARIO AUTORIZADO(ADMIN) ***************/

adminRouter.post("/registers", registerNewUserHandler);
//Actualizar habilitacion user
adminRouter.put("/user/enabled/:id",changeEnabledUserHandler);

adminRouter.get("/users", getAllUsersHandler)

adminRouter.put("/user/role/:id",changeRoleUserHandler);

module.exports = adminRouter;
