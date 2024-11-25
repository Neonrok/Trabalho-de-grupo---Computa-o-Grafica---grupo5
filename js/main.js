import * as NS from "./models/registroPontos.js";
//funões com valores que podem ser alterados
let wid = 600;
let hei = 450;
let r = 10;
let marge = r*2;

//funções com valores que não podem ser alterados
let x = 0;
let y = 0;
let arca = [];
const Draw = document.getElementById('SDraw');

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
    let l = true;
    x = mapCordsX();
    y = mapCordsY();
    for(let i = 0; i< arca.length; i++){
        if(arca[i].x-marge<x && arca[i].x+marge>x && arca[i].y-marge<y && arca[i].y+marge>y){l = false};
    };
    if (l){
        let addArc = {x, y};
        arca.push(addArc);
        console.log(addArc, arca);
    }
};

const DrawPoint = function(mX, mY){
    const grad=cav.createLinearGradient(mX-r,mY-r, mX+r,mY-r);
    grad.addColorStop(0, "lightblue");
    grad.addColorStop(1, "darkblue");
    cav.fillStyle=grad;
    cav.beginPath();
    cav.arc(mX,mY,r,0,2*Math.PI);
    cav.fill()
    cav.stroke();
};

const render = function(){
    for(let cot = 0; cot < arca.length; cot++){
        x=arca[cot].x;
        y=arca[cot].y;
        DrawPoint(x, y);
    };
};


  const drawLine = function(){
    if (arca.length>=2){
        for(let i=0; i+1<arca.length;i++){
            let p1x = arca[i].x;
            let p1y = arca[i].y;
            let p2x = arca[i+1].x;
            let p2y = arca[i+1].y;
            cav.moveTo(p1x, p1y);
            cav.lineTo(p2x, p2y);
            const grad=cav.createLinearGradient(p1x, p1y, p2x, p2y);
            grad.addColorStop(0, "lightblue");
            grad.addColorStop(1, "darkblue");
            cav.strokeStyle=grad;                    
            cav.stroke();
        }
    }
};

const movInLines = function(f, xax, yarn, frame){
    frame+=0.005;
    let xS = arca[f].x;
    let yS = arca[f].y;
    cav.beginPath();
    cav.moveTo(xax, yarn);
// x
    console.log(frame)
    xS = (1 - frame) **(3-1)* arca[f].x +
    (3-1)* frame * (1 - frame) * arca[f+1].x +
    frame ** (3-1)* arca[f+2].x;
// y
    yS=(1-frame)**(3-1)*arca[f].y+
    (3-1)*frame*(1-frame)*arca[f+1].y+
    frame**(3-1)*arca[f+2].y;
// desenhar
    cav.lineTo(xS, yS);
    cav.strokeStyle= "red";   
    cav.stroke();
    return {xa: xS, ya: yS}
};
const animaltion = function(i, xax, yarn, frame){
    const { xa, ya } = movInLines(i, xax, yarn, frame);
    if (frame<=1){
        window.requestAnimationFrame(() => animaltion(i, xa, ya, frame + 0.005));
    } else {frame = 0};
};

const toMovInvPoint = function(){
    for(let i=0; i+1<=arca.length;i++){
        let p1x = arca[i].x;
        let p1y = arca[i].y;
    };
};

//não sei o porquê mas quando inicio estas funções as cordenadas aparecem como 0 na primeira vex por isso isto
mapCordsX();
mapCordsY();
sav();
arca.splice(0, 1);
//-----------------------

let cav = c.getContext("2d");

//Adicionar o ponto
const toasted = c.addEventListener('click', function(){
    sav();
    cav.clearRect(0, 0, wid, hei);
    render();
    drawLine();
})

//Remover o ponto
const toastoded = c.addEventListener('dblclick', function(){
    x = mapCordsX();
    y = mapCordsY();
    for(let i = 0; i< arca.length; i++){
        if(arca[i].x-marge<x && arca[i].x+marge>x && arca[i].y-marge<y && arca[i].y+marge>y){
            arca.splice(i, 1);
        };
    };
    cav.clearRect(0, 0, wid, hei);
    render()
    drawLine();
})

Draw.addEventListener('click', function(){
    cav.clearRect(0, 0, wid, hei);
    render();
    drawLine();
    for(let i = 0; i<arca.length-2;i++){
        let frame = 0
        let xax=arca[i].x;
        let yarn=arca[i].y;
        animaltion(i, xax, yarn, frame);
    };
})


