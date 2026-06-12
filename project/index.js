// ============================================================
// MINEAGRO — interacciones de la página del proyecto
// ============================================================

// ----- Navbar: fondo al hacer scroll -----
const nav = document.getElementById('nav');

function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ----- Menú móvil -----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
    });
});

// ----- Aparición progresiva (scroll reveal) -----
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObserver.observe(el);
});

// ----- Contadores animados del hero -----
function animateCount(el) {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

// ----- Resaltar enlace activo según la sección visible -----
const sections = document.querySelectorAll('section[id]');
const linkMap = new Map(
    [...document.querySelectorAll('.nav__link')]
        .filter((link) => link.getAttribute('href').startsWith('#'))
        .map((link) => [link.getAttribute('href').slice(1), link])
);

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && linkMap.has(entry.target.id)) {
                linkMap.forEach((link) => link.classList.remove('is-active'));
                linkMap.get(entry.target.id).classList.add('is-active');
            }
        });
    },
    { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

// ----- Año dinámico del footer -----
document.getElementById('year').textContent = new Date().getFullYear();
