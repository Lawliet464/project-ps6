let premiereCarte = null;
let deuxiemeCarte = null;
let estBloque = false;
 
let button = document.getElementById("btnCommencer");
button.addEventListener("click", function(){
    let accueil = document.getElementById("accueil");
    let jeu = document.getElementById("jeu");
    accueil.style.display ="none";
    jeu.style.display = "block";

 })


let cartes = document.querySelectorAll(".carte");
cartes.forEach(function(carte){
   carte.addEventListener("click", function(){
      if(estBloque == true) return;
      carte.classList.add("retournee");
      if (premiereCarte == null) premiereCarte = carte;
      else {
         deuxiemeCarte = carte;
         estBloque = true; 
         if(premiereCarte.querySelector(".face").textContent ==
         deuxiemeCarte.querySelector(".face").textContent){
            console.log("Bonne paire!!");
            premiereCarte = null;
            deuxiemeCarte = null;
            estBloque = false; 
         } 
         else {
            console.log("mauvaise paire !");     
            setTimeout(function(){
            premiereCarte.classList.remove("retournee");
            deuxiemeCarte.classList.remove("retournee");
            premiereCarte = null;
            deuxiemeCarte = null;
            estBloque = false;
         }, 1000);
   }
      }
           
   })
})
