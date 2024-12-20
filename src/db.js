require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST , DB_NAME, DB_PORT, DB_DEPLOY } = process.env;

//Si quieren correr de manera local descomenten const sequelize(line9-15)
// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

//Deploy con sequelize-->comentar si lo haran de manera local
// const sequelize = new Sequelize(
//   DB_DEPLOY,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     }
// );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades

// Para relacionarlos hacemos un destructuring
const { User, Client, Interaction, Compra, CuentaCorriente, Reporte } = sequelize.models;

// Aca vendrian las relaciones
User.hasMany(Client);
Client.belongsTo(User)

User.hasMany(Interaction);
Interaction.belongsTo(User)

Client.hasMany(Interaction);
Interaction.belongsTo(Client)

Client.hasMany(Compra);
Compra.belongsTo(Client);

Client.hasMany(CuentaCorriente);
CuentaCorriente.belongsTo(Client)

User.hasMany(Reporte);
Reporte.belongsTo(User)



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
