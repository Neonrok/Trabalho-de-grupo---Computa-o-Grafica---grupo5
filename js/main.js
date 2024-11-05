import * as NS from "./models/registroPontos.js";

let wid = 600;
let hei = 450;

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
    let addArc = {z, x, y};
    arca.push(addArc);
    console.log(addArc, arca);
}
mapCordsX();
mapCordsY();
sav();
arca.splice(0, 1);


const test = c.addEventListener('click', function(){sav();})

let cav = c.getContext("2d");



