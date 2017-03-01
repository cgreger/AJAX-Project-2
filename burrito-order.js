
var orderForm;
var receipt;
var menu;

function init() {
	
	orderForm = new OrderForm();
	receipt = new Receipt();
	menu = new Menu();
	
	orderForm.setFormPrices();
	receipt.addReceiptTotal();
	
	orderForm.btnAddBurrito.onclick = function() {

		receipt.addBurrito();

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
	
	this.formatTotal = function() {
		
		var totalFormat = document.createElement("b");
		var totalText = document.createTextNode("TOTAL: $");
		var totalCostText = document.createTextNode(this.totalCost.toFixed(2));
		
		totalFormat.appendChild(totalText); //<b>TOTAL: $</b>
		this.burritoDiv.appendChild(totalFormat); //<div>...<b>TOTAL: $</b><div>
		this.burritoDiv.appendChild(totalCostText);//<div>...<b>TOTAL: $</b>7.99<div>
		
	}

}

function Receipt() {

	this.burritos = [];
	this.receiptDiv = document.getElementById("receipt");
	this.totalDiv = document.getElementById("orderTotal");
	this.total = 0;
	
	this.addBurrito = function() {

		var burrito = new Burrito();
		
		burrito.id = Date.now() + (Math.random() * 1000);
		burrito.type = document.getElementById("burritoType").value;
		burrito.rice = orderForm.getRiceType();
		burrito.beans = orderForm.getBeanType();
		burrito.salsas = orderForm.getSalsaChoices();
		burrito.guac = document.getElementById("guac").checked;

		this.burritos.push(burrito);

		burrito.calculateTotalCost();
		this.total += burrito.totalCost;
		this.updateReceiptTotal();
		
		this.buildBurritoReceipt(burrito);

	}

	this.removeBurrito = function(burrito) {
		
		var burritoId = burrito.id;
		
		for (var i = 0; i < this.burritos.length; i++) {
			
			if (this.burritos[i].id === burrito.id) {
				
				this.total -= this.burritos[i].totalCost;
				this.burritos.splice(i, 1);
				break;
				
			}
			
		}
		
		var divToRemove = burrito.burritoDiv;
		
		divToRemove.parentNode.removeChild(divToRemove);
		this.updateReceiptTotal();
		
		
		
	}
	
	this.buildBurritoReceipt = function(burrito) {
		
		burrito.formatBurritoTitle();
		burrito.formatBurritoDetails();
		this.addRemoveButton(burrito);
		this.receiptDiv.appendChild(burrito.burritoDiv);
		
	}
	
	this.updateReceiptTotal = function() {
		
		var orderTotalDiv = document.getElementById("orderTotal");
		
		orderTotalDiv.lastChild.nodeValue = this.total.toFixed(2);
		
	}
	
	this.addRemoveButton = function(burrito) {
		
		var btnRemoveBurrito = document.createElement("button");
		var btnText = document.createTextNode("Remove");
		
		btnRemoveBurrito.appendChild(btnText);
		burrito.burritoDiv.appendChild(btnRemoveBurrito);
		
		btnRemoveBurrito.onclick = function() {
			
			receipt.removeBurrito(burrito);
			
		}
		
	}
	
	this.addReceiptTotal = function() {
		
		var orderTotalDiv = document.getElementById("orderTotal");
		
		orderTotalDiv.appendChild(document.createTextNode(this.total.toFixed(2)));
		
		
	}

}
