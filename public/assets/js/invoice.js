$("#submitSearch").on("click", () => {
    id = parseInt($("#searchFor").val().trim());
    console.log(getInvoice(id).then((invoice) => {
        $("#card").removeClass("invisible").addClass("visible");
        $("#card").attr("data-id",id);
        console.log(invoice);
        displayInvoice(invoice);
        $("#submit").on("click",() => {updateCurrentInvoice(id)});
        $("#cancel").on("click", () => {cancelInvoice(id)});
    }).catch((err) => {
        alert("Data could not be passed to database, Please check all fields to make sure they are accurate");
    }));
});

getSearchedInvoice = function() {

}

displayInvoice = function (invoice) {
    // var lineItems = [];
    // $(".line-item").each(function(){
    //     lineItems.push({
    //     ProductId: parseInt($(this).children(".productSelect").val()),
    //     quantity: parseInt($(this).children(".quantitySelect").val()),
    //     });
    // });
    // console.log();
    if(invoice.order_cancelled){
        $("#card").addClass("order-cancelled");
        $("#cancel").addClass("disabled");
    }else{
        $("#card").removeClass("order-cancelled");
        $("#cancel").removeClass("disabled");
    }

    $("#inputName").val(invoice.buyer_name);
    $("#inputAddress").val(invoice.buyer_address);
    $("#inputCity").val(invoice.buyer_city);
    $("#inputState").val(invoice.buyer_state);
    $("#inputZip").val(invoice.buyer_zip);
    $("#inputEmail").val(invoice.buyer_email);
    invoice.LineItems.forEach((lineItem) => {displayNewLineItem(lineItem)})
}

function displayNewLineItem(lineItem){
    getProduct(lineItem.ProductId).then((product) =>{
    var newDiv = $("<div>").addClass("line-item row");
    var newPSelectLabelDiv = $("<div>").addClass("input-group-prepend");
    var newPSelectLabel = $("<label>").addClass("input-group-text").text("Item");
    var newPSelectTag = $("<select>").addClass("form-control disabled col-md-4 productSelect");
        
            var newPOption = $("<option>").val(lineItem.ProductId).attr("data-unit-price",product.unit_price)
                .text(product.name);
            newPSelectTag.append(newPOption);
        var newQSelectLabelDiv = $("<div>").addClass("input-group-prepend");
        var newQSelectLabel = $("<label>").addClass("input-group-text").text("Quantity");
        var newQInput = $("<select>").addClass("form-control col-md-4 quantitySelect disabled");
      
            var newQOption = $("<option>").val(lineItem.quantity).text(lineItem.quantity+" lbs.");
            newQInput.append(newQOption);
        
        newDiv.append(newPSelectLabelDiv).append(newPSelectLabel);
        newDiv.append(newPSelectTag);
        newDiv.append(newQSelectLabelDiv).append(newQSelectLabel);
        newDiv.append(newQInput);
    $("#coffeeForm").append(newDiv);
    });
    
}
cancelInvoice = function(id){
    var invoice = {
        id: parseInt($("#card").attr("data-id")),
        order_cancelled: true,
    }
    console.log(updateInvoice(invoice).then((invoice) => {
        displayInvoice(invoice);
    }).catch((err) => {
        alert("Data could not be passed to database, Please check all fields to make sure they are accurate");
    }));
    displayInvoice(invoice);
}

updateCurrentInvoice = function(id){
    var invoice = {
        id: parseInt($("#card").attr("data-id")),
        buyer_name: $("#inputName").val().trim(),
        buyer_address: $("#inputAddress").val().trim(),
        buyer_city: $("#inputCity").val().trim(),
        buyer_state: $("#inputState").val(),
        buyer_zip: $("#inputZip").val().trim(),
        buyer_email: $("#inputEmail").val().trim(),
    };
    console.log(invoice);
    console.log(updateInvoice(invoice).then((invoice) => {
        displayInvoice(invoice);
    }).catch((err) => {
        alert("Data could not be passed to database, Please check all fields to make sure they are accurate");
    }));
}