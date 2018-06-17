   
var getCoffeePrice = function() {
    var totalPrice = parseInt($("#selectCoffee option").filter(":selected").attr("data-unit-price")) * parseInt($("#selectQuantity").val());
// console.log( $( this ).text() );
$("#total").text(totalPrice);
console.log(totalPrice);
};

getProducts().then((products)=>{
$("#addLineItem").on("click",() => {renderNewLineItem(products)});
$("#button").on( "click", () => {postInvoice()});
renderNewLineItem(products);

});




function renderNewLineItem(products){
    var newDiv = $("<div>").addClass("line-item");
    var newPSelectLabelDiv = $("<div>").addClass("input-group-prepend");
    var newPSelectLabel = $("<label>").addClass("input-group-text").text("Item");
    var newPSelectTag = $("<select>").addClass("custom-select productSelect");
        for(var i = 0; i<products.length; i++){
            var newPOption = $("<option>").val(products[i].id).attr("data-unit-price",products[i].unit_price)
                .text(products[i].name);
            newPSelectTag.append(newPOption);
        };
        var newQSelectLabelDiv = $("<div>").addClass("input-group-prepend");
        var newQSelectLabel = $("<label>").addClass("input-group-text").text("Quantity");
        var newQInput = $("<select>").addClass("custom-select quantitySelect");
        for(var i= 1; i<11;i++){
            var newQOption = $("<option>").val(i).text(i+"lbs.");
            newQInput.append(newQOption);
        }
        newDiv.append(newPSelectLabelDiv).append(newPSelectLabel);
        newDiv.append(newPSelectTag);
        newDiv.append(newQSelectLabelDiv).append(newQSelectLabel);
        newDiv.append(newQInput);
    $("#coffeeForm").append(newDiv);
    
}

function postInvoice(){
    var lineItems = [];
    $(".line-item").each(function(){
        lineItems.push({
        ProductId: parseInt($(this).children(".productSelect").val()),
        quantity: parseInt($(this).children(".quantitySelect").val()),
        });
    });
    console.log();
    var invoice = {
        buyer_name: $("#inputName").val().trim(),
        buyer_address: $("#inputAddress").val().trim(),
        buyer_city: $("#inputCity").val().trim(),
        buyer_state: $("#inputState").val(),
        buyer_zip: $("#inputZip").val().trim(),
        buyer_email: $("#inputEmail").val().trim(),
        lineItems: lineItems,
    };
    //validate(invoice);
    console.log(invoice);
    console.log(createInvoice(invoice));
}

/* <div id="coffeeform" class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Item</label>
                </div>
                <select class="custom-select" id="selectCoffee">
                    <option value="1" data-unit-price="7">Columbian</option> <!--7.00/pound-->
                    <option value="2" data-unit-price="9">Sumatra</option> <!--9.00/pound-->
                    <option value="3" data-unit-price="8">Costa Rica</option> <!--8.00/pound-->
                    <option value="4" data-unit-price="8">Guatamala</option> <!--8.00/pound-->
                    <option value="5" data-unit-price="10">Papa New Guinea</option> <!--10.00/pound-->
                    <option value="5" data-unit-price="10">Kona Blend</option> <!--10.00/pound-->
                    <option value="6" data-unit-price="8">Jamacian</option> <!--8.00/pound-->
                    <option value="7" data-unit-price="7">South African</option> <!--7.00/pound-->
                    <option value="8" data-unit-price="9">Brazilian</option> <!--9.00/pound-->
                    <option value="9" data-unit-price="6">French Roast</option> <!--6.00/pound-->
                    <option value="10" data-unit-price="6">Toasted Pecan</option> <!--6.00/pound-->
                  </select>
          </div>
              <br>
              <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Quantity</label>
                    </div>
                    <select class="custom-select" id="amount">
                      <option value="1">1 lb</option>
                      <option value="2">2 lb</option>
                      <option value="3">3 lb</option>
 
                    </select>
              </div>

              <!--add per pound-->
         <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
             <!--     <span id="total" class="input-group-text">0.00</span> -->
                </div>
                <input id="total" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
              </div> */
