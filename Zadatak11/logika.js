const slika=document.getElementById("pictureGamble")

function sizeImg()
{
    const el=document.getElementById("main-page");
    const width=window.innerWidth;
    const height=window.innerHeight;
    //console.log(width);
    //console.log(height);
    el.style.width=width+"px";
    console.log(slika.style.width);
    el.style.height=height+"px";
    console.log(slika.style.height);
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
/*function resizeCards(){
    const el1=document.getElementById("gamble-box-id");
    el1.style.height=height*0.5;
    el1.style.width=width*0.7;

}*/

sizeImg();

window.addEventListener('resize',sizeImg);
console.log(slika.style.width,slika.style.height);

