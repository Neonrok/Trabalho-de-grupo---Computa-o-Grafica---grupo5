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
let curv = [];
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
//para desenhar os pontos
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
//desenhar as ligações dos pontos
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
//começa a confusão para fazer curvas
const movInLines = function(f, xax, yarn, frame){
    frame+=0.005;
    let xS = arca[f].x;
    let yS = arca[f].y;
    cav.beginPath();
    cav.moveTo(xax, yarn);
// x
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
//esta funão é para escalar mas está uma confusão
//P.S. rla é muito grande tem que ser dividida

const partA = function(r, numbers){
    console.log("hi1");
    let NexX
    let Nexy
    let AcRet = [];
    //Está a funcionar
    for (let j = 0; j < r; j++){
        let frame= 0;
        for(let i = j; i < numbers.length-r+1; i+=1+r){
            frame+=0.005
            NexX = numbers[i][0] + ((numbers[i+1][0] - numbers[i][0]) * frame);
            Nexy = numbers[i][1] + ((numbers[i+1][1] - numbers[i][1]) * frame);
            AcRet.push({NexX, Nexy, j});
        };
    };
    return AcRet
};

const creatACurv = function(numbers, s){
    let r = s
    let NexX
    let Nexy
    const intPro = [];
    let intermedio1 = [];
    let intermedio2 = [];
    intPro.push(numbers[0]);
    if (r>0){
        let partA1 = partA(r, numbers);
        intermedio1.push(partA1);
        r--;
    }
    
    //console.log(numbers)
    console.log(r)
    /*
    while(r>1){
        if (intermedio1[0] != undefined){
            for(let i = 0; i < intermedio2.length-1-r; i+=r){
                let frame= 0;
                for(let j=0; j<=r; j++){
                    frame+=0.005
                    NexX=intermedio2[i+j][0]+((intermedio2[i+j+1][0] - intermedio2[i+j][0])*frame);
                    Nexy=intermedio2[i+j][1]+((intermedio2[i+j+1][1] - intermedio2[i+j][1])*frame);
                    intermedio1.push([NexX, Nexy]);
                };
            };
            intermedio2 = []
        }else{
            for(let i = 0; i < intermedio1.length-1-r; i+=r){
                let frame= 0;
                for(let j=0; j<=r; j++){
                    frame+=0.005
                    NexX=intermedio1[i+j][0]+((intermedio1[i+j+1][0] - intermedio1[i+j][0])*frame);
                    Nexy=intermedio1[i+j][1]+((intermedio1[i+j+1][1] - intermedio1[i+j][1])*frame);
                    intermedio2.push([NexX, Nexy]);
                };
            };
            intermedio1 = []
        }
        r--
    };
    */
    console.log(intermedio1);
    if (r === s){
        let frame= 0;
        for (let i = 0; i < numbers.length - 1; i+=2) {
            frame+=0.005
            NexX=numbers[i][0]+((numbers[i+1][0] - numbers[i][0])*frame);
            Nexy=numbers[i][1]+((numbers[i+1][1] - numbers[i][1])*frame);
            intPro.push([NexX, Nexy]);
        }
        console.log("1!")
    } else if(intermedio1 != []){
        let frame= 0;
        for (let i = 0; i < intermedio1.length - 1; i+=2) {
            frame+=0.005
            NexX=intermedio1[i][0]+((intermedio1[i+1][0] - intermedio1[i][0])*frame);
            Nexy=intermedio1[i][1]+((intermedio1[i+1][1] - intermedio1[i][1])*frame);
            intPro.push([NexX, Nexy]);
       }
       console.log("2!")
    } else {
        let frame= 0;
        for (let i = 0; i < intermedio2.length - 1; i+=2) {
            frame+=0.005
            NexX=intermedio2[i][0]+((intermedio2[i+1][0] - intermedio2[i][0])*frame);
            Nexy=intermedio2[i][1]+((intermedio2[i+1][1] - intermedio2[i][1])*frame);
            intPro.push([NexX, Nexy]);
       }
       console.log("3!")
    }
    
    for (let i = 1; i < intPro.length; i++) {
        cav.beginPath();
        cav.moveTo(intPro[i-1][0], intPro[i-1][1]);
        cav.lineTo(intPro[i][0], intPro[i][1]);
        cav.strokeStyle= "blue";
        cav.stroke();
  }
};
//
const animaltion = function(i, xax, yarn, frame){
    const { xa, ya } = movInLines(i, xax, yarn, frame);
    let r =[xa, ya]
    if (frame<=1){
        //enquanto não forem feitos os 200 frames estarão sempre a criar novos frames
        curv.push(r);
        window.requestAnimationFrame(() => animaltion(i, xa, ya, frame + 0.005));
    } else {
        //fim da animação
        frame = 0;
    // será executado quando as animações terminarem se tiver 4 pontos ou mais
        if (i === arca.length-3 && i > 0) {
            console.log(i);
            creatACurv(curv, i);
        }
    };
};

const toMovInvPoint = function(){
    for(let i=0; i+1<=arca.length;i++){
        let p1x = arca[i].x;
        let p1y = arca[i].y;
    };
};

//apartid daqui são apenas funções de interação
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
    curv = []
    cav.clearRect(0, 0, wid, hei);
    render();
    drawLine();
    if (arca.length > 2){
        for(let i = 0; i<arca.length-2;i++){
            let frame = 0
            let xax=arca[i].x;
            let yarn=arca[i].y;
            animaltion(i, xax, yarn, frame);
        };
    } else {
        alert("Erro! Para criar curvas tem que existir pelo menos 3 pontos.");
    }
});
