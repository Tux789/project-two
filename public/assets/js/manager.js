getProducts().then((products) => {
    $("#prevProd").on("click", () => { scrollProduct(-1) });
    $("#nextProd").on("click", () => { scrollProduct(1) });
    $("#submitUpdate").on("click", () => {updateExistingProduct()})
    displayProduct(1);
});
$("#submitCreate").on("click", () => { createNewProduct() });

function scrollProduct(direction) {
    console.log(getProducts().then((products) => {
        var currentId = parseInt($("#UpdateProduct").attr("data-product-id"));
        console.log(currentId);
        console.log($("#UpdateProduct").attr("data-product-id"));
        switch (direction) {
            case -1:
                $("nextProd").removeClass("disabled");
                if (currentId === 1) {
                    break;
                }
                if (currentId === 2) {
                    $("#prevProd").addClass("disabled");
                } else {
                    $("#prevProd").removeClass("disabled");
                }
                currentId--;
                $("#UpdateProduct").attr("data-product-id", currentId);
                displayProduct(currentId);
                break;
            case 1:
                $("#prevProd").removeClass("disabled");
                if (currentId === products.length - 1) {
                    $("#nextProd").addClass("disabled");
                } else {
                    $("#nextProd").removeClass("disabled");
                }
                currentId++
                $("#UpdateProduct").attr("data-product-id", currentId);
                displayProduct(currentId);
                break;
            default:
                break;
        }
    }));
}
function displayProduct(currentId) {
    getProduct(currentId).then((product) => {
        console.log(product);
        $("#productUpdateName").val(product.name);
        $("#productUpdatePrice").val(product.unit_price);
        $("#productUpdateStock").val(product.stock_quantity);

    })
}

function createNewProduct() {
    var newProduct = {
        name: $("#productCreateName").val().trim(),
        unit_price: parseFloat($("#productCreatePrice").val().trim()),
        stock_quantity: parseInt($("#productCreateStock").val().trim())
    };
    console.log(newProduct);
    console.log(createProduct(newProduct));
}
function updateExistingProduct(){
    var newProduct = {
        id: parseInt($("#UpdateProduct").attr("data-product-id")),
        name: $("#productUpdateName").val().trim(),
        unit_price: parseFloat($("#productUpdatePrice").val().trim()),
        stock_quantity: parseInt($("#productUpdateStock").val().trim()),
    };
    console.log(newProduct);
    console.log(updateProduct(newProduct));

}