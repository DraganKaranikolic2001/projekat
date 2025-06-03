const slika=document.getElementById("pictureGamble");
const maxAttempts=5;
let currentAttempts=0;
let gambleAmount = ((Math.random())*100).toFixed(2); 

let historyCards=[];



//Resizing svega
function resizeAll(){

    //Glavi prozor i modalni prozor
    const el=document.getElementById("main-page");
    let width=window.innerWidth;
    let height=window.innerHeight;

    const wrapper = document.querySelector(".modal-wrapper");
    const modal = document.getElementById("modal");


    // el.style.width=width+"px";
    // el.style.height=height+"px";


    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    if (isPortrait) {
        console.log("1");
    }
    else{
        console.log("2");
    }

     const ratio=16/9;

    const aspect = window.innerWidth / window.innerHeight;
    if(aspect<1){
        const ratio1=9/16;
        if((width/height)>ratio1){
            el.style.height = height + "px";
            el.style.width = height*ratio1 + "px";
        }
        else{
            el.style.width=width+"px";
            el.style.height-width/ratio1+"px";
        }
        // let bas=el.clientWidth;
        // const elButtons=document.querySelectorAll(".button");
        //  elButtons.forEach(e=>{
        // e.style.fontSize=(bas*0.04)+"px";
        // })
        // wrapper.style.width = width + "px";
        // wrapper.style.height = height + "px";
   
    }
    else{
       
    //Ovo se odnosi na ratio 16:9 da uvek bude takkav kako god klijent namestio prozor(window)
        if((width/height)<ratio)
        {
            el.style.width=width+"px";
            el.style.height=width/ratio+"px";

            wrapper.style.width = width + "px";
            wrapper.style.height = (width / ratio) + "px";
        }
        else
        {
            el.style.height=height+"px";
            el.style.width=height*ratio+"px";

            wrapper.style.height = height + "px";
            wrapper.style.width = (height * ratio) + "px";
        }

    }
    
    modal.style.width = (wrapper.clientWidth * 0.7) + "px";
    modal.style.maxHeight = (wrapper.clientHeight * 0.8) + "px";

   
    const baseWrapper = wrapper.clientHeight;
    const title = modal.querySelector("h2");
    const para = modal.querySelectorAll("p");
    const buttonModal = modal.querySelector(".x");

    title.style.fontSize = (baseWrapper * 0.04) + "px";
    para.forEach(el => {
        el.style.fontSize = (baseWrapper * 0.04) + "px"
    });
    // para.style.fontSize = (base * 0.03) + "px";
    buttonModal.style.fontSize = (baseWrapper * 0.05) + "px";
    buttonModal.style.padding = (baseWrapper * 0.01) + "px " + (baseWrapper * 0.015) + "px";

    //History div
    const elHistory=document.getElementById("history");
    const base = el.clientHeight;
    elHistory.style.fontSize=(base*0.05)+"px";
    //Info div sa gamble amountom
    const elAmount= document.querySelectorAll(".gamble-info-label");
    const el1Amount= document.querySelectorAll(".gamble-info-amount");
    elAmount.forEach(e=>{
        e.style.fontSize=(base*0.03)+"px";
    })
    el1Amount.forEach(e=>{
        e.style.fontSize=(base*0.04)+"px";
    })
    //Buttons gamble
    let base1=el.clientHeight
    const elButtons=document.querySelectorAll(".button");
    if(base1>620)
        base1=620;
    elButtons.forEach(e=>{
        e.style.fontSize=(base*0.04)+"px";
    })

    // Mute dugme
    const muteBtn = document.getElementById("mutebtn");
    const muteIcon = muteBtn.querySelector("i");

    const muteSize = base * 0.08;
    muteBtn.style.width = muteSize + "px";
    muteBtn.style.height = muteSize + "px";
    muteIcon.style.fontSize = (base * 0.04) + "px";

    //info dugme
    const infoBtn = document.getElementById("magic-button");
    const infoIcon = infoBtn.querySelector("i");

    infoBtn.style.width = muteSize + "px";
    infoBtn.style.height = muteSize + "px";
    infoIcon.style.fontSize = (base * 0.04) + "px";


}

// function sizeImg()
// {

//     //Glavni page da ima odnos 16/9
//     const el=document.getElementById("main-page");
//     const width=window.innerWidth;
//     const height=window.innerHeight;
//     //console.log(width);
//     //console.log(height);
//     el.style.width=width+"px";
//     el.style.height=height+"px";
//     const ratio=16/9;
//     //Ovo se odnosi na ratio 16:9 da uvek bude takkav kako god klijent namestio prozor(window)
//     if((width/height)<ratio)
//     {
//         el.style.width=width+"px";
//         el.style.height=width/ratio+"px";

        
//     }
//     else
//     {
//         el.style.height=height+"px";
//         el.style.width=height*ratio+"px";
//     }

