const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let coeffDivX = canvas.width/8;
let coeffDivY = canvas.height/6;

class Map{
    constructor(longueur, largeur, player) {
        this.tabMap = new Array(longueur);
        this.longueur = longueur;
        this.largeur = largeur;

        //Creation Map tab 2 dimensions
        for (let i = 0; i < this.tabMap.length; i++) {
            this.tabMap[i] = new Array(largeur);
        }

        //Initialiser toutes les cases en herbe :
        for (let i = 0; i < longueur; i++) {
            for (let j = 0; j < largeur; j++) {
                this.tabMap[i][j] = new Parcelle(player); // de base herbe dans le constructor de Parcelle()
            }
        }
    }

    placerParcelle(indiceX, indiceY, parcelle) {
        this.tabMap[indiceX][indiceY].onclick = parcelle;
    }

    afficherMap(canvas) {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        //let imgHerbe = new Image();
        //let imgTerre = new Image();
        //let imgPousse = new Image();

        for (let i = 0; i < this.longueur; i++) {
            for (let j = 0; j < this.largeur; j++) {
                if(this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParceTerre === false && this.tabMap[i][j] instanceof ParcePousse === false){
                    let imgHerbe = new Image();
                    imgHerbe.src = './../img/grass.png';
                    imgHerbe.onload = function(){
                        context.drawImage(imgHerbe, i*coeffDivX, j*coeffDivY,coeffDivX,coeffDivY);
                    }
                }
                else if(this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParceTerre === true){
                    console.log('terre built');
                    let imgTerre = new Image();
                    imgTerre.src=this.tabMap[i][j].apparance;
                    imgTerre.onload = function(){
                        context.drawImage(imgTerre, i*coeffDivX, j*coeffDivY,coeffDivX,coeffDivY);
                    }
                }
                else if(this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParcePousse === true){
                    let imgPousse = new Image();
                    imgPousse.src= this.tabMap[i][j].appearance;
                    imgPousse.onload = function(){
                        context.drawImage(imgPousse, i*coeffDivX, j*coeffDivY,coeffDivX,coeffDivY);
                    }
                    console.log('pousse');
                }
            }
        }
console.log("0" , Map1.tabMap[0][0].recoltable, "1", Map1.tabMap[0][1].recoltable)
    }

}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class Parcelle {
    //Attributs d'une parcelle :

    constructor(player) {
        this.appearance = 'herbe.png';
        this.plantable = false;
        this.recoltable = false;
        this.player = player;
    }


    launchParceterre(x, y){
        /*
           ANIMATION LABOUREUR
         */
        Map1.tabMap[x][y] = new ParceTerre();                    // a la place de cliquer sur la terre et ça launchPousse, il faudrai que sa pop up les graines où nb_poss > 0 et addeventlistener sur tt les graines, qui click=> launchpousse et comme ça la tu recup grainechoisie
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class ParceTerre extends Parcelle {
    constructor(hauteur, largeur, player) {
        super(hauteur, largeur, player);
        this.apparance = "./../img/dirt.png";
        this.plantable = true;
        this.recoltable = false;
    }

    launchRoad(x, y){
        this.apparance = "./../img/road.png";
    }

    launchPousse(x, y) {
        /*
            ANIMATION TRACTEUR
         */
        console.log("g", graine.name, "xy", memoire.x, memoire.y);
        if(graine.name!= undefined && Map1.tabMap[memoire.x][memoire.y] instanceof ParceTerre === true && Map1.tabMap[memoire.x][memoire.y].apparance == "./../img/road.png"){
            Map1.tabMap[x][y] = new ParcePousse(x, y);// GRAINE EN PARAM
            let g = graine;
            //graine = "";
            poussePlante1(x, y, g);
            memoire.x = 50;
            memoire.y = 50;
        }
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class ParcePousse extends Parcelle {
    constructor(x, y) {
        super(1, 1);
        //this.graineChoisie = graine;
        this.pousseFinie = false;
        this.timerPousse = 300000;
        this.appearance = "./../img/champs/road_millieu.png";
        this.recoltable = false;
        console.log("nice : ", Map1.tabMap[x][y] instanceof ParcePousse);
        //this.time = setTimeout(poussePlante2(x, y, this.timerPousse), this.timerPousse / 3);
    }

    recolte(x, y) {
        Map1.tabMap[x][y] = new ParceTerre();
        //this.player.Ajouter_Obj_Recolte(this.graineChoisie.name, 5); // ajoute le produit fini à l'inventaire
        console.log("recolte effectuee, Vous avez gagne  = " + this.player.solde);
    }
}

function testActionAFaire(x,y,tabmap){
    let indiceTab = getIndiceByCoords(x,y);
    console.log(tabmap);

    if(tabmap[indiceTab.i][indiceTab.j] instanceof Parcelle === true && tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === false && tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === false ){
        tabmap[indiceTab.i][indiceTab.j].launchParceterre(indiceTab.i, indiceTab.j);
        Map1.afficherMap(canvas);
        return;
    }

    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/dirt.png"){
        //tabmap[indiceTab.i][indiceTab.j].launchRoad(indiceTab.i, indiceTab.j);
        dirtToRoutes_intelligent(indiceTab.i, indiceTab.j);
        Map1.afficherMap(canvas);
        return;
    }

    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/road.png"){
        //tabmap[indiceTab.i][indiceTab.j].launchPousse(indiceTab.i, indiceTab.j);
        //Map1.afficherMap(canvas);
        memoire.x = indiceTab.i;
        memoire.y = indiceTab.j;
        return;
    }


    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true){
        recolte_intelligente(indiceTab.i, indiceTab.j);
        Map1.afficherMap(canvas);
        return;
    }
}

function getIndiceByCoords(x,y){
    return {
        i:Math.ceil(x/coeffDivX)-1,
        j:Math.ceil(y/coeffDivY)-1
    }
}

// fonction delay de i seconde
function wait(i) {
    setTimeout(function () {
    }, 1000 * i);
}

function poussePlante1(x, y, g) {
    setTimeout(function(){
        poussePlante2(x, y, g);
    }, g.growTime/4);
    Map1.afficherMap(canvas);
}

function poussePlante2(x, y, g) {
    setTimeout(function(){
        poussePlante3(x, y, g);
    }, g.growTime/4);
    Map1.tabMap[x][y].appearance = "./../img/champs/road_debut.png";
    Map1.afficherMap(canvas);
}

function poussePlante3(x, y, g) {
    setTimeout(function(){
        poussePlante4(x, y, g);
    }, g.growTime/4);
    Map1.tabMap[x][y].appearance = "./../img/champs/road_fin.png";
    Map1.afficherMap(canvas);
}

function poussePlante4(x, y, g) {
    if(g.name == "salade") {
        Map1.tabMap[x][y].appearance = "./../img/champs/salade.png";
        Map1.tabMap[x][y].recoltable = true;
        Map1.afficherMap(canvas);
        return;
    }
    else if(g.name == "tournesol"){
        Map1.tabMap[x][y].appearance = "./../img/champs/tournesol.png";
        Map1.afficherMap(canvas);
        Map1.tabMap[x][y].recoltable = true;
        return;
    }
    else if(g.name == "ble"){
        Map1.tabMap[x][y].appearance = "./../img/champs/ble.png";
        Map1.afficherMap(canvas);
        Map1.tabMap[x][y].recoltable = true;
        return;
    }
    else if(g.name == "carotte"){
        Map1.tabMap[x][y].appearance = "./../img/champs/carotte.png";
        Map1.afficherMap(canvas);
        Map1.tabMap[x][y].recoltable = true;
        return;
    }
}

function graine_select(name){
    switch(name){
        case 1 :
            graine = player.salade;
            break;
        case 4 :
            graine = player.tournesol;
            break;
        case 3 :
            graine = player.ble;
            break;
        case 2 :
            graine = player.carotte;
            break;
    }
    console.log(graine);
}

function eau(){
    if(memoire.x != 50)
        Map1.tabMap[memoire.x][memoire.y].launchPousse(memoire.x, memoire.y);
    else
        return;
}


function recolte_intelligente(x,y){
    if(Map1.tabMap[x][y].recoltable === true){
        //ajouter sprite machine recolte sur la case
        Map1.tabMap[x][y].recolte(x,y);
        Map1.afficherMap(canvas);

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
                //recolte_intelligente(i,j);// Lance l'algo recolte auto sur la première parcelle compatible ||| doit vérif si arbre ou plant pour mettre le bon png
                    //ajouter sprite machine recolte sur la case
                    Map1.tabMap[i][j].recolte(i,j);
                    Map1.afficherMap(canvas);
                    c = 1;
            }}
            if(Map1.tabMap[i][j] instanceof ParceTerre && Map1.tabMap[i][j].apparance === "./../img/dirt.png" && c === 0){
                Map1.tabMap[i][j].launchRoad(i,j);// Lance l'algo de tracage de routes sur la première case compatible
                Map1.afficherMap(canvas);
            }
        }
    }
}