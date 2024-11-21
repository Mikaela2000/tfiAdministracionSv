const {
  createNewUser,
  enabledUser,
  getAllUsers,
  roleUser,

} = require("../controllers/adminControllers");

//Crear usuario de prueba
const registerNewUserHandler = async (req, res) => {
  var { name, lastname, email, password } = req.body;

  try {
    if (!email || !password || !name || !lastname) {
      throw new Error("All fields are not complete");
    }
    const newUser = await createNewUser(name, lastname, email, password);

    if (!newUser) {
      throw new Error("User not created");
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const changeEnabledUserHandler = async (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;

  try {
    const updateEnabledUser = await enabledUser(id, enabled);

    res.status(200).json(updateEnabledUser);
  } catch (error) {
    res.status(404).json({ message: error.message, enabled: false });
  }
};


const changeRoleUserHandler = async (req, res) => {
  const { id } = req.params; 
  const { role } = req.body; 
  console.log({id, role})

  if (!["employee", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role value", role: false });
  }

  try {
    const updateRoleUser = await roleUser(id, role);
    return res.status(200).json(updateRoleUser); 

  } catch (error) {
    return res.status(404).json({ message: error.message, role: false });
  }
};


const getAllUsersHandler = async (req, res) => {
  try {
    const admins = await getAllUsers();
    if (admins.length === 0) {
      throw Error("There are not Admins");
    }
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
  getAllUsersHandler,
  registerNewUserHandler,
  changeEnabledUserHandler,
  changeRoleUserHandler
};
