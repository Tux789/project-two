module.exports = function (sequelize, DataTypes) {
  var LineItem = sequelize.define("LineItem", {
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  });

  LineItem.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    LineItem.belongsTo(models.Invoice, {
      foreignKey: {
        allowNull: false,
      }
    });

    LineItem.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      }
    });
  };
  // Transaction.associate = function(models){

  // }

  return LineItem;
};
