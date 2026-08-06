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


/*==============================================
FAQ ACCORDION
==============================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = button.querySelector("span:last-child");

    answer.style.display = "none";

    button.addEventListener("click", () => {

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {
                otherItem.querySelector(".faq-answer").style.display = "none";
                otherItem.querySelector("span:last-child").textContent = "+";
            }

        });

        if (answer.style.display === "block") {
            answer.style.display = "none";
            icon.textContent = "+";
        } else {
            answer.style.display = "block";
            icon.textContent = "−";
        }

    });

});

/*====================================================
SCROLL REVEAL
====================================================*/
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});