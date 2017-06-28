"use strict";
const sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var sqltodo = sequelize.define(
    "sqltodo",
    {
      name: {
        type: DataTypes.STRING
      },
      value: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return sqltodo;
};
