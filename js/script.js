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

    const studentCard = document.querySelector(".student-card");

    if (studentCard) {
        const cardProgress = Math.min(window.scrollY / 520, 1);
        studentCard.style.setProperty("--card-scroll-rotate", `${cardProgress * 8}deg`);
        studentCard.style.setProperty("--card-scroll-tilt", `${cardProgress * 2}deg`);
        studentCard.style.setProperty("--card-scroll-y", `${cardProgress * 24}px`);
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

const tourGuide = document.getElementById("tourGuide");
const tourGuideBubble = document.getElementById("tourGuideBubble");
const tourGuideMessage = document.getElementById("tourGuideMessage");
const tourGuideToggle = document.getElementById("tourGuideToggle");
const tourGuideMessages = {
    home: "This is Rachith’s resume. View it or download a copy using the buttons below.",
    about: "This is Rachith — a B.Tech AI & Data Science student building practical systems.",
    journey: "Here’s the journey: foundations first, then real-world building.",
    skills: "These are the tools Rachith uses to turn ideas into working products.",
    certifications: "A few certifications that support his learning path.",
    projects: "Now let’s look at the projects where AI, data and backend work meet.",
    direction: "Here’s where Rachith is heading: intelligent systems built with AI, data and engineering.",
    github: "You can explore more experiments and code on GitHub.",
    contact: "Want to build something useful together? Start a conversation with Rachith."
};

let activeGuideSection = document.getElementById("home");
let lastGuideMessage = tourGuideMessage ? tourGuideMessage.textContent : "";
let guideTypingTimer = null;
let resumeCueActive = false;
let guideIntroActive = true;
const guideIntroDuration = 4500;
let activeJourneyItem = null;
const journeyGuideMessages = [
    "He started in 2024 by building programming fundamentals and exploring AI and Data Science.",
    "In 2025, he went deeper into Python and moved into web and backend development.",
    "In 2026, he began building practical projects with data, AI, analytics and developer tools.",
    "Now he is combining AI, Data, Backend and Cloud while strengthening problem-solving skills."
];
let activeSkillCard = null;
let activeSkillIndex = 0;
let activeDirectionCard = null;
let activeDirectionIndex = 0;
let activeProjectCard = null;
let activeProjectIndex = 0;
const skillGuideMessages = [
    "Programming is the foundation: Python, Java, object-oriented programming and DSA.",
    "Data Science turns information into insight with NumPy, Pandas, SQL and Excel.",
    "Backend development helps him build useful web applications, APIs and services.",
    "Databases support the systems he builds, from SQL foundations to MongoDB Atlas.",
    "AI and Machine Learning connect his programming and data skills to intelligent solutions.",
    "Cloud and developer tools help him collaborate, deploy and keep building reliably."
];
const directionGuideMessages = [
    "He enjoys building intelligent applications that combine AI, data and backend systems to solve real problems.",
    "Right now, he is learning across AI, Data, Engineering, Java, DSA, Cloud, Python and SQL.",
    "His goal is to become a strong AI and Data professional who can build scalable intelligent systems."
];

function getProjectCards() {
    if (!activeGuideSection || activeGuideSection.id !== "projects") {
        return [];
    }

    return [...activeGuideSection.querySelectorAll(".project-featured, .project-card")]
        .sort((first, second) => {
            const getSerial = card => {
                const label = card.querySelector(".project-meta, .project-card-header");
                const match = label?.textContent.match(/(\d+)\s*\//);
                return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
            };

            return getSerial(first) - getSerial(second);
        });
}

function getProjectGuideMessage(card, index) {
    const name = card.querySelector("h3")?.textContent.trim() || "this project";
    const projectStatus = card.querySelector(".project-status");

    if (projectStatus) {
        return `Project ${index + 1}, ${name}. Currently learning and building.`;
    }

    const description = card.querySelector(".project-description, p")?.textContent
        .replace(/\s+/g, " ")
        .trim();
    const links = [...card.querySelectorAll(".project-link")].filter(link => {
        const href = link.getAttribute("href");
        return href && href !== "#";
    });
    const hasGitHub = links.some(link => /github/i.test(link.textContent));
    const hasDemo = links.some(link => /demo/i.test(link.textContent));
    const actions = [];

    if (hasGitHub) {
        actions.push("View it on GitHub");
    }

    if (hasDemo) {
        actions.push("open the demo");
    }

    const actionMessage = actions.length
        ? ` You can ${actions.join(" and ")} using the links on the card.`
        : "";

    return `Project ${index + 1}, ${name}. ${description || "A practical project in Rachith’s learning journey."}${actionMessage}`;
}

function moveTourGuide() {
    if (!tourGuide || !activeGuideSection) return;

    const shouldShowResumeCue =
        activeGuideSection.id === "home" &&
        !guideIntroActive &&
        window.scrollY > 90;

    if (activeGuideSection.id === "home" && shouldShowResumeCue !== resumeCueActive) {
        resumeCueActive = shouldShowResumeCue;
        readTourGuideMessage(
            shouldShowResumeCue
                ? tourGuideMessages.home
                : "Hi, I’m Rachith’s AI guide. Scroll to explore his work."
        );
    }

    let anchor = activeGuideSection.querySelector(".section-heading") ||
        activeGuideSection.querySelector(".hero-content") ||
        activeGuideSection;
    let positionBesideAnchor = false;

    if (activeGuideSection.id === "home" && shouldShowResumeCue) {
        anchor = activeGuideSection.querySelector(".hero-actions");
    }

    if (activeGuideSection.id === "contact") {
        anchor = activeGuideSection.querySelector(".contact-cta") || anchor;
    }

    if (activeGuideSection.id === "journey") {
        const journeyItems = [...activeGuideSection.querySelectorAll(".timeline-item")];
        const viewportTarget = window.innerHeight * 0.42;
        const visibleItems = journeyItems.filter(item => {
            const rect = item.getBoundingClientRect();
            return rect.bottom > 80 && rect.top < window.innerHeight * 0.82;
        });
        const journeyItem = visibleItems.sort((first, second) => {
            const firstRect = first.getBoundingClientRect();
            const secondRect = second.getBoundingClientRect();
            return Math.abs(firstRect.top + firstRect.height / 2 - viewportTarget) -
                Math.abs(secondRect.top + secondRect.height / 2 - viewportTarget);
        })[0];

        if (journeyItem) {
            const journeyIndex = journeyItems.indexOf(journeyItem);
            anchor = journeyItem.querySelector(".timeline-content") || journeyItem;
            positionBesideAnchor = true;

            if (journeyItem !== activeJourneyItem) {
                activeJourneyItem = journeyItem;
                readTourGuideMessage(journeyGuideMessages[journeyIndex]);
            }
        }
    } else {
        activeJourneyItem = null;
    }

    if (activeGuideSection.id === "skills") {
        const skillCards = [...activeGuideSection.querySelectorAll(".skill-card")];
        const sectionTop = activeGuideSection.getBoundingClientRect().top + window.scrollY;
        const sectionScrollRange = Math.max(
            1,
            activeGuideSection.offsetHeight - window.innerHeight
        );
        const skillProgress = Math.max(
            0,
            Math.min(0.999, (window.scrollY - sectionTop + 80) / sectionScrollRange)
        );
        const targetSkillIndex = Math.min(
            skillCards.length - 1,
            Math.floor(skillProgress * skillCards.length)
        );
        const skillIndex = Math.max(
            activeSkillIndex - 1,
            Math.min(activeSkillIndex + 1, targetSkillIndex)
        );
        const skillCard = skillCards[skillIndex];

        if (skillCard) {
            anchor = skillCard;
            positionBesideAnchor = true;

            if (skillCard !== activeSkillCard) {
                activeSkillCard = skillCard;
                activeSkillIndex = skillIndex;
                readTourGuideMessage(skillGuideMessages[skillIndex]);
            }
        }
    } else {
        activeSkillCard = null;
        activeSkillIndex = 0;
    }

    if (activeGuideSection.id === "direction") {
        const directionCards = [...activeGuideSection.querySelectorAll(".direction-card")];
        const sectionTop = activeGuideSection.getBoundingClientRect().top + window.scrollY;
        const sectionScrollRange = Math.max(
            1,
            activeGuideSection.offsetHeight - window.innerHeight
        );
        const directionProgress = Math.max(
            0,
            Math.min(0.999, (window.scrollY - sectionTop + 80) / sectionScrollRange)
        );
        const directionIndex = Math.min(
            directionCards.length - 1,
            Math.floor(directionProgress * directionCards.length)
        );
        const directionCard = directionCards[directionIndex];

        if (directionCard) {
            anchor = directionCard;
            positionBesideAnchor = true;

            if (directionCard !== activeDirectionCard) {
                activeDirectionCard = directionCard;
                activeDirectionIndex = directionIndex;
                readTourGuideMessage(directionGuideMessages[directionIndex]);
            }
        }
    } else {
        activeDirectionCard = null;
        activeDirectionIndex = 0;
    }

    if (activeGuideSection.id === "projects") {
        if (activeProjectCard) {
            anchor = activeProjectCard;
            positionBesideAnchor = true;
        }
    } else {
        activeProjectCard = null;
        activeProjectIndex = 0;
    }

    const anchorRect = anchor.getBoundingClientRect();
    const guideWidth = tourGuide.getBoundingClientRect().width;
    const guideHeight = tourGuide.getBoundingClientRect().height;
    const sidePosition = positionBesideAnchor
        ? anchorRect.left - guideWidth - 18
        : anchorRect.right - guideWidth;
    const left = Math.min(Math.max(16, sidePosition), window.innerWidth - guideWidth - 16);
    const top = Math.min(
        Math.max(80, anchorRect.top + 12),
        window.innerHeight - guideHeight - 16
    );

    tourGuide.style.left = `${left}px`;
    tourGuide.style.top = `${top}px`;
}

function readTourGuideMessage(message) {
    if (!tourGuideMessage || message === lastGuideMessage) {
        return;
    }

    window.clearInterval(guideTypingTimer);
    lastGuideMessage = message;
    tourGuideMessage.textContent = "";
    if (tourGuide) {
        tourGuide.classList.add("is-reading");
    }

    let characterIndex = 0;
    guideTypingTimer = window.setInterval(() => {
        tourGuideMessage.textContent += message[characterIndex];
        characterIndex += 1;

        if (characterIndex >= message.length) {
            window.clearInterval(guideTypingTimer);
            if (tourGuide) {
                tourGuide.classList.remove("is-reading");
            }
        }
    }, 24);
}

const tourGuideObserver = new IntersectionObserver(
    entries => {
        entries
            .filter(entry => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)
            .slice(0, 1)
            .forEach(entry => {
                const message = tourGuideMessages[entry.target.id];

                if (message && tourGuideBubble && tourGuideMessage) {
                    activeGuideSection = entry.target;
                    if (entry.target.id !== "home") {
                        resumeCueActive = false;
                    }
                    if (!(entry.target.id === "home" && guideIntroActive)) {
                        readTourGuideMessage(message);
                    }
                    moveTourGuide();
                }
            });
    },
    {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-12% 0px -32% 0px"
    }
);

if (tourGuide && tourGuideBubble) {
    sections.forEach(section => {
        tourGuideObserver.observe(section);
    });
}

if (tourGuide && tourGuideToggle) {
    tourGuideToggle.addEventListener("click", () => {
        const isMuted = tourGuide.classList.toggle("is-muted");
        tourGuideToggle.setAttribute("aria-pressed", isMuted ? "true" : "false");
        tourGuideToggle.textContent = isMuted ? "Show guide" : "Hide guide";
    });
}

const projectsSection = document.getElementById("projects");

if (projectsSection) {
    projectsSection
        .querySelectorAll(".project-featured, .project-card")
        .forEach(card => {
            card.addEventListener("pointerenter", () => {
                activeGuideSection = projectsSection;
                const projectCards = getProjectCards();
                activeProjectCard = card;
                activeProjectIndex = projectCards.indexOf(card);
                readTourGuideMessage(
                    getProjectGuideMessage(card, activeProjectIndex)
                );
                moveTourGuide();
            });
        });

    const projectHub = projectsSection.querySelector(".project-hub");

    if (projectHub) {
        projectHub.addEventListener("pointerenter", () => {
            activeGuideSection = projectsSection;
            activeProjectCard = projectHub;
            activeProjectIndex = -1;
            readTourGuideMessage(
                "This is the Project Hub. Explore it to find more experiments, practice work and projects."
            );
            moveTourGuide();
        });
    }
}

window.addEventListener("scroll", moveTourGuide, { passive: true });
window.addEventListener("resize", moveTourGuide);
window.setTimeout(moveTourGuide, 0);
window.setTimeout(() => {
    guideIntroActive = false;
    moveTourGuide();
}, guideIntroDuration);


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
   HERO STUDENT CARD 3D EFFECT
========================================================= */

const studentCard = document.querySelector(".student-card");

if (studentCard && window.matchMedia("(pointer: fine)").matches) {

    studentCard.addEventListener("mousemove", event => {

        const rect = studentCard.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const rotateY = (x - 0.5) * 12;
        const rotateX = (0.5 - y) * 12;

        studentCard.style.setProperty("--card-pointer-rotate-y", `${rotateY}deg`);
        studentCard.style.setProperty("--card-pointer-rotate-x", `${rotateX}deg`);

    });


    studentCard.addEventListener("mouseleave", () => {
        studentCard.style.removeProperty("--card-pointer-rotate-y");
        studentCard.style.removeProperty("--card-pointer-rotate-x");

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