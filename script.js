/*===========================
Variables & Presets
=============================*/

//credit to cookie clicker @boozz-1000 and chap-gpt for help and or inspiration with this


var Game={} 
Game.Achievements={}
Game.Objects={}
Game.planets=0
Game.planetsAllTime=0
Game.cps=0
Game.clickPower=1
Game.achievementsOwned=0
Game.priceIncrease=1.2
Game.prestigeLevel=0
Game.heavenlyMeteors=0
Game.buyMode=1
Game.buyAmount=1

/*===========================
Misc Functions
=============================*/ 

Game.clickPlanet = function(amount) {
    Game.planets += amount
    Game.planetsAllTime += amount
    Game.updateDisplay()
}
Game.Object=function(name, price, cps, clickpower){
    this.name = name
    this.basePrice = price
    this.price = this.basePrice
    this.bulkPrice = this.price
    this.baseCps = cps
    this.cps = cps
    this.owned = 0
    this.clickpower = clickpower

    this.buy=function(amount){
        if(Game.buyMode == 0){this.sell(Game.buyAmount)}

        if(Game.buyMode == 1) {
        if(amount>1) {
        if(Game.planets >= this.bulkPrice*Game.priceIncrease*amount){
            this.owned+=amount
            Game.cps+=this.cps*amount
            Game.clickPower+=this.clickpower*amount
            Game.spend(this.bulkPrice*Game.priceIncrease*amount)
            this.bulkPrice *= Game.priceIncrease*amount
            Game.updateDisplay()
        }
    }
    else{
        if(Game.planets >= this.bulkPrice){
            this.owned++
            Game.cps+=this.cps
            Game.clickPower+=this.clickpower
            Game.spend(this.bulkPrice)
            this.bulkPrice *= Game.priceIncrease
            Game.updateDisplay()
        }
    }
}
}
    this.sell=function(amount){
        if(this.owned>=amount){
        this.owned-=amount
        Game.cps -= this.cps*amount
        Game.clickPower-= this.clickpower*amount
        Game.clickPlanet(this.bulkPrice*amount)
        this.bulkPrice /= Game.priceIncrease*amount
        Game.updateDisplay()
    }
}

    Game.Objects[this.name]=this
}

Game.Achievement=function(name, desc) {
    this.name = name
    this.isUnlocked = 0
    this.desc = desc
    Game.Achievements[this.name]=this
}

new Game.Object('Moon',10,1,0)
new Game.Object('Mars',100,15,1)
new Game.Object('Mercury',1000,50,10)
new Game.Object('Neptune',15000,100,50)
new Game.Object('Venus',150000,500,150)
new Game.Object('Uranus',1500000,2500,250)
new Game.Object('Jupiter',15000000,5000,500)
new Game.Object('Sun',75000000,100000,1000)
Game.prestige=function(){
    if(Game.planets >= 1e12) {
    Game.planets = 0
    Game.prestigeLevel += Game.planets/1e12
    Game.heavenlyMeteors += Game.planets/1e12
    Game.updateDisplay()
    }
}
Game.reincarnate=function(){
    Game.prestigeLevel=0
    Game.heavenlyMeteors=0
    Game.planets=0
    Game.updateDisplay()
}
Game.spend=function(amount){
    if(Game.planets >= amount){
        Game.planets-=amount
        Game.updateDisplay()
    }
}

