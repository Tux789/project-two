module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("transaction", {
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.TIMESTAMP,
      defaultValue: CURRENT_TIMESTAMP,
      allowNull: false,
    },
  });

  Transaction.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Transaction.belongsTo(models.Invoice, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};
