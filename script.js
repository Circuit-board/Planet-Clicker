/*===========================
Variables & Presets
=============================*/

//credit to cookie clicker @boozz-1000 and chap-gpt for help and or inspiration with this

var Game = {};
Game.Achievements = {};
Game.Objects = {};
Game.planets = 0;
Game.planetsAllTime = 0;
Game.cps = 0;
Game.clickPower = 1;
Game.achievementsOwned = 0;
Game.priceIncrease = 1.2;
Game.prestigeLevel = 0;
Game.heavenlyMeteors = 0;
Game.buyMode = 1;
Game.buyAmount = 1;

/*===========================
Misc Functions
=============================*/

Game.clickPlanet = function (amount) {
	Game.planets += amount;
	Game.planetsAllTime += amount;
	Game.updateDisplay();
};
Game.Object = function (name, price, cps, clickpower) {
	this.name = name;
	this.basePrice = price;
	this.price = this.basePrice;
	this.bulkPrice = this.price;
	this.baseCps = cps;
	this.cps = cps;
	this.owned = 0;
	this.clickpower = clickpower;

	this.buy = function (amount) {
		if (Game.buyMode == 0) {
			this.sell(Game.buyAmount);
		}
		var totalPrice;
		if (amount > 1) {
			totalPrice =
				this.bulkPrice *
				((Math.pow(Game.priceIncrease, amount) - 1) / (Game.priceIncrease - 1));
		}
		if (amount === 1) {
			totalPrice = this.bulkPrice;
		}
		if (Game.buyMode == 1) {
			if (amount > 1) {
				if (Game.planets >= totalPrice) {
					this.owned += amount;
					Game.cps += this.cps * amount;
					Game.clickPower += this.clickpower * amount;
					this.bulkPrice *= Math.pow(Game.priceIncrease, amount);
					Game.spend(price);
					Game.updateDisplay();
				}
			} else {
				if (Game.planets >= this.bulkPrice) {
					this.owned++;
					Game.cps += this.cps;
					Game.clickPower += this.clickpower;
					this.bulkPrice *= Game.priceIncrease;
					Game.spend(this.bulkPrice);
					Game.updateDisplay();
				}
			}
		}
	};
	this.sell = function (amount) {
		if (this.owned >= amount) {
			this.owned -= amount;
			Game.cps -= this.cps * amount;
			Game.clickPower -= this.clickpower * amount;
			Game.clickPlanet(this.bulkPrice * amount);
			this.bulkPrice /= Game.priceIncrease * amount;
			Game.updateDisplay();
		}
	};

	Game.Objects[this.name] = this;
};

Game.Achievement = function (name, desc) {
	this.name = name;
	this.isUnlocked = 0;
	this.desc = desc;
	Game.Achievements[this.name] = this;
};

new Game.Object('Mercury', 10, 1, 0);
new Game.Object('Mars', 100, 15, 1);
new Game.Object('Venus', 1000, 50, 10);
new Game.Object('Neptune', 15000, 100, 50);
new Game.Object('Uranus', 150000, 500, 150);
new Game.Object('Saturn', 1500000, 2500, 250);
new Game.Object('Jupiter', 15000000, 5000, 500);
new Game.Object('Sun', 75000000, 100000, 1000);

Game.prestige = function () {
	if (Game.planets >= 1e12) {
		Game.planets = 0;
		Game.prestigeLevel += Game.planets / 1e12;
		Game.heavenlyMeteors += Game.planets / 1e12;
		Game.updateDisplay();
	}
};
Game.reincarnate = function () {
	Game.prestigeLevel = 0;
	Game.heavenlyMeteors = 0;
	Game.planets = 0;
	Game.updateDisplay();
};
Game.spend = function (amount) {
	if (Game.planets >= amount) {
		Game.planets -= amount;
		Game.updateDisplay();
	}
};

Game.shortenNumber = function (num) {
	const rawFormatter = function (val) {
		return Math.round(val * 1000) / 1000;
	};
	if (num > 1e308) {
		return 'Number too large!';
	}
	function formatEveryThirdPower(notations) {
		//Credit Cookie clicekr
		return function (val) {
			var base = 0,
				notationValue = '';
			if (val >= 1000000) {
				val /= 1000;
				while (Math.round(val) >= 1000) {
					val /= 1000;
					base++;
				}
				if (base >= notations.length) {
					return 'Infinity';
				} else {
					notationValue = notations[base];
				}
			}
			return Math.round(val * 1000) / 1000 + notationValue;
		};
	}
	const prefixes = [
		' ',
		'un',
		'duo',
		'tre',
		'quattruo',
		'quin',
		'sex',
		'septen',
		'octo',
		'novem',
	];
	const formatLong = [
		' thousand',
		' million',
		' billion',
		' trillion',
		' quadrillion',
		' quintillion',
		' sextillion',
		' septillion',
		' octillion',
		' nonillion',
	];
	const suffixes = [
		'decillion',
		'vigintillion',
		'trigintillion',
		'quadragintillion',
		'quinquagintillion',
		'sexagintillion',
		'septuagintillion',
		'octogintillion',
		'nonagintillion',
		'centillion',
	];

	for (var i in suffixes) {
		for (var ii in prefixes) {
			formatLong.push(' ' + prefixes[ii] + suffixes[i]);
		}
	}

	const numFormatters = [formatEveryThirdPower(formatLong), rawFormatter];

	return parseFloat(numFormatters[0](num)).toFixed(0).toString();
};

