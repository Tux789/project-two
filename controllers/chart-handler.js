var db = require("../models");
const bGAlpha = 0.2;
const bCAlpha = 1;

module.exports.getPieChart = function (req, res) {
    var returnChart = getGenericChart("pie");
    db.Product.findAll().then((data) => {
        data.forEach((product) => {
            returnChart.data.labels.push(product.name);
            returnChart.data.datasets[0].data.push(product.total_product_sales);
            returnChart.data.datasets[0].label = "Product Sales";
            getRandomColor(returnChart);
            
        });
        res.status("200").json(returnChart);
    }).catch((err) => {
        res.status("500").send();
    });
};

module.exports.getScatterChart = function (req, res) {
    res.status("200").json([1, 2, 3, 4]);

}
module.exports.getBarChart = function (req, res) {
    var returnChart = getGenericChart("bar");
    db.Product.findAll().then((data) => {
        data.forEach((product) => {
            returnChart.data.labels.push(product.name);
            returnChart.data.datasets[0].data.push(product.stock_quantity);
            returnChart.data.datasets[0].label = "Lbs of product in Inventory";
            getRandomColor(returnChart);
            
        })
        res.status("200").json(returnChart);
    }).catch((err) => {
        res.status("500").send();
    });
};
function getGenericChart(chartType) {
    return {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [

                ],
                borderColor: [

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
};

function getRandomColor(returnObject) {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    returnObject.data.datasets[0].backgroundColor.push(`rgba(${red},${green},${blue},${bGAlpha})`);
    returnObject.data.datasets[0].borderColor.push(`rgba(${red},${green},${blue},${bCAlpha})`);
}

