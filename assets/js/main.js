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


/*=========================================
    DARK / LIGHT MODE
=========================================*/
const themeToggle = document.getElementById("theme-toggle");
/* Load saved theme */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

/* Toggle Theme */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});