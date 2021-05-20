const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


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
        if (counter!=0){
            //canvas.Children.Clear();
        }
        
        let imgHerbe = new Image();
        let imgTerre = new Image();
        let imgPousse1 = new Image();
        let imgPousse2 = new Image();
        let imgPousse3 = new Image();

        for (let i = 0; i < this.longueur; i++) {
            for (let j = 0; j < this.largeur; j++) {
                if(this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParceTerre === false && this.tabMap[i][j] instanceof ParcePousse === false){
                    imgHerbe = new Image();
                    imgHerbe.src = './../img/grass.png';
                    imgHerbe.onload = function(){
                        context.drawImage(imgHerbe, i*80, j*60,79,59);
                    }
                }
                else if(this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParceTerre === true){
                    console.log('terre built');
                    imgTerre = new Image();
                    imgTerre.src='./../img/dirt.png';
                    imgHerbe.onload = function(){
                        context.drawImage(imgTerre, i*80, j*60,79,59);
                    }
                }
                else if(this.tabMap[i][j] instanceof Parcelle === true && this.tabMap[i][j] instanceof ParcePousse === true){
                    imgPousse1 = new Image();
                    imgPousse2 = new Image();
                    imgPousse3 = new Image();
                    imgPousse1.src='';
                    imgPousse2.src='';
                    imgPousse3.src='';
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
    launchParceterre(parcelle){
                                                                                                        /*
                                                                                                           ANIMATION LABOUREUR
                                                                                                         */
        wait(0.5);
        parcelle = new ParceTerre();                    // a la place de cliquer sur la terre et ça launchPousse, il faudrai que sa pop up les graines où nb_poss > 0 et addeventlistener sur tt les graines, qui click=> launchpousse et comme ça la tu recup grainechoisie
        parcelle.addEventListener(click =>{

        })
    }
    afficherParcelle(indiceX, indiceY, map) {
        //map.tabMap[indiceX][indiceY]
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class ParceTerre extends Parcelle {
    constructor(player) {
        super(player);
        this.appearance = 'terre.png';
        this.plantable = true;
    }

    launchPousse(graine, parcelledeterre) {
                                                                                                        /*
                                                                                                            ANIMATION TRACTEUR
                                                                                                         */
        wait(0.5);
        parcelledeterre = new ParcePousse(graine, parcelledeterre, this.player);
        parcelledeterre.addEventListener(click =>{                                  // Il faut arroser avant pousseplante limite clicker sur un arrosoir qui lui addevent pousseplante
            poussePlante1(parcelledeterre);
        })
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

class ParcePousse extends Parcelle {
    constructor(graine, parcelle) {
        super(1,1);
        this.graineChoisie = graine;
        this.eau = 100;
        this.datecom = 0;
        this.pousseFinie = false;
        this.timerPousse = 0;
  
        if (parcelle.plantable == true) {
            switch(this.graineChoisie.name){
                case "patate" :
                    parcelle.appearance = "pousse_patate.png"
                    break;
                case "salade" :
                    parcelle.appearance = "pousse_salade.png"
                    break;
                case "carotte" :
                    parcelle.appearance = "pousse_carotte.png"
                    break;
                case "pomme" :
                    parcelle.appearance = "pousse_pomme.png"
                    break;
                case "tournesol" :
                    parcelle.appearance = "pousse_tournesol.png"
                    break;
                case "ble" :
                    parcelle.appearance = "pousse_ble.png"
                    break;
            }
        }
        else {
            console.log("Vous ne pouvez pas planter sur cette case");
        }
    }

     poussePlante(parcellequipousse) {// decouper en 3 fonctions pour chaque png de la pousse avec settimeout;
        setTimeout(this.recolte(), this.timerPousse);
        this.datecom = Date();
        while (this.timerPousse < this.player.graineChoisie.growTime && this.pousseFinie == false) { // Si le timer est inferieur au temps de pousse
            if(Date() == Date())
                // à moitie pousse : stopper tant quil a pas mis dengrais
                // puis dès que tu mets l'eau => la t'as le png du plant bien gechar et tu sors direct du while pour recolter
                wait(i);
            this.timerPousse++;
        }
        this.pousseFinie = true;
        parcellequipousse.recolte(parcellequipousse); // Appel de la fonction qui change l'image de la parcelle et donne les recompenses
    }

    launchRedirt(Parcepouss){
        Parcepouss = new ParceTerre();
    }

    recolte(parcellePrete) {
        if (this.pousseFinie == true) {
            this.appearance = 'poussesFinies.png'

            parcellePrete.onclick = function () {
                this.player.Ajouter_Obj_Recolte(graineChoisie.name, graineChoisie.nb_recolte); // ajoute le produit fini à l'inventaire
                console.log("recolte effectuee, Vous avez gagne  = " + this.player.solde);
                wait(1);
                this.launchRedirt();
            }; // Donne de l'argent et les ressources au joueur (classe Player) au moment du clic sur la parcelle passee en parametre
        }
    }
}

function testActionAFaire(x,y,tabmap){
    let indiceTab = getIndiceByCoords(x,y);
    console.log(tabmap);


    if(tabmap[indiceTab.i][indiceTab.j] instanceof Parcelle === true && tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === false && tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === false ){
        tabmap[indiceTab.i][indiceTab.j] = new ParceTerre(player);
        counter++;
        Map1.afficherMap(canvas);
    }

    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParceTerre === true){
        
    }
    
    
    if(tabmap[indiceTab.i][indiceTab.j] instanceof ParcePousse === true){
        
    }
}

function getIndiceByCoords(x,y){
    return {
        i:Math.ceil(x/80)-1,
        j:Math.ceil(y/60)-1
    }
}

// fonction delay de i seconde
function wait(i) {
    setTimeout(function () {
    }, 1000 * i);
}

let time;
function poussePlante1(parcellequipousse){
    time = setTimeout(poussePlante2(parcellequipousse), parcellequipousse.graineChoisie.timerPousse / 3);
    parcellequipousse.appearance = "pousse1.png";
}

function poussePlante2(parcellequipousse){
    clearTimeout(time);
    time = setTimeout(poussePlante3(parcellequipousse), parcellequipousse.graineChoisie.timerPousse / 3);
    parcellequipousse.appearance = "pousse2.png";
}

function poussePlante3(parcellequipousse){
    clearTimeout(time);
    setTimeout(parcellequipousse.recolte(parcellequipousse), parcellequipousse.graineChoisie.timerPousse / 3);
    parcellequipousse.appearance = "pousse3.png";
}
