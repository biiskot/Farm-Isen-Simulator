class joueur{
    constructor(pseudo) {
        this.pseudo = pseudo;
        this.rendement = 50;
        this.ecologie = 50;
        this.solde = 2500; //Solde de départ à modifier, de quoi acheter le nécessaire pour amorcer
    }

    get_Pseudo(){
        return this.pseudo;
    }
    set_Solde_down(value){
        this.solde -= value;
        displayCoinBalance();
    }
    set_Solde_up(value){
        this.solde += value;
        displayCoinBalance();
    }
    get_Solde(){
        displayCoinBalance();
        return this.solde;
    }
}

function displayCoinBalance(){
    let baliseSolde = document.getElementById('coins');
    let soldetxt = document.getElementById('soldepieces');
    let imgCoin = new Image();

    imgCoin.src = './../img/goldcoin.png'
    imgCoin.width = '25';
    imgCoin.height = '25';

    soldetxt.innerHTML = "<img height='20' width='20' src='./../img/goldcoin.png'>" + player.solde;

}
