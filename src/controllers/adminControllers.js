const { Client, User } = require("../db");
/**************** CONTROLLERS DEL USUARIO AUTORIZADO(ADMIN) ****************/

const createNewUser = async (name, lastname, email, password) => {
  const [newUser, created] = await User.findOrCreate({
    //busca por estos datos al usuario
    where: { name, lastname, email, password },
    //sino lo encuentra lo crea con los valores del defaults
    defaults: { name, lastname, email, password },
  });
  if (!created) {
    throw new Error("User already exists");
  }
  return newUser;
};

const enabledUser = async (id, enabled) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Actualiza el campo 'enabled' en la base de datos
    await user.update({ enabled: enabled });
    await user.save();

    return { message: 'User updated successfully', enabled: enabled };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error while getting users");
  }
};

const roleUser = async (id, role) => {
  try {
    const user = await User.findByPk(id);
    console.log("entro", {user})
    if (!user) {
      throw new Error("User not found");
    }


    await user.update({ role: role });
    await user.save();

    return { message: 'User updated successfully', role: role };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createNewUser, enabledUser, getAllUsers, roleUser };
