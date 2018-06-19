var db = require("../models");
var email = require("./email-handler");

var invoiceHandler = {
    createNewInvoice: function (req, res) {
        var returnObject = {
            invoice: {},
            promiseArray: [],
            // numUpdatedRows: 0,
            // itemsNotProccessed: [],
        }
        db.sequelize.transaction((t) => {
            return db.Invoice.create(req.body, {
                fields: ["buyer_name", "buyer_address", "buyer_city",
                    "buyer_state", "buyer_zip", "buyer_email", "order_cancelled"]
            }, { transaction: t }).then((dbInvoice) => {
                returnObject.invoice = dbInvoice;
                /*  an empty array will fire off the Promise.all without anything being run so I have to create a promise 
                with a timeout so that the push can happen before Promise.all is evaluated */
                var lineItems = req.body.lineItems;
                var lineItemPromises = [];
                lineItems.forEach(function (lineItem) {
                    lineItemPromises.push(
                        db.Product.findOne({
                            where: {
                                id: lineItem.ProductId,
                            }
                        }).then((dbProduct) => {
                            var sufficientQuantity = false;
                            if (dbProduct.stock_quantity >= lineItem.quantity) {
                                sufficientQuantity = true;
                            }
                            return Promise.all([                              
                                invoiceHandler.updateStockQuantity(dbInvoice, dbProduct, lineItem, sufficientQuantity, t),
                                invoiceHandler.createLineItemForInvoice(dbInvoice, dbProduct, lineItem, sufficientQuantity, t)]);
                            // End sufficient quantity check
                        }));
                    //end of created Promise
                });
                return Promise.all(lineItemPromises)
                    .then((promiseArray) => {
                        returnObject.promiseArray = promiseArray;
                        var totalInvoicePrice = 0;
                        //console.log(promiseArray);
                        promiseArray.forEach((promise) => {
                            //console.log(promise[1].dataValues);
                            if(promise[0] !== "Insufficient Quantity"){
                               // console.log(JSON.stringify(promise));
                           totalInvoicePrice += parseInt(promise[1].dataValues.totalPrice);
                            }
                        });
                        
                        //console.log(dbLineItem);
                        return dbInvoice.update({
                            total_price: totalInvoicePrice,
                        }, { transaction: t }).then((results) => {
                                //t.commit();
                                // returnObject.numUpdatedRows = results;
                                //res.status("200").json(results);

                            });
                    });
                //end forEach lineItem           
            })
        }).then((results) => {
            email.sendCustomerInvoice(returnObject);
            res.status("200").json(returnObject);
        }).catch((err) => {
            handleError(res, err);
        });
    },
    createLineItemForInvoice: function (dbInvoice, dbProduct, lineItem, sufficientQuantity, t) {
        if (sufficientQuantity) {
        return db.LineItem.create({
            InvoiceId: dbInvoice.id,
            ProductId: lineItem.ProductId,
            quantity: lineItem.quantity,
            totalPrice: dbProduct.unit_price * lineItem.quantity,
        }, { transaction: t })
        }else{
            return Promise.resolve({dataValues: {ProductId: lineItem.ProductId, quantity: lineItem.quantity, totalPrice:0 }})
        }
    },
    updateStockQuantity: function (dbInvoice, dbProduct, lineItem, sufficientQuantity, t) {
        if (sufficientQuantity) {
            //totalInvoicePrice = totalInvoicePrice + (dbProduct.unit_price * lineItem.quantity);
            var totalProductSales = parseInt(dbProduct.total_product_sales) + (dbProduct.unit_price * lineItem.quantity);
            return dbProduct.update({
                stock_quantity: dbProduct.stock_quantity - lineItem.quantity,
                total_product_sales: totalProductSales,
            },{transaction: t});
            //end create line Item Promise               
        } else {
            //returnObject.itemsNotProccessed.push(lineItem);
            //Not enough quantity
            //TODO: need to pass this back to interface somehow 
            return Promise.resolve("Insufficient Quantity");
        }
    }
};
module.exports = invoiceHandler;
handleError = function (res, err) {
    console.log(err);
    res.status("500").send();
};