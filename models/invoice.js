module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define("Invoice", {
    // Giving the Author model a name of type STRING
    buyer_name: DataTypes.STRING,
    buyer_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buyer_city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Dallas",
    },
    buyer_state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "TX",
    },
    buyer_zip: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "75205",
    },
    buyer_email:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    order_cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    
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