// }
// function sizeHistory()
// {
//     const el=document.getElementById("history");
//     const el1=document.getElementById("main-page");
//     const base = el1.clientHeight;
//     el.style.fontSize=(base*0.05)+"px";
//     /*const size= 50+"px";
//     if(parseFloat(el.style.fontSize) >parseFloat(size) )
//         el.style.fontSize=size;*/

// }
// function sizeText()
// {
//     const el2=document.getElementById("main-page");
//     const el= document.querySelectorAll(".gamble-info-label");
//     const el1= document.querySelectorAll(".gamble-info-amount");
//     const base = el2.clientHeight;

//     el.forEach(e=>{
//         e.style.fontSize=(base*0.03)+"px";
//     })
//     el1.forEach(e=>{
//         e.style.fontSize=(base*0.04)+"px";
//     })

// }

// function sizeButtons(){
//     const el2=document.getElementById("main-page");
//     const el1= document.querySelectorAll(".button");
//     let base=el2.clientHeight;
//     if(base>620)
//         base=620;

//     el1.forEach(e=>{
//         e.style.fontSize= (base*0.04)+"px";
//     })
// }


// function resizeCards(){
//     const el1=document.getElementById("gamble-box-id");
//     const width=window.innerWidth;
//     const height=window.innerHeight;
//     el1.style.height=height*0.8;
//     el1.style.width=width*0.8;

// }


// function resizeModalWrapper() {
//     const wrapper = document.querySelector(".modal-wrapper");
//     const modal = document.getElementById("modal");
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     const ratio = 16 / 9;


//     if ((width / height) < ratio) {
//         wrapper.style.width = width + "px";
//         wrapper.style.height = (width / ratio) + "px";
//     } else {
//         wrapper.style.height = height + "px";
//         wrapper.style.width = (height * ratio) + "px";
//     }

  
//     modal.style.width = (wrapper.clientWidth * 0.7) + "px";
//     modal.style.maxHeight = (wrapper.clientHeight * 0.8) + "px";

   
//     const base = wrapper.clientHeight;
//     const title = modal.querySelector("h2");
//     const para = modal.querySelectorAll("p");
//     const button = modal.querySelector("button");

//     title.style.fontSize = (base * 0.04) + "px";
//     para.forEach(el => {
//         el.style.fontSize = (base * 0.04) + "px"
//     });
//     // para.style.fontSize = (base * 0.03) + "px";
//     button.style.fontSize = (base * 0.05) + "px";
//     button.style.padding = (base * 0.01) + "px " + (base * 0.015) + "px";
// }

//Utility helper da se ne duplira kod

function resizeAndLoadEvents(fns){
    fns.forEach(fn=>{
        window.addEventListener("resize",fn);
        window.addEventListener("load",fn);
    });
}

