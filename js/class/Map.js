const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let coeffDivX = 150;
let coeffDivY = 1000/6;

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

    getTabMap(){
        return this.tabMap;
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
    
    }

}
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class Parcelle {
    //Attributs d'une parcelle :

    constructor(player) {
        this.appearance = 'herbe.png';
        this.plantable = false;
        this.player = player;    }


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
    }

    launchRoad(x, y){
        this.apparance = "./../img/road.png";
    }

    launchPousse(x, y) {
        /*
            ANIMATION TRACTEUR
         */
        console.log("g", graine, "xy", memoire.x, memoire.y);
        if(graine!= "" && Map1.tabMap[memoire.x][memoire.y] instanceof ParceTerre === true && Map1.tabMap[memoire.x][memoire.y].apparance == "./../img/road.png"){
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
        counter++;
        Map1.afficherMap(canvas);
        return;
    }

    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/dirt.png"){
        tabmap[indiceTab.i][indiceTab.j].launchRoad(indiceTab.i, indiceTab.j);
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
        tabmap[indiceTab.i][indiceTab.j].recolte(indiceTab.i, indiceTab.j);
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
        Map1.afficherMap(canvas);
        return;
    }
    else if(g.name == "tournesol"){
        Map1.tabMap[x][y].appearance = "./../img/champs/tournesol.png";
        Map1.afficherMap(canvas);
        return;
    }
    else if(g.name == "ble"){
        Map1.tabMap[x][y].appearance = "./../img/champs/ble.png";
        Map1.afficherMap(canvas);
        return;
    }
    else if(g.name == "carotte"){
        Map1.tabMap[x][y].appearance = "./../img/champs/carotte.png";
        Map1.afficherMap(canvas);
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