import * as NS from "./models/registroPontos.js";
//funões com valores que podem ser alterados
let wid = 600;
let hei = 450;
let r=10

//funções com valores que não podem ser alterados
let x = 0;
let y = 0;
let arca = [];

let c = document.querySelector(".cava");
c.width = wid;
c.height = hei; 

//èstas funções servem apenas para desmontar alguns processoa para que possam ser reutilizados
const mapCordsX = function(){
    c.addEventListener('click', e => {
        x = e.offsetX;
    });
    return x;
};
const mapCordsY = function(){
    c.addEventListener('click', e => {
        y = e.offsetY; 
    });
    return y;
};
const sav = function(){
    let z = arca.length;
    x = mapCordsX();
    y = mapCordsY();
    let addArc = {x, y};
    arca.push(addArc);
    console.log(addArc, arca);
}

const DrawPoint = function(mX, mY){
    const grad=cav.createLinearGradient(mX-r,mY-r, mX+r,mY-r);
    grad.addColorStop(0, "lightblue");
    grad.addColorStop(1, "darkblue");
    cav.fillStyle=grad;
    cav.beginPath();
    cav.arc(mX,mY,r,0,2*Math.PI);
    cav.fill()
    cav.stroke();
    //drawLine()
}

//não sei o porquê mas quando inicio estas funções as cordenadas aparecem como 0 na primeira vex por isso isto
mapCordsX();
mapCordsY();
sav();
arca.splice(0, 1);
//-----------------------

let cav = c.getContext("2d");

const test = c.addEventListener('click', function(){
    sav();
    cav.clearRect(0, 0, wid, hei);
    for(let cot = 0; cot < arca.length; cot++){
        x=arca[cot].x;
        y=arca[cot].y;
        DrawPoint(x, y);
    };
    x=0;
    y=0;
})