Game.win = function (what) {
	if (typeof what === 'string') {
		if (Game.Achievements[what]) {
			var it = Game.Achievements[what];
			if (it.isUnlocked === 0) {
				var name = it.name;
				it.isUnlocked = 1;
				Game.achievementsOwned++;
				Game.notify('You unlocked: ' + name + ', Nice! ', it.desc);
			}
		}
	}
};

Game.changeBuyAmount = function (buyAmount) {
	Game.buyAmount = buyAmount;
	Game.updateDisplay();
};
Game.changeBuyMode = function (buyMode) {
	Game.buyMode = buyMode;
	Game.updateDisplay();
};
Game.updateDisplay = function () {
	//Will add more

	document.getElementById('score').innerHTML = Game.shortenNumber(Game.planets);
	document.getElementById('cps').innerHTML = Game.shortenNumber(Game.cps);
	document.getElementById('clickPower').innerHTML = Game.shortenNumber(
		Game.clickPower
	);
	document.getElementById('mercuryOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Mercury'].owned
	);
	document.getElementById('marsOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Mars'].owned
	);
	document.getElementById('venusOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Venus'].owned
	);
	document.getElementById('neptuneOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Neptune'].owned
	);
	document.getElementById('uranusOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Uranus'].owned
	);
	document.getElementById('saturnOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Saturn'].owned
	);
	document.getElementById('jupiterOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Jupiter'].owned
	);
	document.getElementById('sunOwned').innerHTML = Game.shortenNumber(
		Game.Objects['Sun'].owned
	);
	if (Game.buyAmount > 1) {
		document.getElementById('mercuryPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Mercury'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('marsPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Mars'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('venusPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Venus'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('neptunePrice').innerHTML = Game.shortenNumber(
			Game.Objects['Neptune'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('uranusPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Uranus'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('saturnPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Saturn'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('jupiterPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Jupiter'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
		document.getElementById('sunPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Sun'].bulkPrice *
				((Math.pow(Game.priceIncrease, Game.buyAmount) - 1) /
					(Game.priceIncrease - 1))
		);
	} else {
		document.getElementById('mercuryPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Mercury'].bulkPrice.toFixed(0)
		);
		document.getElementById('marsPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Mars'].bulkPrice.toFixed(0)
		);
		document.getElementById('venusPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Venus'].bulkPrice.toFixed(0)
		);
		document.getElementById('neptunePrice').innerHTML = Game.shortenNumber(
			Game.Objects['Neptune'].bulkPrice.toFixed(0)
		);
		document.getElementById('uranusPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Uranus'].bulkPrice.toFixed(0)
		);
		document.getElementById('saturnPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Saturn'].bulkPrice.toFixed(0)
		);
		document.getElementById('jupiterPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Jupiter'].bulkPrice.toFixed(0)
		);
		document.getElementById('sunPrice').innerHTML = Game.shortenNumber(
			Game.Objects['Sun'].bulkPrice.toFixed(0)
		);
	}
};

Game.notify = function (message, desc) {
	alert(message + '\n"' + desc + '"');
	var notificationBox = document.createElement('div');
	var notificationDesc = document.createElement('p');
	notificationDesc.innerHTML = desc;
	notificationDesc.appendChild(notificationBox);
	notificationBox.classList.add('noti');
	document.body.appendChild(notificationBox);
};

setInterval(function () {
	if (Game.cps > 0) {
		// To reduce lag idk if it works tho lol
		if (Game.cps >= 10) {
			if (Game.cps >= 100) {
				Game.win('Universe');
				Game.planets += Game.cps / 100;
				Game.planetsAllTime += Game.cps / 100;
				Game.updateDisplay();
			}
			Game.win('Galaxy');
			Game.planets += Game.cps / 100;
			Game.planetsAllTime += Game.cps / 100;
			Game.updateDisplay();
		}
		Game.win('Planets');
		Game.planets += Game.cps / 100;
		Game.planetsAllTime += Game.cps / 100;
		Game.updateDisplay();
	}
}, 10);

new Game.Achievement('Planets', 'Claiming some planets eh?');
new Game.Achievement('Galaxy', 'Wow, you discovered a new galaxy!');
new Game.Achievement('Universe', 'Woah, universes are big!');
new Game.Achievement('Multiverse', 'Any idea when you will stop?');
new Game.Achievement('Click', 'Clicking is fun! :)');
new Game.Achievement('Double-Click', 'Click click click, click again!');
new Game.Achievement('Clickidy Slickidy', 'Thats alot of clicks!');
new Game.Achievement('Of clicks and galaxies', 'Two things: Click and Planet');
