module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define("Invoice", {
    // Giving the Author model a name of type STRING
    buyer_name: DataTypes.STRING,
    buyer_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: DataTypes.DECIMAL,
    
  });

  Invoice.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Invoice.hasMany(models.LineItem, {
      onDelete: "cascade"
    });
  };


  return Invoice;
};
