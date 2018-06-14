var db = require("../models");


module.exports = function(app){

// get all products
app.get("/api/products",function(req,res){
    db.Product.findAll().then(function(results){
        res.status("400").json(results);
    });
});
// post new product
app.post("/api/products",function(req,res){
    db.Product.create(req.body).then(function(results){
        res.status("400").json(results);
    });
});
// update existing product (including stock)
app.put("/api/products", function(req,res){
    db.Product.update(req.body,
        { 
        where:{
            id: req.body.id,
        },
    }).then(function(results){
        res.status("400").json(results);
    })
});
// post for new Invoice
app.post("/api/invoice",function(req,res){
    var lineItemPromises = [];
    var totalInvoicePrice = 0;
    db.Invoice.create({
        buyer_name: req.body.buyer_name,
        buyer_address: req.body.buyer_address,
       // total_price: req.body.total_price,
    }).then(function(dbInvoice){        
        var lineItems = req.body.lineItems;             
             lineItems.forEach(function(lineItem){
            db.Product.findOne({
                where: {
                    id: lineItem.ProductId,
                }
            }).then(function(dbProduct){
             lineItemPromises.push(db.LineItem.create({
                    InvoiceId: dbInvoice.id,
                    ProductId: lineItem.ProductId,
                    quantity: lineItem.quantity,
                    totalPrice: dbProduct.unit_price * lineItem.quantity, 
                }
                ));
                //end create line Item Promise
                totalInvoicePrice = totalInvoicePrice + (dbProduct.unit_price * lineItem.quantity);
            });
                //end Product lookup
            });
                //end forEach lineItem
                
                Promise.all(lineItemPromises).then(function(dbLineItem){
                    //console.log(dbLineItem);
                    db.Invoice.update({
                        total_price: totalInvoicePrice,
                    },{
                        where:{id:dbInvoice.id}
                        }).then(function(results){
                    res.status("400").json(dbLineItem);
                    });
                }).catch(function(err){
                    console.log(err);
                    res.status("500").send();
                });
    });
});
app.get("/api/invoice",function(req,res){
    db.Invoice.findAll({include: [db.LineItem]}).then(function(dbInvoice){
        res.status("400").json(dbInvoice);
    }).catch(function(err){
        console.log(err);
        res.status("500").send();
    });
});
} 
