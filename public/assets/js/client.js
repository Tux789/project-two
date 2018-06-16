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

    var totalPrice = parseInt($("#selectCoffee").attr("data-unit-price")) * parseInt($("#selectQuantity").val());
    $( "#button" ).on( "click", function() {
       // console.log( $( this ).text() );
      });

    $("#total").text(totalPrice);
    console.log(totalPrice);

};




                //  var totalPrice=0;
                //  //Get a reference to the form id="coffeeform"
                //  var theForm = document.forms("#coffeeform");
                //  //Get a reference to the select id="coffee
                //   var selectedCoffee = theForm.elements("#coffee");
              
                //  //set totalPrice equal to value user chose
                //  totalPrice = coffee_prices(selectedCoffee.value);
             
                //  $("#total").text(totalPrice);
              
                //  //finally we return coffeePrice
                //  return totalPrice;
                //  console.log(totalPrice);

// get, put, and post for backend

//for order, manager, and invoice

// quantity and item are dynamic

// quantity per pound



// submit to a post to the backend 

//routes 
 //for invoices: "/api/invoice"
 //for products: "/api/products"
 //for charts: "/api/charts"