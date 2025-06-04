    function resizePortrait(){
    const glavniEl= document.getElementById("main-page");
    let width= window.innerWidth;
    let height= window.innerHeight;

    const modalWrapper= document.querySelector(".modal-wrapper");
    const modal = document.getElementById('modal');

    const ratio=9/16;

    if(width/height>ratio)
    {
        glavniEl.style.height=height+"px";
        glavniEl.style.width=(height*ratio)+"px";

        modalWrapper.style.height=height+"px";
        modalWrapper.style.width=(height*ratio)+"px";
    }
    else{
        glavniEl.style.width=width+"px";
        glavniEl.style.height=(width/ratio)+"px";
        
        modalWrapper.style.width=width+"px";
        modalWrapper.style.height=(width/ratio)+"px";
    }
    
    modal.style.maxWidth=(modalWrapper.clientWidth*0.8 )+ "px";
    modal.style.height=(modalWrapper.clientHeight*0.7)+"px";

    document.getElementById("win-button").classList.remove("hidden");

    const baseForAll= glavniEl.clientWidth;
    //Dugmici take,red,black
    const buttonsEl=document.querySelectorAll(".button");
    buttonsEl.forEach(e=>{
        e.style.fontSize=(baseForAll*0.04)+"px";
    })
    //History
    const historyEl= document.getElementById("history");
    historyEl.style.fontSize=(baseForAll*0.05)+"px";
    //Info i volume dugmici

    const infoBtn= document.getElementById("magic-button");
    const muteBtn=document.getElementById("mutebtn");
    const IconElementsI=document.querySelectorAll("i");
    const IconSize=baseForAll*0.09;

    IconElementsI.forEach(e=>{
        e.style.fontSize=(baseForAll*0.05)+"px";
    })

    muteBtn.style.width=IconSize+"px";
    muteBtn.style.height=IconSize+"px";

    infoBtn.style.width=IconSize+"px";
    infoBtn.style.height=IconSize+"px";
    
    //Div-ovi sa informacijama za gamble amount i ostalo
    const AmountLabelEl= document.querySelectorAll(".gamble-info-label");
    const AmountValueEl= document.querySelectorAll(".gamble-info-amount");

    AmountLabelEl.forEach(e=>{
        e.style.fontSize=(baseForAll*0.04)+"px";
    })
    AmountValueEl.forEach(e=>{
        e.style.fontSize=(baseForAll*0.05)+"px";
    })
    }