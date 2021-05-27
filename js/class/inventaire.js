class inventaire extends joueur{
    constructor(pseudo) {
        super(pseudo);
    // Graines :
        this.patate = {name : "patate", type : "graine", prix : 10, nb_poss : 2, growTime : 3500};
        this.salade = {name : "salade", type : "graine", prix : 10, nb_poss : 0, growTime : 6000};
        this.carotte = {name : "carotte", type : "graine", prix : 10, nb_poss : 0, growTime : 4000};
        this.pomme = {name : "pomme", type : "graine", prix : 20, nb_poss : 0, growTime : 50};
        this.tournesol = {name : "tournesol", type : "graine", prix : 10, nb_poss : 0, growTime : 8000};
        this.ble = {name : "ble", type : "graine", prix : 10,  nb_poss : 0, growTime : 10000};
    // Recoltes :
        this.patatef = {name : "patatef", type : "finie", nb_poss : 0};
        this.saladef = {name : "saladef", type : "finie", nb_poss : 0};
        this.carottef = {name : "carottef", type : "finie", nb_poss : 0};
        this.pommef = {name : "pommef", type : "finie", nb_poss : 0};
        this.tournesolf = {name : "tournesolf", type : "finie", nb_poss : 0};
        this.blef = {name : "ble", type : "finief",  nb_poss : 0};
    }


// Ajouter et/ou acheter
    Ajouter_Obj(nom, nb, acheter){
        switch(nom){
            case "patate" :
                this.patate.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.patate.prix, nb);
                break;
            case "salade" :
                this.salade.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.salade.prix, nb);
                break;
            case "carotte" :
                this.carotte.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.carotte.prix, nb);
                break;
            case "pomme" :
                this.pomme.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.pomme.prix, nb);
                break;
            case "tournesol" :
                this.tournesol.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.tournesol.prix, nb);
                break;
            case "ble" :
                this.ble.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.ble.prix, nb);
                break;
            case "fractor" :
                if(super.get_Solde() >= this.tracteur_silencieux.prix * nb){
                    super.set_Solde_down(this.tracteur_silencieux.prix, nb);
                    this.tracteur_silencieux +=1;}
                else console.log("Fonds insuffisants");
        }
    }
    Ajouter_Obj_Recolte(nom, nb){
        switch(nom){
            case "patate" :
                this.patatef.nb_poss += nb;
                break;
            case "salade" :
                this.saladef.nb_poss += nb;
                break;
            case "carotte" :
                this.carottef.nb_poss += nb;
                break;
            case "pomme" :
                this.pommef.nb_poss += nb;
                break;

            case "tournesol" :
                this.tournesolf.nb_poss += nb;
                break;
            case "ble" :
                this.blef.nb_poss += nb;
                break;
        }
    }
// Supprimer et/ou vendre
    Supp_Obj_Recolte(nom, nb, vendre){
        switch(nom){
            case "patatef" :
                this.patatef.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.patate.prix/2, nb);
                break;
            case "saladef" :
                this.saladef.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.salade.prix/2, nb);
                break;
            case "carottef" :
                this.carottef.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.carotte.prix/2, nb);
                break;
            case "pommef" :
                this.pommef.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.pomme.prix/2, nb);
                break;
            case "tournesolf" :
                this.tournesolf.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.tournesol.prix/2, nb);
                break;
            case "blef" :
                this.blef.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.ble.prix/2, nb);
                break;
        }
    }
}
