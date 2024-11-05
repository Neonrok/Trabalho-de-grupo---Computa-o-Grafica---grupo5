import * as arc from "./models/registroPontos.js";

let wid = 600;
let hei = 450;

let x = 0;
let y = 0;
//let arca = [];

let c = document.querySelector(".cava");
c.width = wid;
c.height = hei;

//éstas funções servem apenas para desmontar alguns processoa para que possam ser reutilizados
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
const sav = function(x, y){
    
    let addArc = new arc(z, x, y)

}


let cav = c.getContext("2d");


