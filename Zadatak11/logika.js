
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
    document.getElementById('gamble-amount-to-win').textContent=betAmount[i].toFixed(2);
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
//--------------------------------------------------------------------

//Funkcije za klik na dugmad
function clickRed(){

    AudioHandler.stop('gif');
    AudioHandler.play('red');
    gamble('red');

}

function clickBlack(){
   
    AudioHandler.stop('gif');
    AudioHandler.play('black');
    gamble('black');
   
}
function clickTakeWin(){
    amount+=gambleAmount;
    AudioHandler.stop('gif');
    AudioHandler.play('take');
    // document.getElementById("gamble-amount-to-win").textContent = "0.00";
    // document.getElementById("gamble-attempts").textContent = "0";
    // document.getElementById("gamble-to-win").textContent="0.00";
    alert("Svaka cast! Zaradio si: " + gambleAmount + " Eura!" +"u kasi imas : "+ amount);
    resetPage();
}
//------------------------------------------

//Ucitavanja vrednosti , zvuka i ostalih handler-a
window.addEventListener('DOMContentLoaded', function(){
    AudioHandler.init();
    modalWindow.Events();
    introHandler.introEvents();
    AudioHandler.setMode('mute');

    console.log("Dostupni zvuci:", AudioHandler.sounds);

    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);

    
    appendInfoToAll();

    this.document.querySelector(".amount").textContent=amount.toFixed(2);
    // const ucitaneKarte= JSON.parse(this.localStorage.getItem("slikeKarata"));
    // console.log(ucitaneKarte);
    // appendCards(ucitaneKarte);
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

        console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
        console.log("Amount: " + amount);
        console.log( "Gamble amount: " + gambleAmount);

        document.getElementById('gamble-amount-to-win').textContent=gambleAmount.toFixed(2);
        document.getElementById("gamble-attempts").textContent=maxAttempts-currentAttempts;
        document.getElementById("gamble-to-win").textContent=(gambleAmount*2).toFixed(2);

        console.log(currentAttempts);
        document.getElementById("win-button").classList.remove("hidden");
        AudioHandler.play('win');
        // playSound('win');
        if(currentAttempts>=maxAttempts){
            collectWinnings(gambleAmount);
        }

    }
    else{
        amount-=amountOrigin;
        // document.getElementById('gamble-amount-to-win').textContent=parseFloat(gambleAmount).toFixed(2);
        // document.getElementById("gamble-attempts").textContent=0;
        // document.getElementById("gamble-to-win").textContent=parseFloat(gambleAmount).toFixed(2);
        AudioHandler.play('lose');
        // playSound('lose');
        resetPage();


    }
}

function resetPage(){

    // localStorage.setItem("slikeKarata",JSON.stringify(historyCards));
   
    // const blackout = document.getElementById("blackout");
    //     blackout.style.display = "block";
    //     setTimeout(() => {
    //     blackout.style.opacity = "1";
    //     }, 1500);

    //    setTimeout(()=>blackout.style.display="none",2500);
    this.document.querySelector(".amount").textContent=amount.toFixed(2);
    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);
    gambleAmount=betAmount[i];
    currentAttempts=0;
    document.getElementById('gamble-amount-to-win').textContent=gambleAmount.toFixed(2);
    document.getElementById("gamble-attempts").textContent=maxAttempts-currentAttempts;
    document.getElementById("gamble-to-win").textContent=(gambleAmount*2).toFixed(2);

    document.getElementById("win-button").classList.add("hidden");

}

function collectWinnings(x)
{   
    
    AudioHandler.play("take");
    amount+=x;
    this.document.querySelector(".amount").textContent=amount.toFixed(2);
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



// napraviti koliko zeli bet da ima u smislu kruzic sa minusom i plusom dokle moze da ide, napraviti niz za svim betovima mogucim 10,20,40,50,100
//kad dodje do max beta da se vrati na min bet u smislu da bude kruzno


//kad se pokrene igra da uvek ima 5k kredita, gamble amount je 50 i da se svaki put kad il izgubi il dodje do 5 da mu se doda/oduzme vrednost i nastavi igra


//u  portrati za info deo dodati outline