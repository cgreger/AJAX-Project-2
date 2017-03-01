
var orderForm;
var receipt;
var menu;

function init() {
	
	//Create needed objects
	orderForm = new OrderForm();
	receipt = new Receipt();
	menu = new Menu();
	
	//Set the prices in the form
	orderForm.setFormPrices();
	
	//Set the initial receipt total
	receipt.addReceiptTotal();
	
	//Add burrito event listener
	orderForm.btnAddBurrito.onclick = function() {

		receipt.addBurrito();

	}

}

// Menu object holds menu prices
function Menu() {

	this.chickenPrice = 6.20;
	this.steakPrice = 6.75;
	this.carnitasPrice = 6.60;
	this.barbacoaPrice = 6.60;
	this.vegitarianPrice = 6.20;
	this.guacPrice = 1.40;

}

// OrderForm gathers form data
function OrderForm() {

	this.btnAddBurrito = document.getElementById("btnAddBurrito");
	
	// set the form prices using the menu prices
	this.setFormPrices = function() {

		document.getElementById("chicken").appendChild(document.createTextNode(menu.chickenPrice.toFixed(2)));
		document.getElementById("steak").appendChild(document.createTextNode(menu.steakPrice.toFixed(2)));
		document.getElementById("carnitas").appendChild(document.createTextNode(menu.carnitasPrice.toFixed(2)));
		document.getElementById("barbacoa").appendChild(document.createTextNode(menu.barbacoaPrice.toFixed(2)));
		document.getElementById("vegitarian").appendChild(document.createTextNode(menu.vegitarianPrice.toFixed(2)));
		document.getElementById("guacLabel").appendChild(document.createTextNode(menu.guacPrice.toFixed(2) + " "));


	}
	
	// Creates an array of the chosen salsas
	this.getSalsaChoices = function() {

		var salsaChoices = document.getElementsByName("salsa");
		var selected = [];

		for (var i = 0; i < salsaChoices.length; i++) {

			if (salsaChoices[i].checked) {

				selected.push(salsaChoices[i]);

			}

		}

		return selected;

	}
	
	// Gets the type of bean
	this.getBeanType = function() {

		if (document.getElementById("pintoBeans").checked) {

			return "pinto";

		} else {

			return "black";

		}

	}

	// Gets the rice type
	this.getRiceType = function() {

		if (document.getElementById("whiteRice").checked) {

			return "white";

		} else {

			return "brown";

		}

	}

}

// Keeps track of a specific burrito
function Burrito() {
	
	this.id;
	this.type;
	this.rice;
	this.beans;
	this.salsas = [];
	this.guac;
	this.basicCost = 0;
	this.totalCost = 0;
	this.burritoDiv = document.createElement("div");
	this.burritoDiv.setAttribute("id", "burrito");
	
	// Calculate the cost of this burrito
	this.calculateTotalCost = function() {

		if (this.type === "chicken") {

			this.totalCost += menu.chickenPrice;
			this.basicCost = menu.chickenPrice

		} else if (this.type === "steak") {

			this.totalCost += menu.steakPrice;
			this.basicCost = menu.steakPrice;

		} else if (this.type === "carnitas") {

			this.totalCost += menu.carnitasPrice;
			this.basicCost = menu.carnitasPrice;

		} else if (this.type === "barbacoa") {

			this.totalCost += menu.barbacoaPrice;
			this.basicCost = menu.barbacoaPrice;

		} else if (this.type === "vegitarian") {

			this.totalCost += menu.vegitarianPrice;
			this.basicCost = menu.vegitarianPrice;

		}

		if (this.guac) {

			this.totalCost += menu.guacPrice;

		}

	}
	
	// format the burrito's title
	this.formatBurritoTitle = function() {
		
		//Initial label as the burrito type
		var typeFormat = document.createElement("b");
		var typeText = document.createTextNode(this.type.toUpperCase() + " BURRITO + $");
		var basicCostText = document.createTextNode(this.basicCost.toFixed(2));
		typeFormat.appendChild(typeText);
		this.burritoDiv.appendChild(typeFormat);
		this.burritoDiv.appendChild(basicCostText);
		this.burritoDiv.appendChild(document.createElement("br"));
		
	}
	
	// format the burrito's details
	this.formatBurritoDetails = function() {
		
		//Burrito details
		var riceText = document.createTextNode("---- " + this.rice + " rice");
		this.burritoDiv.appendChild(riceText);
		this.burritoDiv.appendChild(document.createElement("br"));

		var beansText = document.createTextNode("---- " + this.beans + " beans");
		this.burritoDiv.appendChild(beansText);
		this.burritoDiv.appendChild(document.createElement("br"));
		
		this.formatSalsa();
		this.formatGuac();
		this.formatTotal();
		
	}
	
	// format the burrito's salsa details
	this.formatSalsa = function() {
		
		var salsaText = document.createTextNode("---- no salsa");

		if (this.salsas.length > 0) {

			for (var i = 0; i < this.salsas.length; i++) {

				salsaText = document.createTextNode("---- " + this.salsas[i].value + " salsa ");
				this.burritoDiv.appendChild(salsaText);
				this.burritoDiv.appendChild(document.createElement("br"));

			}

		} else {

			this.burritoDiv.appendChild(salsaText);
			this.burritoDiv.appendChild(document.createElement("br"));

		}
		
	}
	
	// format the burrito's guac details
	this.formatGuac = function() {
		
		var guacString;
		if (this.guac) {

			guacString = "add guac + $" + menu.guacPrice.toFixed(2);

		} else { 

			guacString = "no guac";

		}

		var guacText = document.createTextNode("---- " + guacString);
		this.burritoDiv.appendChild(guacText);
		this.burritoDiv.appendChild(document.createElement("br"));
		
	}

	// format the burrito's total
	this.formatTotal = function() {
		
		var totalFormat = document.createElement("b");
		var totalText = document.createTextNode("TOTAL: $");
		var totalCostText = document.createTextNode(this.totalCost.toFixed(2));
		
		totalFormat.appendChild(totalText); //<b>TOTAL: $</b>
		this.burritoDiv.appendChild(totalFormat); //<div>...<b>TOTAL: $</b><div>
		this.burritoDiv.appendChild(totalCostText);//<div>...<b>TOTAL: $</b>7.99<div>
		
	}

}