resizeAndLoadEvents([
    resizeAll
    // sizeImg,
    // sizeHistory,
    // sizeText,
    // sizeButtons,
    // resizeCards,
    // resizeModalWrapper
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
    console.log(ucitaneKarte);
    appendCards(ucitaneKarte);
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
        { src: 'images/gamble/0-min.png',  color: 'black' },
        { src: 'images/gamble/2-min.png', color: 'black' }
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
//Zvukovi

const Sound= Object.freeze({

    BlackButton : {
        id: 'black',
        src : 'sounds/BlackButtonClick.mp3',
        volume: '1.0'
    },
    RedButton : {
        id: 'red',
        src: 'sounds/RedButtonClick.mp3',
        volume: '1.0'
    },
    HelpButton : {
        id : 'help',
        src : 'sounds/ChangeHelp.mp3',
        volume : '1.0'
    },
    Win : {
        id: 'win',
        src : 'sounds/RedBlackWin.mp3',
        volume : '1.0'
    },
    Lose : {
        id: 'lose',
        src : 'sounds/RedBlackLose.mp3',
        volume :'1.0'
    },
    Gif : {
        id: 'gif',
        src : 'sounds/CardsMove.mp3',
        volume : '0.7',
        loop: true
    },
    Take : {
        id : 'take',
        src : 'sounds/ToCredit.mp3',
        volume : '1.0'
    }
});

const AudioHandler = {
    sounds: {},
    mode: "on", // "on" | "half" | "mute"
    volumeIcon: document.getElementById("volume"),

    init() {
        for (let key in Sound) {
            const soundData = Sound[key];
            const audio = new Audio(soundData.src);
            audio.volume = soundData.volume || 0.7;
            audio.loop = soundData.loop;
            this.sounds[soundData.id] = audio;
        }
    },

    play(id) {
        if (this.mode === "mute") return;
        const sound = this.sounds[id];
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        } else {
            console.warn("Zvuk nije pronađen:", id);
        }
    },

    stop(id) {
        const sound = this.sounds[id];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    },

    setVolume(id, value) {
        const sound = this.sounds[id];
        if (sound) {
            sound.volume = value;
        }
    },

    setMode(mode) {
        let newMode=mode;
        for (let x in Sound) {
            const soundData = Sound[x];
            const sound = this.sounds[soundData.id];
            if (sound) {
                if(newMode==="half")
                {
                    sound.volume=0.3;
                    this.volumeIcon.classList.replace("fa-volume-up", "fa-volume-down");
                }
                else if(newMode==="mute")
                {
                    sound.volume=0;
                    this.volumeIcon.classList.replace("fa-volume-down", "fa-volume-off");
                }
                else{
                    sound.volume=soundData.volume;
                    this.volumeIcon.classList.replace("fa-volume-off", "fa-volume-up");
                    if(soundData.id=='gif')
                        sound.play();
                }
                this.mode=newMode;
            }
        }
    },
    toggleMode() {
        if (this.mode === "on") {
            this.setMode("half");
        } else if (this.mode === "half") {
            this.setMode("mute");
        } else {
            this.setMode("on");
        }
    }
};

//     const AudioHandler={
//     sounds : {}, 
//     isMuted: false,
//     // soundPic: document.getElementById("mute-icon"),
//     volumeIcon: document.getElementById("volume"),
//     init () {
//         for (let key in Sound){
//             const soundData = Sound[key];
//             const audio = new Audio(soundData.src);
//             audio.volume= soundData.volume || 0.7;
//             audio.loop=soundData.loop;
//             this.sounds[soundData.id]=audio;
//         }
//     },
//     play(id){
//         if(this.isMuted) return;
//         const sound=this.sounds[id];
//         if(sound){
//             sound.currentTime=0;
//             sound.play();
//         }
//         else{
//             console.warn("Zvuk nije pronadjen",id);
//         }
//     },
//     stop(id){
//         const sound=this.sounds[id]
//         if(sound){
//             sound.pause();
//             sound.currentTime=0;
//         }
//     },
//     setVolume(id,value){
//         const sound=this.sounds[id];
//         if(sound){
//             sound.volume=value;
//         }
//     },
//     muteAll(){
//         this.isMuted=true;
//         for(let x in this.sounds)
//             this.sounds[x].volume=0;
//         this.volumeIcon.classList.replace("fa-volume-off","fa-volume-up");
//         // this.soundPic.src="images/sound-on.png"

//     },
//     unMuteAll(){
//         this.isMuted=false;
//         for (let x in Sound){
//             const soundData= Sound[x];
//             const sound = this.sounds[soundData.id];
//              if(sound) {
//                 sound.volume = soundData.volume;
//                 if(soundData.id=='gif')
//                     sound.play();
//                 // if(sound.id==6)
//                 //     sound.play();
//             }
//         }
//         this.volumeIcon.classList.replace("fa-volume-up","fa-volume-off");
//         // this.soundPic.src="images/sound-off.png"
//     },
//     toggleMute() {
//     if (this.isMuted) {
//         this.unMuteAll();
//     } else {
//         this.muteAll();
//     }
//     }
// };

// function playGifSound(){
//     const gifSound = document.getElementById("gif-sound");
//     gifSound.currentTime = 0;
//     gifSound.play();
//     gifSound.volume=0.4;
// }

// function playSound(type) {
//     const audio = new Audio(type === 'win' ? 'sounds/RedBlackWin.mp3' : 'sounds/RedBlackLose.mp3');
//     audio.play();
// }

// function stopGifSound() {
//     const gifSound = document.getElementById("gif-sound");
//     gifSound.volume=0;
    
// }
//--------------------------------------------------------------

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



function updateBackground() {
  const img = document.getElementById("pictureGamble");
  const aspect=window.innerWidth/window.innerHeight;
  if (aspect<1) {
    img.src = "images/gamble-background-portrait.png";
  } else {
    img.src = "images/gamble-background-min.png";
  }
}
const portraitMediaQuery = window.matchMedia("(orientation: portrait)");
portraitMediaQuery.addEventListener("change", updateBackground);
window.addEventListener("resize", updateBackground);
window.addEventListener("DOMContentLoaded", updateBackground);


//--------------------------------------

//da napravim 1 fju za yvuk preko enumarecije
//sve resize da stavim u 1 fju


//kad se pokrene igra da uvek ima 5k kredita, gamble amount je 50 i da se svaki put kad il izgubi il dodje do 5 da mu se doda/oduzme vrednost i nastavi igra
//zvuk dugme 3 nivo(mute,0,4,0,8)
//Kad se ucitava igra da se pita da li zeli zvuk ili ne
//portrait ako ostane vremena


//da odvojim js fajlove po zvuku, resize za landscape, resize za portrait, zajednice fju staviti u odvojen fajl i napraviti gettere
