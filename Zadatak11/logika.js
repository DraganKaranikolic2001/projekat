const slika=document.getElementById("pictureGamble")

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

function resizeCards(){
    const el1=document.getElementById("gamble-box-id");
    const width=window.innerWidth;
    const height=window.innerHeight;
    el1.style.height=height*0.8;
    el1.style.width=width*0.8;

}

/*document.getElementById("magic-button").addEventListener("click", function(){
    window.open("https://www.google.com","_blank","width=800,height=600,top=100,left=100")
});*/
// document.getElementById("info-button").addEventListener("click", function () {
//     window.open("info.html", "_blank", "toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=" + screen.width + ",height=" + screen.height);
// });


window.addEventListener('resize',sizeImg);
window.addEventListener('resize',sizeHistory);
window.addEventListener('resize',resizeCards);
window.addEventListener('resize',sizeText);


