function recolte_intelligente(x,y){
    if(Map1.tabMap[x][y].recoltable === true){
        player.set_Solde_down(20);
        animation('./../img/machine/moissonneuse.png', x, y, './../img/dirt.png');
    }
}

function dirtToRoutes_intelligent(x,y){ // Machine qui trace les sillons (routes)
    if(Map1.tabMap[x][y] instanceof ParceTerre && Map1.tabMap[x][y].apparance === "./../img/dirt.png"){
        player.set_Solde_down(20);
        animation('./../img/machine/sillonner.png', x, y, './../img/roadz.png');

    }
}

function arrosage_intelligent(x, y){
    if(graine.name!= undefined && Map1.tabMap[x][y] instanceof ParcePousse === true && Map1.tabMap[x][y].appearance == "./../img/champs/graine.png"){
        player.set_Solde_down(20);
        animation('./../img/machine/arroser.png', x, y, './../img/champs/grainez.png');
    }
}

function semer(x, y){
    if(graine.name!== undefined && Map1.tabMap[x][y] !== undefined && Map1.tabMap[x][y] instanceof ParceTerre && Map1.tabMap[x][y].apparance === './../img/road.png')
        player.set_Solde_down(20);
        animation('./../img/machine/semer.png', x, y, './../img/champs/grainez.png', graine);
}

function Drone(){// Doit lancer les fonctions ci dessus automatiquement
    player.set_Solde_down(15);
    //On commence par un parcours de la map :
    for(let i = 0 ; i < Map1.longueur ; i++){
        for(let j = 0 ; j < Map1.largeur ; j++){
            if(Map1.tabMap[i][j] instanceof ParceTerre && Map1.tabMap[i][j].apparance === "./../img/dirt.png"){
                Map1.tabMap[i][j].launchRoad(i, j);
            }
            //Si la case regardée est recoltable :
            if(Map1.tabMap[i][j].recoltable !== undefined){
            if(Map1.tabMap[i][j].recoltable === true){
                Map1.tabMap[i][j].recolte(i, j);
            }}

            console.log("i", i, "j", j);
        }
    }
}