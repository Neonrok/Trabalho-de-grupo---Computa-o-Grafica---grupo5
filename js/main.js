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
let icon=document.getElementById("icon")
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
    return {xa: xS, ya: yS, Far: f};
};
//estas funõesmservem para resolver os problemas de escalada
const partA = function(s, Nota){
    console.log("hi2");
    let r = s;
    let Part= partB(r, Nota);
    while(r>1){
        Part = PartC(Part, r);
        r--;
        console.log(Part, "ff")
    };
    
    return Part;
};
const partB = function(r, numbers){
    console.log("hi1");
    let NexX
    let Nexy
    let AcRet = [];
    console.log(numbers.length);
    console.log(r);
    for (let j = 0; j <= r; j++){
        for(let i = 0; i < numbers.length; i++){
            if(numbers[i][2] == numbers[j][2]){
                NexX = numbers[i][0];
                Nexy = numbers[i][1];
                AcRet.push([NexX, Nexy]);
            };
        };
    };
    return AcRet
};
const PartC = function(P, r){
    let Lor = P
    let Ret = []
    let NexX
    let Nexy
    for(let j=0; j<=r-1; j++){
        let frame= 0;
        for(let i = 0; i<P.length/(r+1); i++){
            frame+=0.005
            NexX=Lor[i+(j*200)][0]+((Lor[i+(j*200)+200][0] - Lor[i+(j*200)][0])*frame);
            Nexy=Lor[i+(j*200)][1]+((Lor[i+(j*200)+200][1] - Lor[i+(j*200)][1])*frame);
            Ret.push([NexX, Nexy]);
        };
    };
    return Ret
};

const AnimaFin = function(intPro, i, frame){
    if(frame<=1){
        i++;
        AnimaFin1(intPro, i)
        window.requestAnimationFrame(() => AnimaFin(intPro, i, frame));
        frame+=0.005;
    }
    if(frame>1){
        icon.src="./Icons/play-button-arrowhead.png"
    }
};
const AnimaFin1 = function(intPro, i){
    cav.beginPath();
    cav.moveTo(intPro[i-1][0], intPro[i-1][1]);
    cav.lineTo(intPro[i][0], intPro[i][1]);
    cav.strokeStyle= "blue";
    cav.stroke();
    console.log("ola2")
};

const creatACurv = function(numbers, s){
    let r = s;
    let NexX;
    let Nexy;
    let Fr= 0;
    let pi= 0;
    const intPro = [];
    let intermedio = [];
    intPro.push(numbers[0]);
    //A parteA serve para organizar os valores e dininuir
    if (r>1){
        intermedio = partA(r, numbers);
        r--;
    };
    if (r === s){
        let frame= 0;
        for (let i = 0; i < numbers.length - 1; i+=2) {
            frame+=0.005
            NexX=numbers[i][0]+((numbers[i+1][0] - numbers[i][0])*frame);
            Nexy=numbers[i][1]+((numbers[i+1][1] - numbers[i][1])*frame);
            NexX=Math.floor(NexX);
            Nexy=Math.floor(Nexy);
            intPro.push([NexX, Nexy]);
        };
    } else {
        let frame= 0;
        for (let i = 0; i < intermedio.length/2; i++) {
            frame+=0.005
            NexX=intermedio[i][0]+((intermedio[i+199][0]- intermedio[i][0])*frame);
            Nexy=intermedio[i][1]+((intermedio[i+199][1] - intermedio[i][1])*frame);
            NexX=Math.floor(NexX);
            Nexy=Math.floor(Nexy);
            intPro.push([NexX, Nexy]);
        };
    };
    //Animar agora é possivel com esta invenção onde agora a linha azul é formada em 200 frames
    AnimaFin(intPro, Fr, pi);
};
const animaltion = function(i, xax, yarn, frame){
    icon.src="./Icons/pause.png"
    const { xa, ya, Far } = movInLines(i, xax, yarn, frame);
    let r =[xa, ya, Far]
    if (frame<=1){
        //enquanto não forem feitos os 200 frames estarão sempre a criar novos frames
        curv.push(r);
        window.requestAnimationFrame(() => animaltion(i, xa, ya, frame + 0.005));
    } else {
        //fim da animação
        frame = 0;

    // será executado quando as animações terminarem se tiver 4 pontos ou mais
    if( arca.length==3){
        icon.src="./Icons/play-button-arrowhead.png"
    }
        if (i === arca.length-3 && i > 0) {
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
//  alteração do icon 
function iconCheck(frame){
    if (frame>1){
        icon.src="./Icons/play-button-arrowhead.png"
    }
}

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
