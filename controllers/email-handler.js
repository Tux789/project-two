var nodemailer = require("nodemailer");
var db = require("../models");
var dotenv = require("dotenv").config();
var moment = require("moment");

var email = {
    sendCustomerInvoice: function (returnObject) {
        dbInvoice = returnObject.invoice;
        var spaceStr = "                               ";
        db.LineItem.findAll({
            include: [db.Product]
        }).then((lineItems) => {
            var returnHtml =
                `Invoice: ${dbInvoice.id}<br>
        To: ${dbInvoice.buyer_name}<br>
        Date: ${moment(dbInvoice.createdAt).format("LLL")}<br>
        <br>`;

            lineItems.forEach((lineItem) => {
                if (lineItem.InvoiceId === dbInvoice.id)
                    returnHtml += lineItem.Product.name + spaceStr + "$" + lineItem.totalPrice + "<br>";
            });
            returnHtml +=
                `Total Price: ${dbInvoice.total_price}<br>`
            console.log(returnHtml);
            if(dbInvoice.buyer_email !== null){
            email.sendEmail(dbInvoice.buyer_email, "Invoice", returnHtml);
            }
        });
    },
    sendEmail: function (to, subject, returnHtml) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER, // generated ethereal user
                    pass: process.env.SMTP_PASSWORD // generated ethereal password
                }
            });

            let mailOptions = {
                from: '"Dime" <dime@dime.com>', // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                //text: generateEmailInvoice(), // plain text body
                html: returnHtml // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        })
    },


}
module.exports = email;