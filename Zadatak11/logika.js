

const maxAttempts=5; // broj pokusaja
let currentAttempts=0; //trenutni pokusaj, odnosno preko njega pratimo da ne odemo preko 5 gambleAttempta
let amount = 500; // pocetni balans u igri
let i =0; // indikator za kretanje kroz niz za vrednost gamble
const betAmount = [20,40,60,80,100]; // vrednosti gamble

var gambleAmount =parseFloat(betAmount[i]);
var amountOrigin=parseFloat(betAmount[i]);// povlacicemo iz div gde se podesava kao gamblke amount

let historyCards=[]; // niz za cuvanje karata tokom igri koje izadju

//Funkcije za kretanje kroz niz vrednosti beta i namestanje beta u igri

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

// Funkcija koja sluzi da se ne ponavlja kod u vise funkcija 
function appendInfoToAll(){
    document.querySelector(".gamble-amount").textContent=betAmount[i].toFixed(2);
    document.getElementById('gamble-win').textContent=betAmount[i].toFixed(2);
    document.getElementById('gamble-to-win').textContent=(betAmount[i]*2).toFixed(2);
}

//Funkcija za portrait i landscape mode kao i za resize da se sve proporcionalno resize-je
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
    AudioHandler.init();  //inicijalizacija zvukova
    modalWindow.Events(); //inicijalizacija modala za info deo
    introHandler.introEvents(); // inicijalizacija za intro deo,tacnije da li zelis zvuk
    ModalSetting.Events(); //inicijalzicija modala za podesavanje zvuka i jezika
    AudioHandler.setMode('mute'); // postavljamo uvek na mute zvuk da ne bi se cuo gif dok je intro za zvuk, pa ukoliko u intro delu kazemo DA onda se promeni mod zvuka
    drawStaticLogo(); //crtanje statickog logoa

    console.log("Dostupni zvuci:", AudioHandler.sounds);

    console.log( "Amount origin, odnosno koliko se skida ako se pogresi: " + amountOrigin);
    console.log("Amount: " + amount);
    console.log( "Gamble amount: " + gambleAmount);
    
    appendInfoToAll();
    this.document.getElementById("gamble-total").textContent=amount.toFixed(2);
    
  
})
//-----------------------------------------------------------

// Funkcije za logiku oko karata za crno i crveno
function generateCard() {
    const cards = [
        { src: 'images/gamble/1-min.png', color: 'red' },
        { src: 'images/gamble/3-min.png', color: 'red' },
        { src: 'images/gamble/0-min.png',  color: 'black' },
        { src: 'images/gamble/2-min.png', color: 'black' }
    ];

    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

 //Glavna funkcija za igru, cela logika prilikom gadanja crne i crvene 
function gamble(playerChoice){

    const resultCard=generateCard();
    const result=resultCard.color;
    
    const cardContainer = document.getElementById("flip-card");
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
        startCanvasAnimation(1000);
        canvas.src="images/logo.png";
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
        //Ako izgubi novac stranica se cela resetuje
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

//funckija za osvezavanje stranice , tacnije da kad se promasi ili kolektuje, ali balans se ne resetuje.
function resetPage(){
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


//----------------------------------------------------------------------------------
// display none za setting modal nije radio dok nisam dodao
//  important zasto? ne znam !!! odgovor jer prvo uzima display:flex pa zbog
// toga, ali posto smo mu dodali atrbut important on ga overrajduje
