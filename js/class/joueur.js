class joueur{
    constructor(pseudo) {
        this.pseudo = pseudo;
        this.rendement = 50;
        this.ecologie = 50;
        this.solde = 500; //Solde de départ à modifier, de quoi acheter le nécessaire pour amorcer
    }

    get_Pseudo(){
        return this.pseudo;
    }
    set_Rendement(value){
        this.rendement = value;
    }
    get_Rendement(){
        return this.rendement;
    }
    set_Ecologie(value){
        this.ecologie = value;
    }
    get_Ecologie(){
        return this.ecologie;
    }
    set_Solde_down(value, nb){
        this.solde -= (value * nb);
    }
    set_Solde_up(value, nb){
        this.solde += (value * nb);
    }
    get_Solde(){
        return this.solde;
    }
}