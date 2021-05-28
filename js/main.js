let player = new inventaire('bob');
let counter = 0;
let nbCaseX = 8, nbCaseY = 6;
console.log("kk", -1 % 10);
console.log(player.pseudo);
let Map1 = new Map(nbCaseX,nbCaseY, player);
let memoire = {x : 50, y : 50}, graine = {}, verger;
//let tabMap = Map1.getTabMap();

Map1.afficherMap(canvas,context);
displayCoinBalance();

// Position X du canvas
elemLeft = canvas.offsetLeft,
// Position Y du canvas
elemTop = canvas.offsetTop,

// Add event listener for click events.
canvas.addEventListener('click', function(event) {
    x = event.pageX - elemLeft,
    y = event.pageY - elemTop;
console.log(x,y);
    testActionAFaire(x,y,Map1.tabMap);
}, false);