
const slika=document.getElementById("pictureGamble");
 const maxAttempts=5;
let currentAttempts=0;

let amount = 500;

let i =0;

const betAmount = [20,40,60,80,100];

var gambleAmount =parseFloat(betAmount[i]);
var amountOrigin=parseFloat(betAmount[i]);// povlacicemo iz div gde se podesava kao gamblke amount

function increment(){
    i++;
    console.log(i);
    if(i>4)
        i=0;
    appendInfoToAll();
    gambleAmount =parseFloat(betAmount[i]);
    amountOrigin=parseFloat(betAmount[i]);
    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);
}

function decrement(){
    i--;
    if(i<0)
        i=4;
    appendInfoToAll();
    gambleAmount =parseFloat(betAmount[i]);
    amountOrigin=parseFloat(betAmount[i]);
    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);

}

function appendInfoToAll(){
    document.querySelector(".gamble-amount").textContent=betAmount[i].toFixed(2);
    document.getElementById('gamble-win').textContent=betAmount[i].toFixed(2);
    document.getElementById('gamble-to-win').textContent=(betAmount[i]*2).toFixed(2);
}


let historyCards=[];

function resizeMaster(){
    const img = document.getElementById("pictureGamble");
    const aspect= window.innerWidth/window.innerHeight;
    if(aspect<=1){
        resizePortrait();
         img.src = "images/gamble-background-portrait.png";
    }
    else{
        resizeLandscape();
        img.src = "images/gamble-background-min.png";
    }
}
const landscapeMediaQuery= window.matchMedia("(orientaion:landspace)");
landscapeMediaQuery.addEventListener("change",resizeMaster);
const portraitMediaQuery = window.matchMedia("(orientation: portrait)");
portraitMediaQuery.addEventListener("change", resizeMaster);

//Utility helper da se ne duplira kod
function resizeAndLoadEvents(fns){
    fns.forEach(fn=>{
        window.addEventListener("resize",fn);
        window.addEventListener("load",fn);
    });
}
resizeAndLoadEvents([
    resizeMaster
]);
// const hisDiv = document.getElementById("history");
// let leftPos=0;
// let startTime=null;

// function moveDiv(timestamp){
//     if(!startTime)
//     {
//         startTime=timestamp;
//     }
//     let progress=timestamp-startTime;
//     leftPos+=0.5;
//     hisDiv.style.left=leftPos+"px";
//     if(progress<2000){
//         requestAnimationFrame(moveDiv);
//     }
    
// }
// requestAnimationFrame(moveDiv);
//--------------------------------------------------------------------

//Funkcije za klik na dugmad
function clickRed(){
    if(amount<amountOrigin || amount==0)
    {   
       if(document.getElementById("language").value==="sr")
        alert("Smanji bet !!!");
        else
        alert("Lower bet !!!");
    }
    else{
        AudioHandler.stop('gif');
        AudioHandler.play('red');
        gamble('red');
    }
    

}

function clickBlack(){
    if(amount<amountOrigin)
    {   
        if(document.getElementById("language").value==="sr")
        alert("Smanji bet !!!");
        else
        alert("Lower bet !!!");
        
    }
    else{
        AudioHandler.stop('gif');
        AudioHandler.play('black');
        gamble('black');
    }
        
    
   
}
function clickTakeWin(){
    amount+=gambleAmount;
    AudioHandler.stop('gif');
    AudioHandler.play('take');
    alert("Svaka cast! Zaradio si: " + gambleAmount + " Eura!" +"u kasi imas : "+ amount);
    resetPage();
}
//------------------------------------------

//Ucitavanja vrednosti , zvuka i ostalih handler-a
window.addEventListener('DOMContentLoaded', function(){
    AudioHandler.init();
    modalWindow.Events();
    introHandler.introEvents();
    ModalSetting.Events();
    AudioHandler.setMode('mute');

    console.log("Dostupni zvuci:", AudioHandler.sounds);

    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);

    console.log(landscapeMediaQuery);
    
    appendInfoToAll();

    this.document.getElementById("gamble-total").textContent=amount.toFixed(2);
    
     const modal = document.getElementById("myModal");
    const modalStyles = getComputedStyle(modal);

    console.log("Je l' modal hidden?", modal.classList.contains("hidden"));
    console.log("Modal display:", modalStyles.display);
    console.log("Modal visibility:", modalStyles.visibility);
    console.log("Modal dimensions:", modal.offsetWidth, modal.offsetHeight);
})
//-----------------------------------------------------------

// Funkcije za logiku oko karata za crno i crveno
function generateCard() {
    const cards = [
        { src: 'images/gamble/1-min.png', color: 'red' },
        { src: 'images/gamble/3-min.png', color: 'red' },
        // { src: 'images/gamble/0-min.png',  color: 'black' },
        // { src: 'images/gamble/2-min.png', color: 'black' }
    ];

    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}


