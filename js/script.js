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
const shardOffsets = [
    [-38, -36, -7], [4, -52, 4], [42, -28, 8],
    [-54, -4, -5], [0, 0, 0], [56, 12, 6],
    [-48, 26, -8], [6, 38, 3], [50, 30, 7],
    [-34, 48, -6], [2, 54, 5], [44, 42, 8]
];
const skillScatter = [
    [-330, -100, -310, -13], [300, -92, -350, 11],
    [-360, 72, -390, -10], [350, 74, -430, 12],
    [-230, 210, -470, -8], [250, 208, -510, 9]
];

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

function updateScrollScene() {
    const hero = document.querySelector(".hero");

    if (!hero) return;

    const scrollOffset = Math.min(window.scrollY, window.innerHeight);
    hero.style.setProperty("--hero-content-shift", `${scrollOffset * -0.08}px`);
    hero.style.setProperty("--hero-visual-shift", `${scrollOffset * 0.14}px`);

    const shardProgress = Math.min(window.scrollY / 420, 1);
    const photoShards = document.querySelector(".photo-shards");

    if (photoShards) {
        photoShards.style.setProperty("--shard-progress", shardProgress.toFixed(3));

        photoShards.querySelectorAll(".shard").forEach((shard, index) => {
            const [x, y, rotation] = shardOffsets[index];
            shard.style.setProperty("--shard-x", `${x * shardProgress}px`);
            shard.style.setProperty("--shard-y", `${y * shardProgress}px`);
            shard.style.setProperty("--shard-rotate", `${rotation * shardProgress}deg`);
        });
    }

    const skillsSection = document.querySelector(".skills-section");

    if (skillsSection) {
        const sectionTop = skillsSection.getBoundingClientRect().top + window.scrollY;
        const sectionProgress = Math.max(
            0,
            Math.min(1, (window.scrollY - sectionTop + window.innerHeight * 0.72) / 620)
        );
        const skillCards = skillsSection.querySelectorAll(".skill-card");

        skillCards.forEach((card, index) => {
            const [scatterX, scatterY, scatterZ, scatterRotation] = skillScatter[index];
            const cardProgress = Math.max(
                0,
                Math.min(1, (sectionProgress - index * 0.075) / 0.55)
            );
            const remaining = 1 - cardProgress;

            card.style.setProperty("--skill-x", `${scatterX * remaining}px`);
            card.style.setProperty("--skill-y", `${scatterY * remaining}px`);
            card.style.setProperty("--skill-z", `${scatterZ * remaining}px`);
            card.style.setProperty("--skill-rotate", `${scatterRotation * remaining}deg`);
            card.style.setProperty("--skill-tilt", `${18 * remaining}deg`);
            card.style.setProperty("--skill-blur", `${8 * remaining}px`);
            card.style.setProperty("--skill-opacity", `${0.16 + cardProgress * 0.84}`);
        });

        const learningScatter = [
            [-230, -55, -180], [220, -45, -210],
            [-250, 36, -240], [240, 40, -270], [120, 110, -300]
        ];
        const learningItems = skillsSection.querySelectorAll(".learning-items > div");

        learningItems.forEach((item, index) => {
            const [scatterX, scatterY, scatterZ] = learningScatter[index];
            const itemProgress = Math.max(
                0,
                Math.min(1, (sectionProgress - 0.35 - index * 0.06) / 0.42)
            );
            const remaining = 1 - itemProgress;

            item.style.setProperty("--learning-x", `${scatterX * remaining}px`);
            item.style.setProperty("--learning-y", `${scatterY * remaining}px`);
            item.style.setProperty("--learning-z", `${scatterZ * remaining}px`);
            item.style.setProperty("--learning-tilt", `${14 * remaining}deg`);
            item.style.setProperty("--learning-opacity", `${0.14 + itemProgress * 0.86}`);
        });
    }
}

window.addEventListener("scroll", () => {
    updateNavbar();
    updateScrollScene();
}, { passive: true });

updateNavbar();
updateScrollScene();


/* =========================================================
   POINTER SPOTLIGHT + CARD TILT
========================================================= */

const cursorGlow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(
    ".skill-card, .project-card, .direction-card, .certificate-card, .github-card"
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

            const replayOnScroll = entry.target.matches(
                ".skills-grid .skill-card, .projects-section .project-card, .projects-section .project-featured, .certifications-section .certificate-card"
            );

            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            } else if (replayOnScroll) {
                entry.target.classList.remove("revealed");
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

document.querySelectorAll(".hero .reveal").forEach(element => {
    element.classList.add("revealed");
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