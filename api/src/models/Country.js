const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: 3
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    flagimg: {
      type: DataTypes.STRING,
      isUrl: true,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    population: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currencies: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    languages: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    borders: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    maps: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};

