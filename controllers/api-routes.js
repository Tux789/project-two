var db = require("../models");
var email = require("./email-handler");
var invoice = require("./invoice-handler");
var charts = require("./chart-handler");


module.exports = function (app, passport) {
    // get all products
    app.get("/api/products", function (req, res) {
        db.Product.findAll().then(function (results) {
            res.status("200").json(results);
        }).catch((err) => {
            console.log(err);
            res.status("500").send();
        });
    });
    app.get("/api/products/:id", function(req,res){
        db.Product.findOne({where: {id: req.params.id}})
        .then((dbProduct) => {
            res.status("200").json(dbProduct);
        }).catch((err) => {
            console.log(err);
            res.status("500").send();
        });
    });
    // post new product
    app.post("/api/products", function (req, res) {
        db.Product.create(req.body, { fields: ["name", "unit_price", "stock_quantity"] }).then(function (results) {
            res.status("200").json(results);
        }).catch((err) => {
            console.log(err);
            res.status("500").send();
        });
    });
    // update existing product (including stock)
    app.put("/api/products", function (req, res) {
        db.Product.update(req.body, {
            where: {
                id: req.body.id,
            }
        }, {
                fields: ["name", "unit_price", "stock_quantity"]
            }).then(function (results) {
                res.status("200").json(results);
            }).catch((err) => {
                console.log(err);
                res.status("500").send();
            });
    });
    // post for new Invoice
    app.post("/api/invoice", function (req, res) {
        invoice.createNewInvoice(req, res);
    });
    app.get("/api/invoice", function (req, res) {
        db.Invoice.findAll({ include: [db.LineItem] }).then(function (dbInvoice) {
            res.status("400").json(dbInvoice);
        }).catch(function (err) {
            console.log(err);
            res.status("500").send();
        });
    });
    app.get("/api/invoice/:id", function(req,res) {
        db.Invoice.findOne({
            where: {id: req.params.id}, include: [db.LineItem] })
            .then((dbInvoice) => {
            res.status("200").json(dbInvoice);
        }).catch((err) => {
            console.log(err);
            res.status("500").send();
        });
    });
    app.put("/api/invoice", function (req, res) {
        db.Invoice.update(req.body, {
            where: { id: req.body.id }
        }, {
                fields: ["buyer_name", "buyer_address", "buyer_city", "buyer_state",
                    "buyer_zip", "buyer_email", "order_cancelled"]
            }).then((results) => {
                res.status("200").json(results);
            }).catch((err) => {
                console.log(err);
                res.status("500").send();
            })
    })
    app.get("/api/charts/pie", function (req, res) {
        charts.getPieChart(req,res);
        // var returnObject = {
        //     type: "scatter",
        //     data: {
        //         datasets: [],
        //     },
        //     options: {

        //         scales: {
        //             xAxes: [{
        //                 type: "time",
        //                 ticks: {
        //                     beginAtZero: false
        //                 }
        //             }],
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }]
        //         },
        //     }
        // };
        // db.Product.count().then(function (productCount) {
        //     db.Product.findAll({ attributes: ["id", "name"] }).then((dbProduct) => {
        //         db.LineItem.findAll({ attributes: ["ProductId", "totalPrice", "createdAt"] }).then((lineItems) => {

        //             dbProduct.forEach((productLine) => {
        //                 var newDataSetBlob = {
        //                     label: productLine.name,
        //                     data: [],
        //                     showLine: true,
        //                     fill: false,
        //                     borderColor: 'rgba(0, 200, 0, 1)',
        //                 }
        //                 lineItems.forEach((lineItem) => {
        //                     if (lineItem.ProductId === productLine.id) {
        //                         var newPoint = {
        //                             x: new Date(lineItem.createdAt),
        //                             y: lineItem.totalPrice
        //                         };
        //                         newDataSetBlob.data.push(newPoint);
        //                     }
        //                 });
        //                 returnObject.data.datasets.push(newDataSetBlob);
        //             });
        //             res.status("200").json(returnObject);
        //         });
        //     });
        // });
    });

    app.get("/api/charts/scatter", function(req,res){
        charts.getScatterChart(req,res);
    })
} 
