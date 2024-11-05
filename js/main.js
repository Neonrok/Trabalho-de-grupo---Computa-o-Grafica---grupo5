let wid = 600;
let hei = 450;
let x = 0;
let y = 0;

let c = document.querySelector(".cava");
c.width = wid;
c.height = hei;

let cav = c.getContext("2d");

const mapCordsX = function(){
    c.addEventListener('click', e =>{
        x = e.offsetX;
    });
    return x;
};

const mapCordsY = function(){
    c.addEventListener('click', e =>{
        y = e.offsetY;
    });
    return y;
};



