
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Compra", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        nameSoft: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        version: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        metodoPago: {
            type: DataTypes.STRING,
        }
       
    
    },
    { timestamps: true }
);
};
