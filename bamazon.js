var mysql = require('mysql');
var inquirer = require('inquirer');
var clear = require('clear');
var tab = require('table-master');

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "PASSWORD",
    database: "bamazonDB"
})

//connect to DB
connection.connect(function (error) {
    if (error) throw error;
    console.log("\nWelcome to Bamazon! Review our products list below and make your selection!\n");
    viewProducts();
});

// load items from DB
function viewProducts() {
    connection.query("SELECT * from products;", function (error, results) {
        if (!error) console.table(results);
        placeOrder();
    })
};

function purchase() {
    connection.query("UPDATE products SET ? WHERE ?;", function(error, results) {
        if (!error) {
            console.log("Thank you for your purchase! The inventory has been updated!");
        }
    });
};

function placeOrder() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What is the item_id of the product you would like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function (answer) {
        var product = answer.product;
        var quantity = answer.quantity;
        // queries DB from user input
        var query = "SELECT * FROM products WHERE ?"
        connection.query(query, { item_id: product }, function (error, res) {
            var productInfo = res[0];
            if (error) throw error;

            // validation of quantity
            if (quantity <= productInfo.stock_quantity) {
                   var query = "UPDATE products SET ? WHERE ?";
                   connection.query(query, {stock_quantity: product}, function (error, res) {
                       if (!error) {
                        purchase();
                       }
                   })

                inquirer.prompt({
                    name: 'anotherPurchase',
                    type: "input",
                    message: "Would you like to make another purchase? (y/n)",
                }).then(function (answer) {
                    if (answer.anotherPurchase === "y") {
                        viewProducts();
                    } else {
                        console.log("Thank you! Come again!")
                        connection.end();
                    }
                })
            } else if (quantity > productInfo.stock_quantity) {
                console.log("There isn't enough stock left! Please choose a smaller quantity");
                viewProducts();
            }
        });
    })
}

