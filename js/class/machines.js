function recolte_intelligente(x,y){
    if(Map1.tabMap[x][y].recoltable === true){
        //ajouter sprite machine recolte sur la case
        animation('./../img/machine/moissonneuse.png', x, y, './../img/dirt.png');
    }
}

/*
function arrosage_intelligent(){
__    //Parcours du tableau de cases
    for(let i = 0 ; i < Map1.longueur ; i++){
        for(let j = 0 ; j < Map1.largeur ; j++){
            if(Map1.tabMap[i][j] instanceof ParcePousse === true && Map1.tabMap[i][j].water < 50/100){//Si eau à - de 50%
                Map1.tabMap[i][j].water = 100; // Arrose si la case a moins de la moitié de sa capacité en eau
                //Ajouter baisse énérgie machine ou coût de l'arrosage.
            }
        }
    }
}
*/
function dirtToRoutes_intelligent(x,y){ // Machine qui trace les sillons (routes)
    if(Map1.tabMap[x][y] instanceof ParceTerre && Map1.tabMap[x][y].apparance === "./../img/dirt.png"){
        animation('./../img/machine/sillonner.png', x, y, './../img/road.png');

    }
}

function arrosage_intelligent(x, y){
    if(graine.name!= undefined && Map1.tabMap[x][y] instanceof ParcePousse === true && Map1.tabMap[x][y].appearance == "./../img/champs/graine.png"){
        animation('./../img/machine/arroser.png', x, y, './../img/champs/graine.png');
    }
}

function semer(x, y){
    if(graine.name!== undefined && Map1.tabMap[x][y] !== undefined && Map1.tabMap[x][y] instanceof ParceTerre && Map1.tabMap[x][y].apparance === './../img/road.png')
        animation('./../img/machine/semer.png', x, y, './../img/champs/graine.png')
}

function fruitRecolte(){ // Utiliser recolte_intelligente mais il faudra passer le png de la machine en parametre pour qu'il soit diff de celui des plants

}

function placerEngrais(x,y){

}

function Drone(){// Doit lancer les fonctions ci dessus automatiquement
    //On commence par un parcours de la map :
    for(let i = 0 ; i < Map1.longueur ; i++){
        for(let j = 0 ; j < Map1.largeur ; j++){
            //Si la case regardée est recoltable :
            if(Map1.tabMap[i][j].recoltable !== undefined){
            if(Map1.tabMap[i][j].recoltable === true){
                recolte_intelligente(i,j);// Lance l'algo recolte auto sur la première parcelle compatible ||| doit vérif si arbre ou plant pour mettre le bon png
                break;
                    //ajouter sprite machine recolte sur la case
                    
            }}
            if(Map1.tabMap[i][j] instanceof ParceTerre && Map1.tabMap[i][j].apparance === "./../img/dirt.png"){
               dirtToRoutes_intelligent(i,j);
               break;
            }
        }
    }
}