module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("product", {
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

  });

  // Product.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Transaction.belongsTo(models.Invoice, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Product;
};