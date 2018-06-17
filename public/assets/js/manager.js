getProducts().then((products)=>{
    $("#prevProd").on("click",() => {scrollProduct(-1)});
    $("#prevProd").on("click",() => {scrollProduct(1)});   
});
$("#submitCreate").on( "click", () => {createNewProduct()});

function scrollProduct(direction){
//     var currentId = parseInt($("#UpdateProduct").attr("data-product-id")
// switch(direction){
//     case -1: 

//     if(currentId === 1){
//         $("#prevProd").addClass("disabled");
//     }else{
//         $("#prevProd").removeClass("disabled");
//     }
//     currentId--;
//     $("#UpdateProduct").attr("data-product-id",currentId);
//     displayProduct(currentId);
//     break;
//     default:
//     break;
// }
}

function createNewProduct(){
var newProduct = {
    name: $("#productCreateName").val().trim(),
    unit_price: parseFloat($("#productCreatePrice").val().trim()),
    stock_quantity: parseInt($("#productCreateStock").val().trim())
};
console.log(newProduct);
console.log(createProduct(newProduct));
}