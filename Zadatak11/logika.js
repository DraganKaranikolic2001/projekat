// import {AudioHandler} from '/.sound.js';






const slika=document.getElementById("pictureGamble");
const maxAttempts=5;
let currentAttempts=0;
let gambleAmount = ((Math.random())*100).toFixed(2); 

let historyCards=[];

function resizeMaster(){
    const img = document.getElementById("pictureGamble");
    const aspect= window.innerWidth/window.innerHeight;
    if(aspect<1){
        resizePortrait();
         img.src = "images/gamble-background-portrait.png";
    }
    else{
        resizeLandscape();
        img.src = "images/gamble-background-min.png";
    }
}

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

//----------------------------------------
//Funkcije za modalni prozor
const magic= document.querySelector('.info-button');
const modal= document.querySelector('.modal');
const x= document.querySelector('.x');
const overlay= document.querySelector('.overlay');

function open(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    AudioHandler.play('help');
    AudioHandler.stop('gif');
}
magic.addEventListener('click', open);

function close(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
   AudioHandler.play('gif');
}
x.addEventListener('click',close);
overlay.addEventListener('click',close);
//-----------------------------------------

//Funkcije za zvuk
function clickRed(){
    // stopGifSound();
    // var sound=document.getElementById('red-audio')
    // sound.play();
    AudioHandler.stop('gif');
    AudioHandler.play('red');
    gamble('red');
}

function clickBlack(){
    // stopGifSound();
    // var sound=document.getElementById('black-audio')
    // sound.play();
    AudioHandler.stop('gif');
    AudioHandler.play('black');
    gamble('black');
}
function clickTakeWin(){
    
    AudioHandler.stop('gif');
    AudioHandler.play('take');
    document.getElementById("gamble-amount-to-win").textContent = "0.00";
    document.getElementById("gamble-attempts").textContent = "0";
    document.getElementById("gamble-to-win").textContent="0.00";
    // var sound=document.getElementById('take-win-audio');
    // sound.play();
   
    alert("Svaka cast! Zaradio si: " + gambleAmount + " Eura!");
    
    
    resetPage();

     
}
//------------------------------------------

//Ucitavanja vrednosti i zvuka za mesanje karata
window.addEventListener('DOMContentLoaded', function(){
    console.log(gambleAmount);
    console.log(gambleAmount*2);
    AudioHandler.init();
    AudioHandler.setMode('mute');

    console.log("Dostupni zvuci:", AudioHandler.sounds);
    document.getElementById('gamble-amount-to-win').textContent=gambleAmount;
    document.getElementById('gamble-to-win').textContent=(gambleAmount*2).toFixed(2);
    const ucitaneKarte= JSON.parse(this.localStorage.getItem("slikeKarata"));
    // console.log(ucitaneKarte);
    // appendCards(ucitaneKarte);


    const el11=this.document.querySelector("p");
    const fontSize=this.window.getComputedStyle(el11).fontSize;
    console.log(fontSize);
    // playGifSound();
})
//-----------------------------------------------------------
//Prozor za zvuk na pocetku ucitavanja igrice
const doc1= document.querySelector(".intro-button-yes");
const doc2= document.querySelector(".intro-button-no");
const intro=document.querySelector(".intro");
volumeIcon= document.getElementById("volume"),
doc1.addEventListener('click',(e)=>{
    intro.style.display="none";
    AudioHandler.setMode("on");
})
doc2.addEventListener('click',(e)=>{
    intro.style.display="none";
})
//------------------------------------------------------------



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
    console.log(result);

    const img=document.getElementById("gamble-gif");
    img.src=resultCard.src;

    updateHistory(resultCard);
    console.log(historyCards);
     setTimeout(() => {
        img.src = "images/gamble/redblack.gif";
            AudioHandler.play('gif');
        if(playerChoice!==result)
            AudioHandler.stop('gif');
    }, 500);
    
    
    if(playerChoice===result){
        gambleAmount*=2;
        currentAttempts++;

        document.getElementById('gamble-amount-to-win').textContent=gambleAmount.toFixed(2);
        document.getElementById("gamble-attempts").textContent=maxAttempts-currentAttempts;
        document.getElementById("gamble-to-win").textContent=(gambleAmount*2).toFixed(2);

        console.log(currentAttempts);
        document.getElementById("win-button").classList.remove("hidden");
        AudioHandler.play('win');
        // playSound('win');
        if(currentAttempts>=maxAttempts){
            collectWinnings();
        }

    }
    else{
       
       gambleAmount=0; 
        currentAttempts=0;
        document.getElementById('gamble-amount-to-win').textContent=parseFloat(gambleAmount).toFixed(2);
        document.getElementById("gamble-attempts").textContent=0;
        document.getElementById("gamble-to-win").textContent=parseFloat(gambleAmount).toFixed(2);
        AudioHandler.play('lose');
        // playSound('lose');
        resetPage();


    }
}

function resetPage(){

    localStorage.setItem("slikeKarata",JSON.stringify(historyCards));
   
    const blackout = document.getElementById("blackout");
        blackout.style.display = "block";
        setTimeout(() => {
        blackout.style.opacity = "1";
        }, 1500);

       setTimeout(()=>location.reload(),2500);
}

function collectWinnings()
{   

    AudioHandler.play("take");
    alert("Svaka cast majstore! Zaradio si: " + gambleAmount.toFixed(2) + " Eura!");
    
    resetPage();
}
// Istorija karata

function updateHistory(card) {
    const historyContainer = document.getElementById("history-card");

    historyCards.push(card);

    if (historyCards.length > 4) {
        historyCards.pop();
    }

    historyContainer.innerHTML="";

    historyCards.forEach(c => {
        const cardImg = document.createElement("img");
        cardImg.src = c.src;

        cardImg.classList.add("history-card-img");
        historyContainer.appendChild(cardImg);
    });
}
// function appendCards(cards)
// {
//     const historyContainer = document.getElementById("history-card");

//     cards.forEach(c => {
//         const cardImg = document.createElement("img");
//         cardImg.src = c.src;
//         cardImg.classList.add("history-card-img");
//         historyContainer.appendChild(cardImg);
//     });
// }



//da napravim 1 fju za yvuk preko enumarecije
//sve resize da stavim u 1 fju


//kad se pokrene igra da uvek ima 5k kredita, gamble amount je 50 i da se svaki put kad il izgubi il dodje do 5 da mu se doda/oduzme vrednost i nastavi igra
//zvuk dugme 3 nivo(mute,0,4,0,8)
//Kad se ucitava igra da se pita da li zeli zvuk ili ne
//portrait ako ostane vremena


//da odvojim js fajlove po zvuku, resize za landscape, resize za portrait, zajednice fju staviti u odvojen fajl i napraviti gettere
