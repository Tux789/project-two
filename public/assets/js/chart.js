

var ctx = document.getElementById("barChart");
var ptx = document.getElementById('pieChart');
getBarChart().then((barChart) => {
var myChart = new Chart(ctx, barChart)
}).catch((err) => {
    alert(err);
})

getPieChart().then((pieChart) => {
var pieChart = new Chart(ptx, pieChart)
}).catch((err) =>{
    alert(err);
})
