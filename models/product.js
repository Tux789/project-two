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
      allowNull: true,
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
  Product.bulkCreate([
    {name: "Columbian", unit_price: 7.00, stock_quantity: 100},
    {name: "Sumatra", unit_price: 9.00, stock_quantity: 100},
    {name: "Costa Rica", unit_price: 8.00, stock_quantity: 100},
    {name: "Guatamala", unit_price: 8.00, stock_quantity: 100},
    {name: "Papa New Guinea", unit_price: 10.00, stock_quantity: 100},
    {name: "Kona Blend", unit_price: 10.00, stock_quantity: 100},
    {name: "Jamacian", unit_price: 8.00, stock_quantity: 100},
    {name: "South African", unit_price: 7.00, stock_quantity: 100},
    {name: "Brazilian", unit_price: 9.00, stock_quantity: 100},
    {name: "French Roast", unit_price: 6.00, stock_quantity: 100},
    {name: "Toasted Pecan", unit_price: 6.00, stock_quantity: 100}                
  ]);

  return Product;
};