
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("CuentaCorriente", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        importe: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        saldo: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tipoTransaccion: {
            type: DataTypes.STRING,
            allowNull: false,
        }

      
    },
    { timestamps: true }
);
};
