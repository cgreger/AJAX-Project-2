var receipt = new Receipt();

function init() {

	var btnAddBurrito = document.getElementById("btnAddBurrito");
	var type = document.getElementById("burritoType").value;
	var rice = getRiceType();
	var beans = getBeanType();
	var salsas = getSalsaChoices();
	var guac = document.getElementById("guac").checked;

	btnAddBurrito.onclick = function() {

		var burrito = new Burrito();

		burrito.type = type;
		burrito.rice = rice;
		burrito.beans = beans;
		burrito.salsas = salsas;
		burrito.guac = guac;

	}

	function getSalsaChoices() {

		var salsaChoices = document.getElementById("salsas");
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

function Burrito() {

	this.type;
	this.rice;
	this.beans;
	this.salsas = [];
	this.guac;

	this.calculateCost = function() {



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
