const { Client, User, Interaction, Reporte} = require("../db");

/************** CONTROLLERS DEL USUARIO AUTENTICADO ****************/

/*Crear nuevo cliente */
const createNewClient = async (nombre, dni, telefono, email, userId) => {
    // Verificar si ya existe un cliente con el mismo email
    const existingClient = await Client.findOne({
        where: { email, dni, telefono},
    });

    if (existingClient) {
        throw new Error("Client with this email already exists");
    }

    // Crear el nuevo cliente sin verificar el nombre
    const newClient = await Client.create({
        nombre,
        dni,
        telefono,
        email,
        UserId: userId,
    });

    console.log("soy el nuevo cliente:", newClient)

    return newClient;
};




// mostrar todos los clientes
const getAllClient = async () => {
    try {
        const allClients = await Client.findAll();
        return allClients;
    } catch (error) {
        throw new Error("Error getting all clients");
    }
};

//eliminar cliente
const deleteClient = async (id) => {
    try {
    
        const clientToDelete = await Client.findByPk(id);

        if (!clientToDelete) {
            throw new Error("Client not found");
        }


        await clientToDelete.destroy();

        return "Client successfully deleted";
    } catch (error) {
        throw new Error("Error deleting the client: " + error.message); 
    }
};

const createNewReporte = async (fecha, detalle, estado, userId) => {
    
    if (!fecha || !detalle || !estado || !userId) {
        throw new Error("All fields are required");
    }
    const newReporte = await Reporte.create({
        fecha,
        detalle,
        estado,
        UserId: userId,
    });
    return newReporte;
};

const getAllReporte = async () => {
    try {
        const allReporte = await Reporte.findAll();
        return allReporte;
    } catch (error) {
        throw new Error("Error getting all reportes");
    }
};

const updateEstadoReporte = async (
    reporteId,
    userId,
    estado
) => {
    if (!reporteId || !userId || !estado ) {
        throw new Error("All fields are required");
    }
    
    const reporte = await Reporte.findOne({
        where: {
            id: reporteId,
            UserId: userId,
        },
    });

    if (!reporte) {
        throw new Error("reporte not found or does not belong to the specified user");
    }

    reporte.estado = estado;


    await reporte.save();
    return reporte;
};



const createNewInteraction = async (
    type,
    date,
    notes,
    userId,
    clientId
) => {
    if (!type || !date || !notes || !userId || !clientId) {
        throw new Error("All fields are required");
    }
    const newInteraction = await Interaction.create({
        type,
        date,
        notes,
        UserId: userId,
        ClientId: clientId
    });
    return newInteraction;
};

//traer todas las interacciones de un cliente por id
const getAllInteractionsForClient = async (clientId) => {
    try {
        const interactionsForClient = await Interaction.findAll({
            where: {
                ClientId: clientId 
            }
        
        });
        return interactionsForClient; 
    } catch (error) {
        throw new Error("Error getting all interactions for client: " + error.message);
    }
};

const updateInteraction = async (
    interactionId,
    userId,
    type,
    date,
    notes
) => {
    if (!interactionId || !userId || !type || !date || !notes) {
        throw new Error("All fields are required");
    }
    
    const interaction = await Interaction.findOne({
        where: {
            id: interactionId,
            UserId: userId,
        },
    });

    if (!interaction) {
        throw new Error("Interaction not found or does not belong to the specified user");
    }

    interaction.type = type;
    interaction.date = date;
    interaction.notes = notes;

    await interaction.save();
    return interaction;
};

const updateClients = async (
    clientId,
    nombre,
    dni,
    telefono,
    email,
    categoria
) => {
    if (!clientId || !nombre || !dni || !telefono || !email || !categoria) {
        throw new Error("All fields are required");
    }
    
    const client = await Client.findOne({
        where: {
            id: clientId,
        },
    });

    if (!client) {
        throw new Error("Client not found or does not belong to the specified user");
    }

    client.nombre = nombre;
    client.dni = dni;
    client.telefono = telefono;
    client.email = email;
    client.categoria = categoria;

    await client.save();
    return client;
};


//eliminar interaccion
const deleteInteraction = async (id) => {
    try {
    
        const interactionToDelete = await Interaction.findByPk(id);

        if (!interactionToDelete) {
            throw new Error("Client not found");
        }


        await interactionToDelete.destroy();

        return "Client successfully deleted";
    } catch (error) {
        throw new Error("Error deleting the client: " + error.message); 
    }
};

const getUserById = async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error("Error getting user by id");
    }
  };
  const getClientByDni = async (dni) => {
    try {
      const client = await Client.findOne({ where: { dni: dni } });
      return client;
    } catch (error) {
      throw new Error("Error getting client by name");
    }
  };

  const UpdateUser = async (name, lastname, email, password) => {
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
  
module.exports = {
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
    updateEstadoReporte
};