var coffeePrice = {
    columbian:
{
    name: "Columbian",
    value: 7
},
    Sumatra:
{
    name: "Sumatra",
    value: 9
},

    costaRica:
{
    name:"Costa Rica",
    value: 8,
},
    guatamala:
{
    name: "Guatamala",
    value: 8,
},

    konaBlend:
{
    name: "Kona Blend",
    value: 10,
},

    Jamacian:
{
    name: "Jamacian",
    value: 8,
},

    southAfrican:
{
    name: "South African",
    value: 7,
},
    Brazilian:
{
    name: "Brazilian",
    value: 9,
},
    frenchRoast:
{
    name: "French Roast",
    value: 6,
},

    toastedPecan:
{
    name: "Toasted Pecan",
    value: 6,
},

};


var getCoffeePrice = function() {

    var totalPrice = parseInt($("#selectCoffee option").filter(":selected").attr("data-unit-price")) * parseInt($("#amount").val());

    $("#total").text("$"+totalPrice);
    console.log(totalPrice);
 
    console.log(parseInt($("#amount").val()));
    console.log
};

// $( "#button" ).on( "click", function() {
//     getCoffeePrice();
//   });


// order


// Manager


//GET
$.get( "/api/products", )
  .done(function( data ) {
  
  });


// PUT
  $("#updateproduct").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var id = $("[id=item]").val().trim();

    var updatedProduct = {
      movie: $("#updatproduct [name=product]").val().trim()
    };

    // Send the PUT request.
    $.ajax("/api/products" + id, {
      type: "PUT",
      data: updatedProducts
    }).then(
      function() {
        console.log("updated id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


// invoice


// get, put, and post for backend

//for order, manager, and invoice

// quantity and item are dynamic

// quantity per pound



// submit to a post to the backend 

//routes 
 //for invoices: "/api/invoice"
 //for products: "/api/products"
 //for charts: "/api/charts"