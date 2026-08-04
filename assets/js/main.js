/*=========================================
  MOBILE MENU
=========================================*/

const menuToggle = document.querySelector(".menu-toggle");

const navbar = document.querySelector(".navbar");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navbar.classList.toggle("active");

    });

}


/*=========================================
  ACTIVE NAVIGATION
=========================================*/

const navLinks=document.querySelectorAll(".nav-list a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.forEach(item=>item.classList.remove("active"));

        link.classList.add("active");

    });

});