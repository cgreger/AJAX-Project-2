var receipt = new Receipt();

function init() {

	var btnAddBurrito = document.getElementById("btnAddBurrito");

	btnAddBurrito.onclick = function() {

		var type = document.getElementById("burritoType").value;
		var rice = getRiceType();
		var beans = getBeanType();
		var salsas = getSalsaChoices();
		var guac = document.getElementById("guac").checked;

		var burrito = new Burrito();

		burrito.type = type;
		burrito.rice = rice;
		burrito.beans = beans;
		burrito.salsas = salsas;
		burrito.guac = guac;
		burrito.calculateCost();

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

		var menu = new Menu();

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

	this.getDetails = function() {



	}

}

function Receipt() {

	this.burritos = [];

	this.addBurrito = function(burrito) {



	}

	this.removeBurrito = function(burrito) {


	}

	this.printReciept = function() {



	}

}
