function animation(png, x, y, texture, g){
    setTimeout(function(){
        anim1(png, x, y, texture, g);
    }, 350);
    let imgMachine1 = new Image();
    imgMachine1.src= png;
    imgMachine1.onload = function(){
        context.drawImage(imgMachine1, x*(coeffDivX),y*(coeffDivY),coeffDivX/2,coeffDivY/2);
    }
}

function anim1(png, x, y, texture, g){
    setTimeout(function(){
        anim2(png, x, y, texture, g);
    }, 350);

    let imgHerbe = new Image();
    imgHerbe.src = texture;
    imgHerbe.onload = function(){
        context.drawImage(imgHerbe, x*(coeffDivX),y*(coeffDivY),coeffDivX/2,coeffDivY/2);
    }
    let imgMachine2 = new Image();
    imgMachine2.src= png;
    imgMachine2.onload = function(){
        context.drawImage(imgMachine2, (x+x+1)*(coeffDivX/2),y*(coeffDivY) ,coeffDivX/2,coeffDivY/2);
    }
}
function anim2(png, x, y, texture, g){
    setTimeout(function(){
        anim3(png, x, y, texture, g);
    }, 350);

    let imgHerbe = new Image();
    imgHerbe.src = texture;
    imgHerbe.onload = function(){
        context.drawImage(imgHerbe, x*(coeffDivX),y*(coeffDivY),coeffDivX/2,coeffDivY/2);
        context.drawImage(imgHerbe, (x+x+1)*(coeffDivX/2),y*(coeffDivY) ,coeffDivX/2,coeffDivY/2);
    }
    let imgMachine3 = new Image();
    imgMachine3.src= png;
    imgMachine3.onload = function(){
        context.drawImage(imgMachine3, x*(coeffDivX),y*(coeffDivY)+coeffDivY/2,coeffDivY/2 ,coeffDivY/2);
    }
}
function anim3(png, x, y, texture, g){

    /* DIRT ROUTE*/
    if(png === './../img/machine/sillonner.png'){
        setTimeout(function(){
            Map1.tabMap[x][y].launchRoad(x, y);
        }, 350);

        if((x+1) <= nbCaseX &&  Map1.tabMap[x+1][y].apparance !== undefined){
            if(Map1.tabMap[x+1][y] instanceof ParceTerre && Map1.tabMap[x+1][y].apparance === "./../img/dirt.png"){ // test les cases adjacentes
                setTimeout(function () {
                    dirtToRoutes_intelligent(x+1,y);
                }, 350);
            }
        }
        if((x-1) >= 0){
            if(Map1.tabMap[x-1][y] instanceof ParceTerre && Map1.tabMap[x-1][y].apparance === "./../img/dirt.png"){
                setTimeout(function () {
                    dirtToRoutes_intelligent(x-1,y);
                }, 350);
            }
        }
        if((y-1) >= 0){
            if(Map1.tabMap[x][y-1] instanceof ParceTerre && Map1.tabMap[x][y-1].apparance === "./../img/dirt.png"){
                setTimeout(function () {
                    dirtToRoutes_intelligent(x,y-1);
                }, 350);
            }
        }
        if((y+1) <= nbCaseY){
            if(Map1.tabMap[x][y+1] instanceof ParceTerre && Map1.tabMap[x][y+1].apparance === "./../img/dirt.png"){
                setTimeout(function () {
                    dirtToRoutes_intelligent(x,y+1);
                }, 350);
            }
        }
    }

    /* RECOLTE */
    if(png === './../img/machine/moissonneuse.png'){
        setTimeout(function(){
            Map1.tabMap[x][y].recolte(x, y);
        }, 350);

        if(Map1.tabMap[x+1][y].recoltable !== undefined && Map1.tabMap[x+1][y].recoltable === true){ // test les cases adjacentes
            setTimeout(function () {
                recolte_intelligente(x+1,y);
            }, 350);
        }
        if((x-1)>0){
            if(Map1.tabMap[x-1][y].recoltable !== undefined && Map1.tabMap[x-1][y].recoltable === true){
                setTimeout(function () {
                    recolte_intelligente(x-1,y);
                }, 350);
            }
        }
        if((y-1)>0){
            if(Map1.tabMap[x][y-1].recoltable !== undefined && Map1.tabMap[x][y-1].recoltable === true){
                setTimeout(function () {
                    recolte_intelligente(x,y-1);
                }, 350);
            }
        }
        if(Map1.tabMap[x][y+1].recoltable !== undefined && Map1.tabMap[x][y+1].recoltable === true){
            setTimeout(function () {
                recolte_intelligente(x,y+1);
            }, 350);
        }
    }

    /* SEMER GRAINE*/
    if(png === './../img/machine/semer.png'){
        setTimeout(function () {
            Map1.tabMap[x][y] = new ParcePousse(x, y, g);
            Map1.afficherMap(canvas);
        }, 350);


        if((x+1) <= nbCaseX){
            if(Map1.tabMap[x+1][y] instanceof ParceTerre && Map1.tabMap[x+1][y].apparance === "./../img/road.png"){ // test les cases adjacentes
                setTimeout(function () {
                    semer(x+1,y);
                }, 350);
            }
        }
        if((x-1) >= 0){
            if(Map1.tabMap[x-1][y] instanceof ParceTerre && Map1.tabMap[x-1][y].apparance === "./../img/road.png"){
                setTimeout(function () {
                    semer(x-1,y);
                }, 350);
            }
        }
        if((y-1) >= 0){
            if(Map1.tabMap[x][y-1] instanceof ParceTerre && Map1.tabMap[x][y-1].apparance === "./../img/road.png"){
                setTimeout(function () {
                    semer(x,y-1);
                }, 350);            }
        }
        if((y+1) <= nbCaseY){
            if(Map1.tabMap[x][y+1] instanceof ParceTerre && Map1.tabMap[x][y+1].apparance === "./../img/road.png"){
                setTimeout(function () {
                    semer(x,y+1);
                }, 350);            }
        }
    }

    /* ARROSER */
    if(png === './../img/machine/arroser.png'){
        setTimeout(function () {
            Map1.tabMap[x][y].launchPousse(x, y);
            Map1.afficherMap(canvas);
        }, 350);


        if((x+1) <= nbCaseX){
            if(Map1.tabMap[x+1][y] instanceof ParcePousse && Map1.tabMap[x+1][y].appearance === "./../img/champs/graine.png"){
                setTimeout(function () {
                    arrosage_intelligent(x+1,y);
                }, 350);
                console.log("x+1");
            }
        }
        if((x-1) >= 0){
            if(Map1.tabMap[x-1][y] instanceof ParcePousse && Map1.tabMap[x-1][y].appearance === "./../img/champs/graine.png"){
                setTimeout(function () {
                    arrosage_intelligent(x-1,y);
                }, 350);
                console.log("x-1");
            }
        }
        if((y-1) >= 0){
            if(Map1.tabMap[x][y-1] instanceof ParcePousse && Map1.tabMap[x][y-1].appearance === "./../img/champs/graine.png"){
                setTimeout(function () {
                    arrosage_intelligent(x,y-1);
                }, 350);
                console.log("y-1");
            }
        }
        if((y+1) <= nbCaseY){
            if(Map1.tabMap[x][y+1] instanceof ParcePousse && Map1.tabMap[x][y+1].appearance === "./../img/champs/graine.png"){
                setTimeout(function () {
                    arrosage_intelligent(x,y+1);
                }, 350);
                console.log("y+1");
            }
        }
    }

    let imgHerbe = new Image();
    imgHerbe.src = texture;
    imgHerbe.onload = function(){
        context.drawImage(imgHerbe, x*(coeffDivX),y*(coeffDivY),coeffDivX/2,coeffDivY/2);
        context.drawImage(imgHerbe, (x+x+1)*(coeffDivX/2),y*(coeffDivY) ,coeffDivX/2,coeffDivY/2);
        context.drawImage(imgHerbe, x*(coeffDivX),y*(coeffDivY)+coeffDivY/2,coeffDivY/2 ,coeffDivY/2);
    }

    let imgMachine4 = new Image();
    imgMachine4.src= png;
    imgMachine4.onload = function(){
        context.drawImage(imgMachine4, (x+x+1)*(coeffDivX/2),y*(coeffDivY)+coeffDivY/2 ,coeffDivX/2,coeffDivY/2);
    }
}