var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var latestItemId;
var timeout;
var itemsForSale = [];
var itemAmounts = [];
var prices = [];

var connection1;

var timeout = setTimeout(function() {
	connect();
}, 500);

console.log("\nWelcome to BAMAZON! We're like Amazon...but Better!\n".bold);

function connect() {
	connection1 = mysql.createConnection({
	  host: "localhost",
	  port: 3306,

	  // Your username
	  user: "root",

	  // Your password
	  password: "",
	  database: "bamazon"
	});
	connection1.connect(function(err) {
	  if (err) throw err;
	  displayProducts();
	});
}

function displayProducts() {
	itemsForSale = [];
	itemAmounts = [];
	prices = [];
	console.log("\nHere's the products we currently have for sale: ". bold);
	clearTimeout(timeout1);
	var timeout1 = setTimeout(function() {
		connection1.query("SELECT * FROM products", function(err, response) {
		if (err) throw err;
		for(var i = 0; i < response.length; i++) {
			console.log("\n=====================================================");
			console.log("Item ID: ".bold + response[i].item_id);
			console.log("Product Name: ".bold + response[i].product_name);
			console.log("Price: ".bold + "$" + response[i].price);
			console.log("=====================================================\n");
			latestItemId = response[response.length - 1].item_id;
			itemsForSale.push(response[i].product_name);
			itemAmounts.push(response[i].stock_quantity);
			prices.push(response[i].price);
		}
		connection1.end();
		timeout = setTimeout(function() {
			purchaseProduct();
		}, 500);
	});
	}, 500);
}

function purchaseProduct() {
	var itemSelection;

	inquirer.prompt([
	{
		type: "list",
		message: "Would you like to buy anything today?",
		choices: ["Yes", "No"],
		name: "confirmPurchase"
	}
	]).then(function(purchaseResponse) {
		if(purchaseResponse.confirmPurchase === "No") {
			console.log("\nOk, please come back again!".bold + "\n");
		}
		else{
			chooseItem();
			function chooseItem() {
				inquirer.prompt([
				{
					type: "input",
					message: "\nPlease enter the Item ID number of the item you wish to buy.",
					name: "itemId"
				}
				]).then(function(itemIdResponse) {
					itemSelection = itemIdResponse.itemId;

					if(isNaN(itemSelection)) {
						console.log("\nPlease enter a number value!".bold.red);
						chooseItem();
					}
					else if(itemSelection > latestItemId || itemSelection < 1) {
						console.log("\nThat item ID does not exist. Please enter a valid Item ID".bold.red);
						chooseItem();
					}
					else if(itemAmounts[itemSelection - 1] === 0) {
						console.log("\nSorry, that item is out of stock!".bold.red);
						chooseItem();
					}
					else {
						chooseQuantity();

						function chooseQuantity() {
							inquirer.prompt([
							{
								type: "input",
								message: "\nHow many " + itemsForSale[itemSelection - 1] + "s do you want to buy?\n",
								validate: function(input) {
									if(isNaN(input)) {
										return false;
									}
									else {
										return true;
									}
								},
								name: "purchaseAmount"
							}
							]).then(function(quantityResponse) {
								var quantity = quantityResponse.purchaseAmount;
								if(quantity > itemAmounts[itemSelection - 1] && itemAmounts[itemSelection - 1] !== 0) {
									console.log("\nWe only have " + itemAmounts[itemSelection - 1] + " of those in stock!");
									chooseQuantity();
								}
								else {
									var connection2 = mysql.createConnection({
									  host: "localhost",
									  port: 3306,

									  // Your username
									  user: "root",

									  // Your password
									  password: "",
									  database: "bamazon"
									});
									connection2.connect(function(err) {
										if (err) throw err;
									});
									connection2.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [itemAmounts[itemSelection - 1] - quantity, itemSelection],
										function(err, results) {
											if (err) throw err;
											var cost = prices[itemSelection - 1] * quantity;
											console.log("Thank you for your purchase! Your total amount due is $" + cost.toFixed(2));

											inquirer.prompt([
											{
												type: "list",
												message: "\nWould you like to browse again?\n",
												choices: ["Yes", "No"],
												name: "browseAgain"
											}
											]).then(function(browseAgainResponse) {
												if(browseAgainResponse.browseAgain === "No") {
													console.log("\nThank you for using our service. Please come again soon!\n".bold);
													connection2.end();
												}
												else {
													connection2.end();
													clearTimeout(timeout);
													var timeout = setTimeout(function() {
														connect();
													}, 1000);
												}
											})

										}
									);
								}

							})					
						}
					}
				});
			}
		}
	});
}