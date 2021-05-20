class inventaire extends joueur{
    constructor(pseudo) {
        super(pseudo);
    // Graines :
        this.patate = {name : "patate", type : "graine", prix : 50, nb_poss : 2, growTime : 500};
        this.salade = {name : "salade", type : "graine", prix : 80, nb_poss : 0, growTime : 50};
        this.carotte = {name : "carotte", type : "graine", prix : 100, nb_poss : 0, growTime : 50};
        this.pomme = {name : "pomme", type : "graine", prix : 150, nb_poss : 0, growTime : 50};
        this.tournesol = {name : "tournesol", type : "graine", prix : 200, nb_poss : 0, growTime : 50};
        this.blé = {name : "blé", type : "graine", prix : 200,  nb_poss : 0, growTime : 50};
    // Recoltés :
        this.patatef = {name : "patatef", type : "finie", nb_poss : 0};
        this.saladef = {name : "saladef", type : "finie", nb_poss : 0};
        this.carottef = {name : "carottef", type : "finie", nb_poss : 0};
        this.pommef = {name : "pommef", type : "finie", nb_poss : 0};
        this.tournesolf = {name : "tournesolf", type : "finie", nb_poss : 0};
        this.bléf = {name : "blé", type : "finief",  nb_poss : 0};
    // Autres :
        this.tracteur = {name : "tracteur", type : "install", prix : 0,  nb_poss : 1}
        this.laboureur = {name : "laboureur", type : "install", prix : 0,  nb_poss : 0}
        this.tracteur_silencieux = {name : "fractor", type : "install", prix : 3000,  nb_poss : 0};
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
            case "blé" :
                this.blé.nb_poss += nb;
                if(acheter)
                    this.set_Solde_down(this.blé.prix, nb);
                break;
            case "fractor" :
                if(super.get_Solde() >= this.tracteur_silencieux.prix * nb){
                    super.set_Solde_down(this.tracteur_silencieux.prix, nb);
                    this.tracteur_silencieux +=1;}
                else console.log("Fonds insuffisants");
        }
    }
    Ajouter_Obj_Recolté(nom, nb){
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
            case "blé" :
                this.bléf.nb_poss += nb;
                break;
        }
    }
// Supprimer et/ou vendre
    Supp_Obj_Récolté(nom, nb, vendre){
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
            case "bléf" :
                this.bléf.nb_poss -= nb;
                if(vendre)
                    this.set_Solde_up(this.blé.prix/2, nb);
                break;
        }
    }
}