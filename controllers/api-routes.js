var db = require("../models");
var email = require("./email-handler");

module.exports = function(app){

// get all products
app.get("/api/products",function(req,res){
    db.Product.findAll().then(function(results){
        res.status("200").json(results);
    });
});
// post new product
app.post("/api/products",function(req,res){
    db.Product.create(req.body).then(function(results){
        res.status("200").json(results);
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
        res.status("200").json(results);
    })
});
// post for new Invoice
app.post("/api/invoice",function(req,res){
    
    var totalInvoicePrice = 0;
    db.Invoice.create({
        buyer_name: req.body.buyer_name,
        buyer_address: req.body.buyer_address,
        buyer_city: req.body.buyer_city,
        buyer_state: req.body.buyer_state,
        buyer_email: req.body.buyer_email,
       // total_price: req.body.total_price,
    }).then(function(dbInvoice){ 
        /*  an empty array will fire off the Promise.all without anything being run so I have to create a promise 
        with a timeout so that the push can happen before Promise.all is evaluated */  
        var initialPromiseThatIHaveToCreateBecausePromiseDotAllIsFreakingBonkers = 
        new Promise((resolve, reject) => {
            setTimeout(resolve, 1000, 'foo');
          });      
        var lineItems = req.body.lineItems;
        var lineItemPromises = [initialPromiseThatIHaveToCreateBecausePromiseDotAllIsFreakingBonkers];
        lineItems.forEach(function(lineItem){
            lineItemPromises.push(new Promise((resolve,reject) =>{
            db.Product.findOne({
                where: {
                    id: lineItem.ProductId,
                }
            }).then(function(dbProduct){
                if(dbProduct.stock_quantity >= lineItem.quantity){
                    totalInvoicePrice = totalInvoicePrice + (dbProduct.unit_price * lineItem.quantity);                    
                    var totalProductSales = parseInt(dbProduct.total_product_sales) + (dbProduct.unit_price * lineItem.quantity);
                    dbProduct.update({
                        stock_quantity: dbProduct.stock_quantity - lineItem.quantity,
                        total_product_sales: totalProductSales,
                        },
                        {
                        where: {
                            id: lineItem.ProductId,
                            }
                        }).then(function(){
                db.LineItem.create({
                    InvoiceId: dbInvoice.id,
                    ProductId: lineItem.ProductId,
                    quantity: lineItem.quantity,
                    totalPrice: dbProduct.unit_price * lineItem.quantity, 
                });
                });                
                //end create line Item Promise               
                }else{ 
                    //Not enough quantity
                    //TODO: need to pass this back to interface somehow 
                   resolve("Insufficient Quantity"); 
                }
                // End sufficient quantity check
            });
                //end Product lookup
                resolve("Success");
            }));
                //end forEach lineItem           
        });
        
                
                Promise.all(lineItemPromises).then(function(dbLineItem){
                    //console.log(dbLineItem);
                    db.Invoice.update({
                        total_price: totalInvoicePrice,
                    },{
                        where:{id:dbInvoice.id}
                        }).then(function(results){
                    email(dbInvoice);
                    res.status("200").json(results);
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
app.put("/api/invoice",function(req,res){
    db.Invoice.update(req.body,{
        where: {id: req.params.id}
    }).then((results)=>{
        res.status("200").json(results);
    });
})
app.get("/api/charts",function(req,res){
    var returnObject = {
        type: "scatter",
        data: {
            datasets: [],
        },
        options: {
          
          scales: {
            xAxes: [{
                type: "time",
                ticks: {
                    beginAtZero: false
                }
            }],
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          },
        }
    };
    db.Product.count().then(function(productCount){
    db.Product.findAll({attributes: ["id","name"]}).then((dbProduct) => {
    db.LineItem.findAll({attributes: ["ProductId","totalPrice", "createdAt"]}).then((lineItems) => {
      
        dbProduct.forEach((productLine) => {
            var newDataSetBlob = {
                label: productLine.name,
                data: [],
                showLine: true,
                fill: false,
                borderColor: 'rgba(0, 200, 0, 1)',
            }
            lineItems.forEach((lineItem) => {               
                if(lineItem.ProductId === productLine.id){
                    var newPoint = {
                        x: new Date(lineItem.createdAt),
                        y: lineItem.totalPrice
                    };
                    newDataSetBlob.data.push(newPoint);
                }
            });
            returnObject.data.datasets.push(newDataSetBlob);
        });
        res.status("200").json(returnObject);
    });
});
    });
});
} 
