let player = new inventaire('bob');
let counter = 0;
let nbCaseX = 8, nbCaseY = 6;
console.log("kk", -1 % 10);
console.log(player.pseudo);
let Map1 = new Map(nbCaseX,nbCaseY, player);
let memoire = {x : 50, y : 50}, graine = {};
//let tabMap = Map1.getTabMap();
Map1.tabMap[0][1] = new ParceTerre();
Map1.afficherMap(canvas,context);

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


//Map1.placerParcelle(1,1,testTerre); // Place une parcelle de terre en (1,1)

//testTerre.launchPousse(player.carotte, testTerre);

/*
console.log("nb blé : " + player.blé.nb_poss);
console.log(player.get_Solde());

player.Achat(player.blé.name, 2, player.blé.prix);
console.log("nb blé : " + player.blé.nb_poss);
console.log(player.get_Solde());

player.Supp_Obj(player.blé.name, 1, 0);
console.log("nb blé : " + player.blé.nb_poss);
console.log(player.get_Solde());

player.Supp_Obj(player.blé.name, 1, 1);
console.log("nb blé : " + player.blé.nb_poss);
console.log(player.get_Solde());

player.Supp_Obj(player.blé.name, 1, 1);
console.log("nb blé : " + player.blé.nb_poss);
console.log(player.get_Solde());*/