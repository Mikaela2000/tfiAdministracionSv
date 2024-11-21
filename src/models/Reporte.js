const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Reporte", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        detalle: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
        { timestamps: true }
    );
};
