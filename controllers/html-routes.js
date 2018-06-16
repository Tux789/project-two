var path = require("path")

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/invoice", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/invoice.html"));
    });

    app.get("/manager", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/manager.html"));
    });

    app.get("/charts", function (req, res) {
        //res.sendFile(path.join(__dirname, "../public/charts.html"));
        res.sendFile(path.join(__dirname, "../public/chartTest.html"));
    });


    app.get("/order", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/order.html"));
    });
};