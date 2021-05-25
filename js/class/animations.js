function animation(png, x, y){
    setTimeout(function(){
        anim1(png, x, y);
    }, 1000);
    let imgMachine1 = new Image();
    imgMachine1.src='./../img/machine/tracteur.png';
    imgMachine1.onload = function(){
        context.drawImage(imgMachine1, x*coeffDivX, y*coeffDivY,coeffDivX/2,coeffDivY/2);
    }
    console.log(memoire.x,memoire.y);
}

function anim1(png, x, y){
    setTimeout(function(){
        anim2(png, x, y);
    }, 1000);
    console.log(memoire.x,memoire.y);

    let imgHerbe = new Image();
    imgHerbe.src = './../img/dirt.png';
    imgHerbe.onload = function(){
        context.drawImage(imgHerbe, x*coeffDivX, y*coeffDivY,coeffDivX/2,coeffDivY/2);
    }
    let imgMachine2 = new Image();
    imgMachine2.src= png;
    imgMachine2.onload = function(){
        context.drawImage(imgMachine2, coeffDivX/2, y*coeffDivY ,coeffDivX/2,coeffDivY/2);
    }
}
function anim2(png, x, y){
    setTimeout(function(){
        anim3(png, x, y);
    }, 1000);
    console.log(memoire.x,memoire.y);

    let imgHerbe = new Image();
    imgHerbe.src = './../img/dirt.png';
    imgHerbe.onload = function(){
        context.drawImage(imgHerbe, x*coeffDivX, y*coeffDivY,coeffDivX/2,coeffDivY/2);
        context.drawImage(imgHerbe, coeffDivX/2, y*coeffDivY,coeffDivX/2,coeffDivY/2);
    }
    let imgMachine3 = new Image();
    imgMachine3.src= png;
    imgMachine3.onload = function(){
        context.drawImage(imgMachine3, x*coeffDivX, coeffDivY/2 ,coeffDivX/2,coeffDivY/2);
    }
}
function anim3(png, x, y){
    setTimeout(function(){
        Map1.tabMap[x][y].recolte(x, y);
    }, 1000);
    setTimeout(function(){
        Map1.afficherMap(canvas);
    }, 1005);
    let imgHerbe = new Image();
    imgHerbe.src = './../img/dirt.png';
    imgHerbe.onload = function(){
        context.drawImage(imgHerbe, x*coeffDivX, y*coeffDivY,coeffDivX/2,coeffDivY/2);
        context.drawImage(imgHerbe, coeffDivX/2, y*coeffDivY,coeffDivX/2,coeffDivY/2);
        context.drawImage(imgHerbe, x*coeffDivX, coeffDivY/2,coeffDivX/2,coeffDivY/2);
    }
    console.log(memoire.x,memoire.y);

    let imgMachine4 = new Image();
    imgMachine4.src= png;
    imgMachine4.onload = function(){
        context.drawImage(imgMachine4, coeffDivX/2, coeffDivY/2 ,coeffDivX/2,coeffDivY/2);
    }
}


