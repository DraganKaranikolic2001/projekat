const slika=document.getElementById("pictureGamble");
const maxAttempts=5;
let currentAttempts=0;
let gambleAmount = ((Math.random())*100).toFixed(2); 

let historyCards=[];

//Resizing svega
function sizeImg()
{
    const el=document.getElementById("main-page");
    const width=window.innerWidth;
    const height=window.innerHeight;
    //console.log(width);
    //console.log(height);
    el.style.width=width+"px";
    el.style.height=height+"px";
    const ratio=16/9;
    //Ovo se odnosi na ratio 16:9 da uvek bude takkav kako god klijent namestio prozor(window)
    if((width/height)<ratio)
    {
        el.style.width=width+"px";
        el.style.height=width/ratio+"px";
    }
    else
    {
        el.style.height=height+"px";
        el.style.width=height*ratio+"px";
    }

    
    
}
function sizeHistory()
{
    const el=document.getElementById("history");
    const el1=document.getElementById("main-page");
    const base = el1.clientHeight;
    el.style.fontSize=(base*0.05)+"px";
    /*const size= 50+"px";
    if(parseFloat(el.style.fontSize) >parseFloat(size) )
        el.style.fontSize=size;*/

}
function sizeText()
{
    const el2=document.getElementById("main-page");
    const el= document.querySelectorAll(".gamble-info-label");
    const el1= document.querySelectorAll(".gamble-info-amount");
    const base = el2.clientHeight;

    el.forEach(e=>{
        e.style.fontSize=(base*0.03)+"px";
    })
    el1.forEach(e=>{
        e.style.fontSize=(base*0.04)+"px";
    })

}

function sizeButtons(){
    const el2=document.getElementById("main-page");
    const el1= document.querySelectorAll(".button");
    let base=el2.clientHeight;
    if(base>620)
        base=620;

    el1.forEach(e=>{
        e.style.fontSize= (base*0.04)+"px";
    })
}


// function resizeCards(){
//     const el1=document.getElementById("gamble-box-id");
//     const width=window.innerWidth;
//     const height=window.innerHeight;
//     el1.style.height=height*0.8;
//     el1.style.width=width*0.8;

// }


function resizeModalWrapper() {
    const wrapper = document.querySelector(".modal-wrapper");
    const modal = document.getElementById("modal");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = 16 / 9;


    if ((width / height) < ratio) {
        wrapper.style.width = width + "px";
        wrapper.style.height = (width / ratio) + "px";
    } else {
        wrapper.style.height = height + "px";
        wrapper.style.width = (height * ratio) + "px";
    }

  
    modal.style.width = (wrapper.clientWidth * 0.7) + "px";
    modal.style.maxHeight = (wrapper.clientHeight * 0.8) + "px";

   
    const base = wrapper.clientHeight;
    const title = modal.querySelector("h2");
    const para = modal.querySelectorAll("p");
    const button = modal.querySelector("button");

    title.style.fontSize = (base * 0.04) + "px";
    para.forEach(el => {
        el.style.fontSize = (base * 0.04) + "px"
    });
    // para.style.fontSize = (base * 0.03) + "px";
    button.style.fontSize = (base * 0.05) + "px";
    button.style.padding = (base * 0.01) + "px " + (base * 0.015) + "px";
}


function resizeAndLoadEvents(fns){
    fns.forEach(fn=>{
        window.addEventListener("resize",fn);
        window.addEventListener("load",fn);
    });
}

resizeAndLoadEvents([
    sizeImg,
    sizeHistory,
    sizeText,
    sizeButtons,
    // resizeCards,
    resizeModalWrapper
]);

//----------------------------------------

/*document.getElementById("magic-button").addEventListener("click", function(){
    window.open("https://www.google.com","_blank","width=800,height=600,top=100,left=100")
});*/
// document.getElementById("info-button").addEventListener("click", function () {
//     window.open("info.html", "_blank", "toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=" + screen.width + ",height=" + screen.height);
// });


// window.addEventListener("resize", resizeModalWrapper);
// window.addEventListener("load", resizeModalWrapper);

