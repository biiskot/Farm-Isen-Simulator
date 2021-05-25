function recolte_intelligente(x,y){
    if(Map1.tabMap[x][y].recoltable === true){
        //ajouter sprite machine recolte sur la case
        animation('./../img/machine/tracteur.png', x, y);

        if(Map1.tabMap[x+1][y].recoltable !== undefined && Map1.tabMap[x+1][y].recoltable === true){ // test les cases adjacentes
            recolte_intelligente(x+1,y);
        }
        if((x-1)>0){
            if(Map1.tabMap[x-1][y].recoltable !== undefined && Map1.tabMap[x-1][y].recoltable === true){
                recolte_intelligente(x-1,y);
            }
        }
        if((y-1)>0){
            if(Map1.tabMap[x][y-1].recoltable !== undefined && Map1.tabMap[x][y-1].recoltable === true){
                recolte_intelligente(x,y-1);
            }
        }
        if(Map1.tabMap[x][y+1].recoltable !== undefined && Map1.tabMap[x][y+1].recoltable === true){
            recolte_intelligente(x,y+1);
        }
        else {
            //info : la machine ne peut plus récolter
        }
    }
}

/*
function arrosage_intelligent(){
    //Parcours du tableau de cases
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
    if(Map1.tabMap[x][y] instanceof ParceTerre && Map1.tabMap[x][y].apparance == "./../img/dirt.png"){
        Map1.tabMap[x][y].launchRoad(x,y);

        if(Map1.tabMap[x+1][y] instanceof ParceTerre && Map1.tabMap[x+1][y].apparance == "./../img/dirt.png"){ // test les cases adjacentes
            dirtToRoutes_intelligent(x+1,y);
        }
        if((x-1) > 0){
            if(Map1.tabMap[x-1][y] instanceof ParceTerre && Map1.tabMap[x-1][y].apparance == "./../img/dirt.png"){
                dirtToRoutes_intelligent(x-1,y);
            }
        }
        if(y > 0){
            if(Map1.tabMap[x][y-1] instanceof ParceTerre && Map1.tabMap[x][y-1].apparance == "./../img/dirt.png"){
                dirtToRoutes_intelligent(x,y-1);
            }
        }
        if(Map1.tabMap[x][y+1] instanceof ParceTerre && Map1.tabMap[x][y+1].apparance == "./../img/dirt.png"){
            dirtToRoutes_intelligent(x,y+1);
        }
        else {
            //info : la machine ne peut plus faire de route
        }
    }
}

function fruitRecolte(){ // Utiliser recolte_intelligente mais il faudra passer le png de la machine en parametre pour qu'il soit diff de celui des plants

}

function placerEngrais(x,y){

}

function Drone(){// Doit lancer les fonctions ci dessus automatiquement
    //On commence par un parcours de la map :
    let c = 0;
    for(let i = 0 ; i < Map1.longueur ; i++){
        for(let j = 0 ; j < Map1.largeur ; j++){
            c = 0;
            //Si la case regardée est recoltable :
            if(Map1.tabMap[i][j].recoltable !== undefined){
            if(Map1.tabMap[i][j].recoltable === true){
                recolte_intelligente(i,j);// Lance l'algo recolte auto sur la première parcelle compatible ||| doit vérif si arbre ou plant pour mettre le bon png
                break;
                    //ajouter sprite machine recolte sur la case
                    
            }}
            if(Map1.tabMap[i][j] instanceof ParceTerre && Map1.tabMap[i][j].apparance === "./../img/dirt.png" && c === 0){
               dirtToRoutes_intelligent(i,j);
               break;
            }
        }
    }
}