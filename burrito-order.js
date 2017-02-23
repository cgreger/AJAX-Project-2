
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
	this.type = document.getElementById("burritoType").value;
	this.rice = getRiceType();
	this.beans = getBeanType();
	this.salsas = getSalsaChoices();
	this.guac = document.getElementById("guac").checked;

	this.setFormPrices = function() {

		document.getElementById("chicken").appendChild(document.createTextNode(menu.chickenPrice.toFixed(2)));
		document.getElementById("steak").appendChild(document.createTextNode(menu.steakPrice.toFixed(2)));
		document.getElementById("carnitas").appendChild(document.createTextNode(menu.carnitasPrice.toFixed(2)));
		document.getElementById("barbacoa").appendChild(document.createTextNode(menu.barbacoaPrice.toFixed(2)));
		document.getElementById("vegitarian").appendChild(document.createTextNode(menu.vegitarianPrice.toFixed(2)));
		document.getElementById("guacLabel").appendChild(document.createTextNode(menu.guacPrice.toFixed(2) + " "));


	}

	function getSalsaChoices() {

		var salsaChoices = document.getElementsByName("salsa");
		var selected = [];

		for (var i = 0; i < salsaChoices.length; i++) {

			if (salsaChoices[i].checked) {

				selected.push(salsaChoices[i]);

			}

		}

		return selected;

	}

	function getBeanType() {

		if (document.getElementById("pintoBeans").checked) {

			return "pinto";

		} else {

			return "black";

		}

	}

	function getRiceType() {

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
	this.cost = 0;

	this.calculateCost = function() {

		if (this.type === "chicken") {

			this.cost += menu.chickenPrice;

		} else if (this.type === "steak") {

			this.cost += menu.steakPrice;

		} else if (this.type === "carnitas") {

			this.cost += menu.carnitasPrice;

		} else if (this.type === "barbacoa") {

			this.cost += menu.barbacoaPrice;

		} else if (this.type === "vegitarian") {

			this.cost += menu.vegitarianPrice;

		}

		if (this.guac) {

			this.cost += menu.guacPrice;

		}

	}

	this.displayBurrito = function() {



	}

}

function Receipt() {

	this.burritos = [];

	this.addBurrito = function() {

		var burrito = new Burrito();

		burrito.type = orderForm.type;
		burrito.rice = orderForm.rice;
		burrito.beans = orderForm.beans;
		burrito.salsas = orderForm.salsas;
		burrito.guac = orderForm.guac;
		burrito.calculateCost();

	}

	this.removeBurrito = function(burrito) {


	}

}
