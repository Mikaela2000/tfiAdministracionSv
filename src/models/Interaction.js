// models/Interaction.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Interaction", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
        },
    
    },
    { timestamps: true }
);
};