Game.shortenNumber=function(num) { //I know this is extremely unoptimized but im too lazy to figure out a better way ay the moment might change later tho.
    if(1e3 > num){return parseInt(num)}
    if(!isFinite(num)){return NaN}

    if(num >= 1e93){return parseFloat(num/1e93).toFixed(2) + ' Trigintillion'}
    if(num >= 1e90){return parseFloat(num/1e90).toFixed(2) + ' Novemvigintillion'}
    if(num >= 1e87){return parseFloat(num/1e87).toFixed(2) + ' Octovigintillion'}
    if(num >= 1e84){return parseFloat(num/1e84).toFixed(2) + ' Septenvigintillion'}
    if(num >= 1e81){return parseFloat(num/1e81).toFixed(2) + ' Sexvigintillion'}
    if(num >= 1e78){return parseFloat(num/1e78).toFixed(2) + ' Quinvigintillion'}
    if(num >= 1e75){return parseFloat(num/1e75).toFixed(2) + ' Quattruovigintillion'}
    if(num >= 1e72){return parseFloat(num/1e72).toFixed(2) + ' Trevigintillion'}
    if(num >= 1e69){return parseFloat(num/1e69).toFixed(2) + ' Duovigintillion'}
    if(num >= 1e66){return parseFloat(num/1e66).toFixed(2) + ' Unvigintillion'}
    if(num >= 1e63){return parseFloat(num/1e63).toFixed(2) + ' Vigintillion'}
    if(num >= 1e60){return parseFloat(num/1e60).toFixed(2) + ' Novemdecillion'}
    if(num >= 1e57){return parseFloat(num/1e57).toFixed(2) + ' Octodecillion'}
    if(num >= 1e54){return parseFloat(num/1e54).toFixed(2) + ' Septendecillion'}
    if(num >= 1e51){return parseFloat(num/1e51).toFixed(2) + ' Sexdecillion'}
    if(num >= 1e48){return parseFloat(num/1e48).toFixed(2) + ' Quindecillion'}
    if(num >= 1e45){return parseFloat(num/1e45).toFixed(2) + ' Quattruodecillion'}
    if(num >= 1e42){return parseFloat(num/1e42).toFixed(2) + ' Tredecillion'}
    if(num >= 1e39){return parseFloat(num/1e39).toFixed(2) + ' Duodecillion'}    
    if(num >= 1e36){return parseFloat(num/1e36).toFixed(2) + ' Undecillion'}
    if(num >= 1e33){return parseFloat(num/1e33).toFixed(2) + ' Decillion'}
    if(num >= 1e30){return parseFloat(num/1e30).toFixed(2) + ' Nonillion'}
    if(num >= 1e27){return parseFloat(num/1e27).toFixed(2) + ' Octillion'}
    if(num >= 1e24){return parseFloat(num/1e24).toFixed(2) + ' Septillion'}
    if(num >= 1e21){return parseFloat(num/1e21).toFixed(2) + ' Sextillion'}
    if(num >= 1e18){return parseFloat(num/1e18).toFixed(2) + ' Quintillion'}
    if(num >= 1e15){return parseFloat(num/1e15).toFixed(2) + ' Quadrillion'}
    if(num >= 1e12){return parseFloat(num/1e12).toFixed(2) + ' Trillion'}
    if(num >= 1e9){return parseFloat(num/1e9).toFixed(2) + ' Billion'}
    if(num >= 1e6){return parseFloat(num/1e6).toFixed(2) + ' Million'}
    if(num >= 1e3){return parseFloat(num/1e3).toFixed(2) + ' Thousand'}
}

Game.win = function(what) {
    if(typeof what==='string')
    {
        if(Game.Achievements[what])
        {
            var it=Game.Achievements[what]
            if(it.isUnlocked == 0)
            {
                var name=it.name
                it.isUnlocked=1
                Game.achievementsOwned++
                Game.notify('You unlocked: '+name+', Nice! ', it.desc)
            }
        }
    }
}

