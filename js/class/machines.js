function recolte_intelligente(canvas,tabmap,x,y){
    if(tabmap[x][y].recoltable == true){
        //ajouter sprite machine recolte sur la case
        tabmap[x][y].recolte(x,y);

        if(tabmap[x+1][y].recoltable == true){ // test les cases adjacentes
            recolte_intelligente(x+1,y);
        } 
        else if(tabmap[x-1][y].recoltable == true){
            recolte_intelligente(x-1,y);
        }
        else if(tabmap[x][y-1].recoltable == true){
            recolte_intelligente(x,y-1);
        }
        else if(tabmap[x][y+1].recoltable == true){
            recolte_intelligente(x,y)+1;
        }
        else {
            //info : la machine ne peut plus récolter 
        }
    }
}

function arrosage_intelligent(canvas,tabmap,x,y){
 
}