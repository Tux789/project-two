module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_product_sales: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      allowNull: false,
    },

  });

  Product.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Product.hasOne(models.LineItem);
  };

  // Product.associate = function(models) {
  //   //   // Associating Author with Posts
  //   //   // When an Author is deleted, also delete any associated Posts
  //     Product.hasMany(models.Transaction, {
  //     });
  //   };

  return Product;
};