Game.changeBuyAmount=function(buyAmount){
    Game.buyAmount=buyAmount
    Game.updateDisplay()
}
Game.changeBuyMode=function(buyMode){
    Game.buyMode=buyMode
    Game.updateDisplay()
}
Game.updateDisplay = function() {
    //Will add more

    document.getElementById('score').innerHTML = Game.shortenNumber(Game.planets)
    document.getElementById('cps').innerHTML = Game.shortenNumber(Game.cps)
    document.getElementById('clickPower').innerHTML = Game.shortenNumber(Game.clickPower)
    document.getElementById('moonsOwned').innerHTML = Game.shortenNumber(Game.Objects['Moon'].owned)
    document.getElementById('marsOwned').innerHTML = Game.shortenNumber(Game.Objects['Mars'].owned)
    document.getElementById('mercuryOwned').innerHTML = Game.shortenNumber(Game.Objects['Mercury'].owned)
    document.getElementById('neptuneOwned').innerHTML = Game.shortenNumber(Game.Objects['Neptune'].owned)
    document.getElementById('venusOwned').innerHTML = Game.shortenNumber(Game.Objects['Venus'].owned)
    document.getElementById('uranusOwned').innerHTML = Game.shortenNumber(Game.Objects['Uranus'].owned)
    document.getElementById('jupiterOwned').innerHTML = Game.shortenNumber(Game.Objects['Jupiter'].owned)
    document.getElementById('sunOwned').innerHTML = Game.shortenNumber(Game.Objects['Sun'].owned)
    if(Game.buyAmount>1){
        document.getElementById('moonPrice').innerHTML = Game.shortenNumber(Game.Objects['Moon'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('marsPrice').innerHTML = Game.shortenNumber(Game.Objects['Mars'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('mercuryPrice').innerHTML = Game.shortenNumber(Game.Objects['Mercury'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('neptunePrice').innerHTML = Game.shortenNumber(Game.Objects['Neptune'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('venusPrice').innerHTML = Game.shortenNumber(Game.Objects['Venus'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('uranusPrice').innerHTML = Game.shortenNumber(Game.Objects['Uranus'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('jupiterPrice').innerHTML = Game.shortenNumber(Game.Objects['Jupiter'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        document.getElementById('sunPrice').innerHTML = Game.shortenNumber(Game.Objects['Sun'].bulkPrice*Game.priceIncrease*Game.buyAmount.toFixed(0))
        }
    else{
        document.getElementById('moonPrice').innerHTML = Game.shortenNumber(Game.Objects['Moon'].bulkPrice.toFixed(0))
        document.getElementById('marsPrice').innerHTML = Game.shortenNumber(Game.Objects['Mars'].bulkPrice.toFixed(0))
        document.getElementById('mercuryPrice').innerHTML = Game.shortenNumber(Game.Objects['Mercury'].bulkPrice.toFixed(0))
        document.getElementById('neptunePrice').innerHTML = Game.shortenNumber(Game.Objects['Neptune'].bulkPrice.toFixed(0))
        document.getElementById('venusPrice').innerHTML = Game.shortenNumber(Game.Objects['Venus'].bulkPrice.toFixed(0))
        document.getElementById('uranusPrice').innerHTML = Game.shortenNumber(Game.Objects['Uranus'].bulkPrice.toFixed(0))
        document.getElementById('jupiterPrice').innerHTML = Game.shortenNumber(Game.Objects['Jupiter'].bulkPrice.toFixed(0))
        document.getElementById('sunPrice').innerHTML = Game.shortenNumber(Game.Objects['Sun'].bulkPrice.toFixed(0))
    }
} 


Game.notify=function(message,desc){
    alert(message + '\n"' + desc + '"')
    var notificationBox = document.createElement('div')
    var notificationDesc = document.createElement('p')
    notificationDesc.innerHTML = desc   
    notificationDesc.appendChild(notificationBox)
    notificationBox.classList.add('noti')
    document.body.appendChild(notificationBox)
}


setInterval(function() {
    if(Game.cps > 0) { // To reduce lag idk if it works tho lol
        if(Game.cps >= 10){
            if(Game.cps >= 100) {
            Game.win('Universe')
            Game.planets += Game.cps/100
            Game.planetsAllTime += Game.cps/100
            Game.updateDisplay()
            }
            Game.win('Galaxy')
            Game.planets += Game.cps/100
            Game.planetsAllTime += Game.cps/100
            Game.updateDisplay()
        }
        Game.win('Planets')
        Game.planets += Game.cps/100
        Game.planetsAllTime += Game.cps/100
        Game.updateDisplay()
    }
},10)

new Game.Achievement('Planets','Claiming some planets eh?')
new Game.Achievement('Galaxy', 'Wow, you discovered a new galaxy!')
new Game.Achievement('Universe', 'Woah, universes are big!')
new Game.Achievement('Multiverse', 'Any idea when you will stop?')
new Game.Achievement('Click', 'Clicking is fun! :)')
new Game.Achievement('Double-Click', 'Click click click, click again!')
new Game.Achievement('Clickidy Slickidy','Thats alot of clicks!')

