const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt"); // Asegúrate de importar bcrypt

module.exports = (sequelize) => {
  // Defino el modelo
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phonenumber: {
        type: DataTypes.BIGINT,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("employee", "admin"),
        defaultValue: "employee",
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          const saltRounds = 10; // Número de rondas de sal
          user.password = await bcrypt.hash(user.password, saltRounds); // Encripta la contraseña
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) { // Encriptar solo si la contraseña ha cambiado
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
        },
      },
    }
  );

  return User;
};
