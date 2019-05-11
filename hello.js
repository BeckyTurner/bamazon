// Queries database for selected product.
		var query = "Select stock_quantity, price, product_sales, department_name FROM products WHERE ?";
		connection.query(query, { item_id: answer.productID}, function(err, res) {
			
			if (err) throw err;

			var available_stock = res[0].stock_quantity;
			var price_per_unit = res[0].price;
			var productSales = res[0].product_sales;
			var productDepartment = res[0].department_name;

			// Checks there's enough inventory  to process user's request.
			if (available_stock >= answer.productUnits) {

				// Processes user's request passing in data to complete purchase.
				completePurchase(available_stock, price_per_unit, productSales, productDepartment, answer.productID, answer.productUnits);
			} else {

				// Tells user there isn't enough stock left.
				console.log("There isn't enough stock left!");

				// Lets user request a new product.
				requestProduct();
			}
		});
	});
};