// Keeps track of the current receipt
function Receipt() {

	this.burritos = [];
	this.receiptDiv = document.getElementById("receipt");
	this.totalDiv = document.getElementById("orderTotal");
	this.total = 0;
	
	// Add a burrito to the receipt
	this.addBurrito = function() {

		var burrito = new Burrito();
		
		// set burrito details
		burrito.id = Date.now() + (Math.random() * 1000); //Randomly generated id
		burrito.type = document.getElementById("burritoType").value;
		burrito.rice = orderForm.getRiceType();
		burrito.beans = orderForm.getBeanType();
		burrito.salsas = orderForm.getSalsaChoices();
		burrito.guac = document.getElementById("guac").checked;
		
		// add the burrito to the receipt
		this.burritos.push(burrito);
		
		// calculate the cost of the burrito and the new order total
		burrito.calculateTotalCost();
		this.total += burrito.totalCost;
		
		// update the orderTotal element
		this.updateReceiptTotal();
		
		// rebuild the receipt
		this.buildBurritoReceipt(burrito);

	}
	
	// remove a specific burrito from the receipt
	this.removeBurrito = function(burrito) {
		
		// get the burrito's id
		var burritoId = burrito.id;
		
		// search for the burrito and delete it
		for (var i = 0; i < this.burritos.length; i++) {
			
			if (this.burritos[i].id === burrito.id) {
				
				this.total -= this.burritos[i].totalCost; //subtract the burrito cost from the current order total
				this.burritos.splice(i, 1);
				break; // exit the loop as soon as the burrito to delete has been deleted
				
			}
			
		}
		
		// remove the burrito div
		var divToRemove = burrito.burritoDiv;
		divToRemove.parentNode.removeChild(divToRemove);
		
		// update the order total
		this.updateReceiptTotal();
		
		
		
	}
	
    // Create the elements necessary for the burrito to be displayed then add it to the reciept
	this.buildBurritoReceipt = function(burrito) {
		
		burrito.formatBurritoTitle();
		burrito.formatBurritoDetails();
		this.addRemoveButton(burrito);
		this.receiptDiv.appendChild(burrito.burritoDiv);
		
	}
	
	// Add the remove button to the burrito div
	this.addRemoveButton = function(burrito) {
		
		var btnRemoveBurrito = document.createElement("button");
		var btnText = document.createTextNode("Remove");
		
		btnRemoveBurrito.setAttribute("id", "removeBtn");
		
		btnRemoveBurrito.appendChild(btnText);
		burrito.burritoDiv.appendChild(btnRemoveBurrito);
		
		// remove burrito event listener
		btnRemoveBurrito.onclick = function() {
			
			receipt.removeBurrito(burrito);
			
		}
		
	}

	// Add the initial receipt total to the receipt
	this.addReceiptTotal = function() {
		
		var orderTotalDiv = document.getElementById("orderTotal");
		
		orderTotalDiv.appendChild(document.createTextNode(this.total.toFixed(2)));
		
		
	}
	
	// Update the currently displayed order total
	this.updateReceiptTotal = function() {
		
		var orderTotalDiv = document.getElementById("orderTotal");
		
		orderTotalDiv.lastChild.nodeValue = Math.abs(this.total).toFixed(2);
		
	}

}
