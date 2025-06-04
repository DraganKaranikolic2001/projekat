
function resizeLandscape(){

    const glavniEl= document.getElementById("main-page");
    let width= window.innerWidth;
    let height= window.innerHeight;

    const modalWrapper= document.querySelector(".modal-wrapper");
    const modal = document.getElementById('modal');

    const ratio=16/9;

    if((width/height)<ratio){
        glavniEl.style.width=width+"px";
        glavniEl.style.height=(width/ratio)+"px";

        modalWrapper.style.width=width+"px";
        modalWrapper.style.height=(width/ratio)+"px";
    }
    else{
        glavniEl.style.height=height+"px";
        glavniEl.style.width=(height*ratio)+"px";

        modalWrapper.style.height=height+"px";
        modalWrapper.style.width=(height*ratio)+"px";
    }
    //Modalni prozor sa svim elementima
    modal.style.maxHeight=(modalWrapper.clientHeight*0.8)+ "px";
    modal.style.width=(modalWrapper.clientWidth*0.7)+ "px";

    const baseForModal = modalWrapper.clientHeight;
    const titleModal= document.getElementById("titleModal");
    const paraModal= document.querySelectorAll("p");
    const buttonModal= document.querySelector('.x');

    titleModal.style.fontSize=(baseForModal*0.04)+ "px";
    paraModal.forEach( e=>{
        e.style.fontSize=(baseForModal*0.04)+"px";
    })
    buttonModal.style.fontSize=(baseForModal*0.04)+"px";
    buttonModal.style.padding= (baseForModal*0.01)+"px"+ (baseForModal*0.015)+"px";
    //-----------------------------------------------------------
    const baseForAll= glavniEl.clientHeight;

    //History
    const historyEl= document.getElementById("history");
    historyEl.style.fontSize=(baseForAll*0.05)+"px";
    //-----------------------------------------------------------

    //Div-ovi sa informacijama za gamble amount i ostalo
    const AmountLabelEl= document.querySelectorAll(".gamble-info-label");
    const AmountValueEl= document.querySelectorAll(".gamble-info-amount");

    AmountLabelEl.forEach(e=>{
        e.style.fontSize=(baseForAll*0.03)+"px";
    })
    AmountValueEl.forEach(e=>{
        e.style.fontSize=(baseForAll*0.04)+"px";
    })
    //------------------------------------------------------------

    //Dugmici

    const buttonsEl=document.querySelectorAll(".button");
    buttonsEl.forEach(e=>{
        e.style.fontSize=(baseForAll*0.04)+"px";
    })

    const infoBtn= document.getElementById("magic-button");
    const muteBtn=document.getElementById("mutebtn");
    const IconElementsI=document.querySelectorAll("i");
    const IconSize=baseForAll*0.09;

    IconElementsI.forEach(e=>{
        e.style.fontSize=(baseForAll*0.04)+"px";
    })

    muteBtn.style.width=IconSize+"px";
    muteBtn.style.height=IconSize+"px";

    infoBtn.style.width=IconSize+"px";
    infoBtn.style.height=IconSize+"px";

    if(!document.getElementById("history-card").hasChildNodes())
     document.getElementById("win-button").classList.add("hidden");

}