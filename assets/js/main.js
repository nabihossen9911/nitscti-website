/*=========================================
  MOBILE MENU
=========================================*/
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}


/*=========================================
  ACTIVE NAVIGATION
=========================================*/

const navLinks = document.querySelectorAll(".nav-list a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
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

/*====================================================
BACK TO TOP
====================================================*/

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/*====================================================
ACTIVE NAVIGATION
====================================================*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});

/*====================================================
SCROLLED HEADER
====================================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*====================================================
SMOOTH NAVIGATION
====================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ======================================================
// HERO COUNTER ANIMATION
// ======================================================

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    let current = 0;

    const increment = target / 100;

    const updateCounter = () => {
        current += increment;

        if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            if (target === 1000 || target === 20 || target === 95) {
                counter.innerText = target + "+";
            } else {
                counter.innerText = target;
            }
        }
    };

    updateCounter();
};

const heroSection = document.querySelector("#hero");

const heroObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            counters.forEach((counter) => animateCounter(counter));

            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.4,
    }
);

heroObserver.observe(heroSection);

// ======================================================
// MOBILE MENU TOGGLE
// ======================================================


menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});


/* =========================================
   MOBILE MENU TOGGLE
========================================= */
menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

const mobileLinks = document.querySelectorAll(".navbar a");
mobileLinks.forEach(link => {
    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });
});