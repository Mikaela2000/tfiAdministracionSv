const {
  createNewClient,
  getAllClient,
  createNewInteraction,
  deleteClient,
  getAllInteractionsForClient,
  updateInteraction,
  deleteInteraction,
  getUserById,
  getClientByDni,
  updateClients,
  createNewReporte,
  getAllReporte,
  updateEstadoReporte,
} = require("../controllers/employeeControllers");
/************** HANDLERS DEL USUARIO AUTENTICADO ****************/


//Crear Cliente del usuario
const createClientUserHandler = async (req, res) => {
  const { userId } = req.params;
  const { nombre, dni, telefono, email } = req.body;
  console.log({nombre, dni,  telefono, email})

  try {
    if (!nombre|| !dni || !telefono || !email) {
      throw Error("All fields are not complete");
    }
    console.log("emtro al try")
    const newClient = await createNewClient(nombre, dni, telefono, email, userId);

    if (!newClient) {
      throw Error("Client is not created");
    }

    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllClientHandler = async (req, res) => {
  try {
    const allClients = await getAllClient();
    res.status(200).json(allClients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteClientHandler = async (req, res) => {
  const { id } = req.params; // Obtener el ID del cliente de los parámetros
  try {
    // Llama a la función deleteClient pasando el ID
    const deletedClient = await deleteClient(id); // Asegúrate de que esta función esté bien definida

    // Si se eliminó correctamente
    if (deletedClient) {
      return res.status(200).json({ message: 'Cliente eliminado correctamente.' });
    } else {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createReporteHandler = async (req, res) => {
  const { userId } = req.params;
  const { fecha, detalle, estado } = req.body;
  try {
    if (!fecha || !detalle || !estado ) {
      throw Error("All fields are not complete");
    }
    const newReporte = await createNewReporte(
      fecha,
      detalle,
      estado,
      userId,
    
    );
    if (!newReporte) {
      throw Error("Reporte is not created");
    }
    res.status(201).json(newReporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllReporteHandler = async (req, res) => {
  try {
    const allReporte = await getAllReporte();
    if (allReporte.length === 0) {
      throw Error("No reporte found");
    }
    res.status(200).json(allReporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEstadoReportenHandler = async (req, res) => {
  const { reporteId, userId } = req.params;
  const { estado } = req.body;

  try {
    if (!estado) {
      throw new Error("All fields are required");
    }

    const updatedReporte = await updateEstadoReporte(
      reporteId,
      userId,
      estado,
    );

    if (!updatedReporte) {
      throw new Error("Reporte could not be updated");
    }

    res.status(200).json(updatedReporte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createInteractionHandler = async (req, res) => {
  const { userId, clientId } = req.params;
  const { type, date, notes } = req.body;
  try {
    if (!type || !date || !notes) {
      throw Error("All fields are not complete");
    }
    const newInteraction = await createNewInteraction(
      type,
      date,
      notes,
      userId,
      clientId
    );
    if (!newInteraction) {
      throw Error("Interaction is not created");
    }
    res.status(201).json(newInteraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllInteractionForIdHandler = async (req, res) => {
  const { clientId } = req.params; 
  try {
    const allInteractions = await getAllInteractionsForClient(clientId); 
    res.status(200).json(allInteractions); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateClientHandler = async (req, res) => {
  const { clientId } = req.params;
  const { nombre, dni,  telefono, email,categoria } = req.body;

  try {
      // Llamar al servicio para actualizar el cliente
      const updatedClient = await updateClients(clientId, nombre, dni, telefono, email, categoria);

      res.status(200).json(updatedClient);
  } catch (error) {
      console.error("Error al actualizar cliente:", error.message);

      res.status(error.message === "All fields are required" ? 400 : 404).json({
          error: error.message,
      });
  }
};
const updateInteractionHandler = async (req, res) => {
  const { interactionId, userId } = req.params;
  const { type, date, notes } = req.body;

  try {
    if (!type || !date || !notes) {
      throw new Error("All fields are required");
    }

    const updatedInteraction = await updateInteraction(
      interactionId,
      userId,
      type,
      date,
      notes
    );

    if (!updatedInteraction) {
      throw new Error("Interaction could not be updated");
    }

    res.status(200).json(updatedInteraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteInteractionHandler = async (req, res) => {
  const { id } = req.params; 
  try {
  
    const deletedInteraction = await deleteInteraction(id); 

    if (deletedInteraction) {
      return res.status(200).json({ message: 'Interaccion eliminada correctamente.' });
    } else {
      return res.status(404).json({ message: 'Interaccion no encontrada.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      throw Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getClientByDniHandler = async (req, res) => { 
  const { dni } = req.params;
  try {
    const client = await getClientByDni(dni);
    if (!client) {
      throw Error("Client not found");
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//Actualizar usuario
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password, phonenumber} = req.body;

  try {
    const user = await getUserById(id);
    console.log(user)


      if (!user) {
      console.log("No se encontró el usuario con id:", id); // Agregar log para depuración
      return null;
    }

    if (name) {
      user.name = name;
    }
    if (lastname) {
      user.lastname = lastname;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (phonenumber) {
      user.phonenumber = phonenumber;
    }
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


module.exports = {
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
};