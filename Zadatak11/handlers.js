//Handler za modalni prozor
const modalWindow={
    magic : document.querySelector(".info-button"),
    modal : document.querySelector(".modal"),
    x : document.querySelector(".x"),
    overlay : document.querySelector(".overlay"),

    open(){
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        AudioHandler.play('help');
        AudioHandler.stop('gif');
    },
    close(){
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        AudioHandler.play("gif");
    },
    Events(){
        this.magic.addEventListener('click',()=>this.open());
        this.x.addEventListener('click',()=>this.close());
        this.overlay.addEventListener('click', ()=>this.close());
    }
}
//-----------------------------------------------------------------
//Prozor za zvuk na pocetku ucitavanja igrice(handler)
const introHandler={
    doc1 : document.querySelector(".intro-button-yes"),
    doc2 : document.querySelector(".intro-button-no"),
    intro : document.querySelector('.intro'),
    volumeIcon: document.getElementById("volume"),
    yesSound() {
        this.intro.style.display="none";
        AudioHandler.setMode("on");
     },
    noSound () {
        this.intro.style.display="none";
    },
    introEvents(){
        this.doc1.addEventListener("click",()=>this.yesSound());
        this.doc2.addEventListener("click",()=>this.noSound());
    } 

}
//-------------------------------------------------
