var db = require("../models");

module.exports = {

    seedProducts: function () {
        db.Product.findOrCreate({ where: { name: "Columbian" }, defaults: { unit_price: 7.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Sumatra" }, defaults: { unit_price: 9.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Costa Rica" }, defaults: { unit_price: 8.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Guatamala" }, defaults: { unit_price: 8.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Papa New Guinea" }, defaults: { unit_price: 10.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Kona Blend" }, defaults: { unit_price: 10.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Jamacian" }, defaults: { unit_price: 8.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "South African" }, defaults: { unit_price: 7.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Brazilian" }, defaults: { unit_price: 9.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "French Roast" }, defaults: { unit_price: 6.00, stock_quantity: 100 } });
        db.Product.findOrCreate({ where: { name: "Toasted Pecan" }, defaults: { unit_price: 6.00, stock_quantity: 100 } });
    }
};