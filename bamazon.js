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
        if (error) throw error;
        else console.table(results);
        placeOrder();
    })
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
    ])
        .then(function (answer) {
            var product = answer.product;
            var quantity = answer.quantity;
            // queries DB from user input
            var query = "SELECT * FROM products WHERE ?"
            connection.query(query, { item_id: product }, function (error, res) {
                var productInfo = res[0];
                if (error) throw error;

                // validation of quantity
                if (quantity < productInfo.stock_quantity) {
                    console.log("Thank you for your purchase!")
                } else {
                    console.log("There isn't enough stock left!");
                    viewProducts();
                }
            });
        })

}