// window.addEventListener('resize',sizeImg);
// window.addEventListener('resize',sizeHistory);
// window.addEventListener('resize',resizeCards);
// window.addEventListener('resize',sizeText);
// window.addEventListener('resize',sizeButtons);

//Funkcije za modalni prozor
const magic= document.querySelector('.info-button');
const modal= document.querySelector('.modal');
const x= document.querySelector('.x');
const overlay= document.querySelector('.overlay');

function open(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
magic.addEventListener('click', open);

function close(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    playGifSound();
}
x.addEventListener('click',close);
overlay.addEventListener('click',close);
//-----------------------------------------

//Funkcije za zvuk
function clickInfo(){
    var sound=document.getElementById('info-audio');
    sound.play();
    stopGifSound();
}
function clickRed(){
    stopGifSound();
    var sound=document.getElementById('red-audio')
    sound.play();
    gamble('red');
}

function clickBlack(){
    stopGifSound();
    var sound=document.getElementById('black-audio')
    sound.play();
    gamble('black');
}
function clickTakeWin(){
    
    
    document.getElementById("gamble-amount-to-win").textContent = "0.00";
    document.getElementById("gamble-attempts").textContent = "0";
    document.getElementById("gamble-to-win").textContent="0.00";
    var sound=document.getElementById('take-win-audio');
    sound.play();
    alert("Svaka cast! Zaradio si: " + gambleAmount + " Eura!");
    
    
    resetPage();

     
}
//------------------------------------------

//Ucitavanja vrednosti i zvuka za mesanje karata
window.addEventListener('DOMContentLoaded', function(){
    console.log(gambleAmount);
    console.log(gambleAmount*2);

    document.getElementById('gamble-amount-to-win').textContent=gambleAmount;
    document.getElementById('gamble-to-win').textContent=(gambleAmount*2).toFixed(2);
    const ucitaneKarte= JSON.parse(this.localStorage.getItem("slikeKarata"));
    console.log(ucitaneKarte);
    appendCards(ucitaneKarte);
    // const gifSound = document.getElementById("gif-sound");
    // gifSound.play();
    playGifSound();
})
//-----------------------------------------------------------



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
        playGifSound();
        if(playerChoice!==result)
            stopGifSound()
    }, 500);
    
    
    if(playerChoice===result){
        gambleAmount*=2;
        currentAttempts++;

        document.getElementById('gamble-amount-to-win').textContent=gambleAmount.toFixed(2);
        document.getElementById("gamble-attempts").textContent=maxAttempts-currentAttempts;
        document.getElementById("gamble-to-win").textContent=(gambleAmount*2).toFixed(2);

        console.log(currentAttempts);
        document.getElementById("win-button").classList.remove("hidden");
        
        playSound('win');
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
        playSound('lose');
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
//Zvukovi
function playGifSound(){
    const gifSound = document.getElementById("gif-sound");
    gifSound.currentTime = 0;
    gifSound.play();
    gifSound.volume=0.4;
}

function playSound(type) {
    const audio = new Audio(type === 'win' ? 'sounds/RedBlackWin.mp3' : 'sounds/RedBlackLose.mp3');
    audio.play();
}

function stopGifSound() {
    const gifSound = document.getElementById("gif-sound");
    gifSound.volume=0;
    
}
//--------------------------------------------------------------

function collectWinnings()
{
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
        historyContainer.appendChild(cardImg);
    });
}
function appendCards(cards)
{
    const historyContainer = document.getElementById("history-card");

    cards.forEach(c => {
        const cardImg = document.createElement("img");
        cardImg.src = c.src;
        historyContainer.appendChild(cardImg);
    });
}

//--------------------------------------

//sve resize da stavim u 1 fju
//kad se pokrene igra da uvek ima 5k kredita, gamble amount je 50 i da se svaki put kad il izgubi il dodje do 5 da mu se doda/oduzme vrednost i nastavi igra
//da napravim 1 fju za yvuk preko enumarecije
//zvuk dugme 3 nivo(mute,0,4,0,8)
//Kad se ucitava igra da se pita da li zeli zvuk ili ne
//portrait ako ostane vremena