function gamble(playerChoice){

    const resultCard=generateCard();
    const result=resultCard.color;
    
    

    const cardContainer = document.getElementById("flip-card");
    const cardInner = document.getElementById("card-inner");
    const frontImg = document.getElementById("card-front-img");
    const backImg = document.getElementById("card-back-img");


    backImg.src=resultCard.src;
    console.log(backImg);
    cardContainer.classList.add("flip");
    
    updateHistory(resultCard);
    console.log(historyCards);
        setTimeout(() => {
        cardContainer.classList.remove("flip");
         AudioHandler.play('gif');
         frontImg.src = "images/gamble/redblack.gif";
        if(playerChoice!==result){
            AudioHandler.stop('gif');
            resetPage();
        }
            
    }, 900);
    if(playerChoice===result){
        gambleAmount*=2;
        currentAttempts++;
        resetAnim();
        animate();
        console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
        console.log("Amount: " + amount);
        console.log( "Gamble amount: " + gambleAmount);

        document.getElementById('gamble-win').textContent=(gambleAmount).toFixed(2);
        document.getElementById("gamble-attempts").textContent=maxAttempts-currentAttempts;
        document.getElementById("gamble-to-win").textContent=(gambleAmount*2).toFixed(2);

        console.log(currentAttempts);
        document.getElementById("win-button").classList.remove("hidden");
        AudioHandler.play('win');
        if(currentAttempts>=maxAttempts){
            collectWinnings(gambleAmount);
        }

    }
    else{
        amount-=amountOrigin;
        if(amount==0)
        {   
            if(document.getElementById("language").value==="sr")
            alert("Nemas dovoljno novca, igrica se resetuje !!!");
            else
            alert("Not enought funds, game will restart");
            const blackout = document.getElementById("blackout");
            blackout.style.display = "block";
            setTimeout(() => {
            blackout.style.opacity = "1";
            }, 1500);
        
            setTimeout(()=>location.reload(),2500);
        }
        AudioHandler.play('lose');
        //Drugi nacin za reset page kako bi zvuk gifa krenuo kad se promasi
        // setTimeout(()=>{
        //     resetPage();
        // },600);
    }
}

function resetPage(){

    // localStorage.setItem("slikeKarata",JSON.stringify(historyCards));
   
    AudioHandler.play('gif');
    this.document.getElementById("gamble-total").textContent=amount.toFixed(2);
    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);
    gambleAmount=betAmount[i];
    currentAttempts=0;
    document.getElementById('gamble-win').textContent=(gambleAmount).toFixed(2);
    document.querySelector('.gamble-amount').textContent=gambleAmount.toFixed(2);
    document.getElementById("gamble-attempts").textContent=maxAttempts-currentAttempts;
    document.getElementById("gamble-to-win").textContent=(gambleAmount*2).toFixed(2);
    if(window.innerWidth/window.innerHeight>1)
    {
        document.getElementById("win-button").classList.add("hidden");
    }
    

}

function collectWinnings(x)
{   
    
    AudioHandler.play("take");
    amount+=x;
    this.document.getElementById("gamble-total").textContent=amount.toFixed(2);
    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);
    alert("Svaka cast majstore! Zaradio si: " + gambleAmount.toFixed(2) + " Eura!"+ "U banci imas: "+ amount);
    
    resetPage();
}
// Istorija karata

function updateHistory(card) {
    const historyContainer = document.getElementById("history-card");

    historyCards.push(card);

    if (historyCards.length >4) {
        historyCards.shift();
    }

    historyContainer.innerHTML="";

    historyCards.forEach(c => {
        const cardImg = document.createElement("img");
        cardImg.src = c.src;

        cardImg.classList.add("history-card-img");
        historyContainer.appendChild(cardImg);
    });
}

/*function appendCards(cards)
{
    const historyContainer = document.getElementById("history-card");

    cards.forEach(c => {
        const cardImg = document.createElement("img");
        cardImg.src = c.src;
       cardImg.classList.add("history-card-img");
        historyContainer.appendChild(cardImg);
    });
}*/

function easeOutBounce(t,b,c,d) { 
    if((t/=d)<(1/2.75)){
        return c*(7.5625*t*t)+b;
    }
    else if(t<(2/2.75)){
        return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;
    }
    else if(t<(2.5/2.75)){
        return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;
    }
    else{
        return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;
    }
}

var start = -300;
var end = 0;
var frameRate=60/1000;
var duration = 1000;
var currentStep = 0;
var newY=0;
var slika1 = document.querySelector(".logo-img");
function resetAnim(){
    newY=0;
    currentStep=0;
}
function animate(){
    currentStep++;
    newY=easeOutBounce(currentStep,start,end-start,frameRate*duration);
    slika1.style.transform='translateY('+ newY+ 'px)';
    if(currentStep>=frameRate*duration)
        return;
    requestAnimationFrame(animate);
}

// const canvas= document.getElementById("canvas1");
// const ctx=canvas.getContext('2d');

// const CANVAS_WIDTH=canvas.width;
// const CANVAS_HEIGHT=canvas.height;

// console.log(CANVAS_HEIGHT);
// console.log(CANVAS_WIDTH);

// const SpriteImage= new Image();

// SpriteImage.src="images/logo-anim.png";

// function animate(){
//     ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
//     ctx.drawImage(SpriteImage,0,0);
//     requestAnimationFrame(animate);
// }
// animate();
 

//----------------------------------------------------------------------------------


//sprite animacija preko requestAnimation , animacija za kartu , iluzija okretanje(hero karta kod dev kad se okrece),
//sredjivanje css, outline u labelice plus i minus na gamble
//opcija za vise jezika , napravi popup za jezik,zvuk i info 


// display none za setting modal nije radio dok nisam dodao
//  important zasto? ne znam !!! odgovor jer prvo uzima display:flex pa zbog
// toga, ali posto smo mu dodali atrbut important on ga overrajduje

//