const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let coeffDivX = canvas.width/8;
let coeffDivY = canvas.height/6;

class Map {
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

    afficherMap(canvas) {

        for (let i = 0; i < this.longueur; i++) {
            for (let j = 0; j < this.largeur; j++) {
                if (this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParceTerre === false && this.tabMap[i][j] instanceof ParcePousse === false) {
                    let imgHerbe = new Image();
                    imgHerbe.src = './../img/grass.png';
                    imgHerbe.onload = function () {
                        context.drawImage(imgHerbe, i * coeffDivX, j * coeffDivY, coeffDivX, coeffDivY);
                    }
                } else if (this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParceTerre === true) {
                    console.log('terre built');
                    let imgTerre = new Image();
                    imgTerre.src = this.tabMap[i][j].apparance;
                    imgTerre.onload = function () {
                        context.drawImage(imgTerre, i * coeffDivX, j * coeffDivY, coeffDivX, coeffDivY);
                    }
                } else if (this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParcePousse === true) {
                    let imgPousse = new Image();
                    imgPousse.src = this.tabMap[i][j].appearance;
                    imgPousse.onload = function () {
                        context.drawImage(imgPousse, i * coeffDivX, j * coeffDivY, coeffDivX, coeffDivY);
                    }
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
        this.recoltable = false;
        this.player = player;
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class ParceTerre extends Parcelle {
    constructor(verger, x, y) {
        super();
        this.plantable = true;
        this.recoltable = false;
        if(verger === true)
            this.apparance = "./../img/orchard.png";
        else
            this.apparance = "./../img/dirt.png";
    }

    launchRoad(x, y){
        this.apparance = "./../img/road.png";
        Map1.afficherMap(canvas);
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class ParcePousse extends Parcelle {
    constructor(x, y, g) {
        super(1, 1);
        this.appearance = "./../img/champs/graine.png";
        this.recoltable = false;
        this.graine = g;
    }

    launchPousse(x, y) {
        if(graine.name!== undefined && Map1.tabMap[x][y] instanceof ParcePousse === true && Map1.tabMap[x][y].appearance == "./../img/champs/graine.png"){
            memoire.x = 50;
            memoire.y = 50;
            player.set_Solde_down(this.graine.prix); // Fait baisser le solde du joueuer en fonction du prix de la graine et actualise
            poussePlante1(x, y, this.graine);
        }
    }

    recolte(x, y) {
        Map1.tabMap[x][y] = new ParceTerre();
        Map1.afficherMap(canvas);
        player.set_Solde_up(300);
    }
}

function testActionAFaire(x,y,tabmap){
    let indiceTab = getIndiceByCoords(x,y);

    if(tabmap[indiceTab.i][indiceTab.j] instanceof Parcelle === true && tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === false && tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === false ){
        Map1.tabMap[indiceTab.i][indiceTab.j] = new ParceTerre(verger, indiceTab.i, indiceTab.j);
        Map1.afficherMap(canvas);
        return;
    }

    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/dirt.png"){
        //tabmap[indiceTab.i][indiceTab.j].launchRoad(indiceTab.i, indiceTab.j);
        memoire.x = indiceTab.i;
        memoire.y = indiceTab.j;
        Map1.afficherMap(canvas);
        return;
    }
    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/orchard.png" || tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/oranger.png" || tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/pommier.png"){
        memoire.x = indiceTab.i;
        memoire.y = indiceTab.j;
        Map1.afficherMap(canvas);
        return;
    }

    if((tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/road.png") || (tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/dirt.png") || (tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/carotte.png") || (tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/ble.png") || (tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/salade.png") || (tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/tournesol.png") || (tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true && tabmap[indiceTab.i][indiceTab.j].apparance == "./../img/champs/graine.png")){
        memoire.x = indiceTab.i;
        memoire.y = indiceTab.j;
        return;
    }


    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true){
        memoire.x = indiceTab.i;
        memoire.y = indiceTab.j;
        return;
    }
}

function getIndiceByCoords(x,y){
    return {
        i:Math.ceil(x/coeffDivX)-1,
        j:Math.ceil(y/coeffDivY)-1
    }
}

function poussePlante1(x, y, g) {
    setTimeout(function(){
        poussePlante2(x, y, g);
    }, g.growTime/4);
    Map1.tabMap[x][y].appearance = "./../img/champs/road_debut.png";
    Map1.afficherMap(canvas);
}

function poussePlante2(x, y, g) {
    setTimeout(function(){
        poussePlante3(x, y, g);
    }, g.growTime/4);
    Map1.tabMap[x][y].appearance = "./../img/champs/road_millieu.png";
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
}

function eau(){
    if(memoire.x != 50)
        arrosage_intelligent(memoire.x, memoire.y);
        //Map1.tabMap[memoire.x][memoire.y].launchPousse(memoire.x, memoire.y);
    else
        return;
    Map1.afficherMap(canvas);
}

function verger_ou_dirt(is, x, y){
    verger = is;
    if(Map1.tabMap[x][y] !== undefined && Map1.tabMap[x][y] instanceof ParceTerre){
        if(is)
            Map1.tabMap[x][y].apparance = './../img/orchard.png';
        else
            Map1.tabMap[x][y].apparance = './../img/dirt.png';
        Map1.afficherMap(canvas);
    }
}

function planteArbre(type, x, y) {
    if(type === 'oranger'){
        setTimeout(function () {
            Map1.tabMap[x][y].apparance = './../img/champs/oranger.png';
            Map1.afficherMap(canvas);
            player.set_Solde_down(50);
        }, 8000);
    }
    else if(type === 'pommier'){
        setTimeout(function () {
            Map1.tabMap[x][y].apparance = './../img/champs/pommier.png';
            Map1.afficherMap(canvas);
            player.set_Solde_down(50);
        }, 8000);
    }
}

function recolte_Arbre(x, y) {
    if(Map1.tabMap[x][y].apparance === './../img/champs/pommier.png' || Map1.tabMap[x][y].apparance === './../img/champs/oranger.png'){
        setTimeout(function () {
            Map1.tabMap[x][y].apparance = './../img/orchard.png';
            Map1.afficherMap(canvas);
            player.set_Solde_up(400);
        }, 3000);

        let robot = new Image();
        robot.src = './../img/machine/robot.png';
        robot.onload = function(){
            context.drawImage(robot, x * coeffDivX, y * coeffDivY, coeffDivX, coeffDivY);
        };
        player.set_Solde_down(30);
    }
}
