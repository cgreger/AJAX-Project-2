
var orderForm;
var receipt;
var menu;

function init() {
	
	orderForm = new OrderForm();
	receipt = new Receipt();
	menu = new Menu();

	orderForm.setFormPrices();

	orderForm.btnAddBurrito.onclick = function() {

		receipt.addBurrito();

	}

}

function OrderForm() {

	this.btnAddBurrito = document.getElementById("btnAddBurrito");

	this.setFormPrices = function() {

		document.getElementById("chicken").appendChild(document.createTextNode(menu.chickenPrice.toFixed(2)));
		document.getElementById("steak").appendChild(document.createTextNode(menu.steakPrice.toFixed(2)));
		document.getElementById("carnitas").appendChild(document.createTextNode(menu.carnitasPrice.toFixed(2)));
		document.getElementById("barbacoa").appendChild(document.createTextNode(menu.barbacoaPrice.toFixed(2)));
		document.getElementById("vegitarian").appendChild(document.createTextNode(menu.vegitarianPrice.toFixed(2)));
		document.getElementById("guacLabel").appendChild(document.createTextNode(menu.guacPrice.toFixed(2) + " "));


	}

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

	this.getBeanType = function() {

		if (document.getElementById("pintoBeans").checked) {

			return "pinto";

		} else {

			return "black";

		}

	}

	this.getRiceType = function() {

		if (document.getElementById("whiteRice").checked) {

			return "white";

		} else {

			return "brown";

		}

	}

}

function Menu() {

	this.chickenPrice = 6.20;
	this.steakPrice = 6.75;
	this.carnitasPrice = 6.60;
	this.barbacoaPrice = 6.60;
	this.vegitarianPrice = 6.20;
	this.guacPrice = 1.40;

}

function Burrito() {

	this.type;
	this.rice;
	this.beans;
	this.salsas = [];
	this.guac;
	this.basicCost = 0;
	this.cost = 0;

	this.calculateCost = function() {

		if (this.type === "chicken") {

			this.cost += menu.chickenPrice;
			this.basicCost = menu.chickenPrice

		} else if (this.type === "steak") {

			this.cost += menu.steakPrice;
			this.basicCost = menu.steakPrice;

		} else if (this.type === "carnitas") {

			this.cost += menu.carnitasPrice;
			this.basicCost = menu.carnitasPrice;

		} else if (this.type === "barbacoa") {

			this.cost += menu.barbacoaPrice;
			this.basicCost = menu.barbacoaPrice;

		} else if (this.type === "vegitarian") {

			this.cost += menu.vegitarianPrice;
			this.basicCost = menu.vegitarianPrice;

		}

		if (this.guac) {

			this.cost += menu.guacPrice;

		}

	}

	this.displayBurrito = function() {

		//Set up divs & formatting elements
		var receiptDiv = document.getElementById("receipt");
		var burritoDiv = document.createElement("div");
		var typeFormat = document.createElement("b");


		//Initial label as the burrito type
		var typeText = document.createTextNode(this.type.toUpperCase() + " BURRITO + $");
		var basicCostText = document.createTextNode(this.basicCost.toFixed(2));
		typeFormat.appendChild(typeText);
		burritoDiv.appendChild(typeFormat);
		burritoDiv.appendChild(basicCostText);
		burritoDiv.appendChild(document.createElement("br"));

		//Burrito details
		var riceText = document.createTextNode("---- " + this.rice + " rice");
		burritoDiv.appendChild(riceText);
		burritoDiv.appendChild(document.createElement("br"));

		var beansText = document.createTextNode("---- " + this.beans + " beans");
		burritoDiv.appendChild(beansText);
		burritoDiv.appendChild(document.createElement("br"));

		var salsaText = document.createTextNode("---- no salsa");

		if (this.salsas.length > 0) {

			for (var i = 0; i < this.salsas.length; i++) {

				salsaText = document.createTextNode("---- " + this.salsas[i].value + " salsa ");
				burritoDiv.appendChild(salsaText);
				burritoDiv.appendChild(document.createElement("br"));

			}

		} else {

			burritoDiv.appendChild(salsaText);
			burritoDiv.appendChild(document.createElement("br"));

		}

		var guacString;
		if (this.guac) {

			guacString = "add guac + $" + menu.guacPrice.toFixed(2);

		} else { 

			guacString = "no guac";

		}

		var guacText = document.createTextNode("---- " + guacString);
		burritoDiv.appendChild(guacText);
		burritoDiv.appendChild(document.createElement("br"));

		//Display total and delete button
		var totalFormat = document.createElement("b");
		var totalText = document.createTextNode("TOTAL: $");
		var totalCostText = document.createTextNode(this.cost.toFixed(2));
		var btnDelete = document.createElement("button");
		var removeText = document.createTextNode("Remove");
		btnDelete.appendChild(removeText);


		totalFormat.appendChild(totalText);
		burritoDiv.appendChild(totalFormat);
		burritoDiv.appendChild(totalCostText);
		burritoDiv.appendChild(totalText);
		burritoDiv.appendChild(btnDelete);

		//Add all text to reciept div
		receiptDiv.appendChild(burritoDiv);

	}

}

function Receipt() {

	this.burritos = [];

	this.addBurrito = function() {

		var burrito = new Burrito();

		burrito.type = document.getElementById("burritoType").value;
		burrito.rice = orderForm.getRiceType();
		burrito.beans = orderForm.getBeanType();
		burrito.salsas = orderForm.getSalsaChoices();
		burrito.guac = document.getElementById("guac").checked;

		this.burritos.push(burrito);

		burrito.calculateCost();
		burrito.displayBurrito();

	}

	this.removeBurrito = function(burrito) {


	}

}
