/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

if (mobileMenu && navLinks) {

    mobileMenu.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        mobileMenu.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            mobileMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

    if (scrollProgress) {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0
            ? (window.scrollY / scrollableHeight) * 100
            : 0;
        scrollProgress.style.width = `${progress}%`;
    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================================
   POINTER SPOTLIGHT + CARD TILT
========================================================= */

const cursorGlow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(
    ".skill-card, .project-card, .direction-card, .certificate-card"
);

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {

    window.addEventListener("pointermove", event => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
        cursorGlow.style.opacity = "1";
    });

    tiltCards.forEach(card => {
        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute("id");

            navigationLinks.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }

            });

        });

    },
    {
        threshold: 0.35
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("revealed");

            revealObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   HERO PHOTO 3D EFFECT
========================================================= */

const photoCard = document.querySelector(".photo-card");

if (photoCard && window.matchMedia("(pointer: fine)").matches) {

    photoCard.addEventListener("mousemove", event => {

        const rect = photoCard.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = (0.5 - y) * 12;

        photoCard.style.transform = `
            perspective(1200px)
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
        `;

    });


    photoCard.addEventListener("mouseleave", () => {

        photoCard.style.transform = `
            perspective(1200px)
            rotateY(-8deg)
            rotateX(4deg)
        `;

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") {
        return;
    }

    if (navLinks) {
        navLinks.classList.remove("open");
    }

    if (mobileMenu) {
        mobileMenu.setAttribute(
            "aria-expanded",
            "false"
        );
    }

});


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%cRACHITH.KM",
    "font-size:18px;font-weight:800;"
);

console.log(
    "AI × Data × Backend × Cloud"
);