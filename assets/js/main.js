/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }

    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';

        // Keep the opened header visible after layout shift from closing others
        const header = this;
        const headerOffset = 80;

        requestAnimationFrame(() => {
            const rect = header.getBoundingClientRect();
            // If header shifted above visible area, smoothly scroll to keep it in view
            if (rect.top < headerOffset) {
                const targetPosition = window.pageYOffset + rect.top - headerOffset;
                const start = window.pageYOffset;
                const distance = targetPosition - start;
                const duration = 600;
                const startTime = performance.now();

                document.documentElement.style.scrollBehavior = 'auto';

                function scrollStep(currentTime) {
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    window.scrollTo(0, start + distance * ease);
                    if (progress < 1) {
                        requestAnimationFrame(scrollStep);
                    } else {
                        document.documentElement.style.scrollBehavior = '';
                    }
                }

                requestAnimationFrame(scrollStep);
            }
        });
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        })
        tab.classList.add('qualification__active');
    })
})

/*==================== ACCORDION CERTIFICATION ====================*/
const certificationContent = document.getElementsByClassName('certification__content'),
    certificationHeader = document.querySelectorAll('.certification__header');

function togglecertification() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < certificationContent.length; i++) {
        certificationContent[i].className = 'certification__content certification__close';
    }

    if (itemClass === 'certification__content certification__close') {
        this.parentNode.className = 'certification__content certification__open';
    }
}

certificationHeader.forEach((el) => {
    el.addEventListener('click', togglecertification);
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
};

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
});

modalCloses.forEach(modalClose => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute("id")

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
        } else {
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
        }
    })
}

window.addEventListener("scroll", scrollActive)


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);


/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__container, .about__container, .skills__container, .skills__subtitle, .skills__text, .qualification__container, .portfolio__container, .clients__container, .hobbies__container, .contact__container, .certification__container', {});
sr.reveal('.about__subtitle, .about__text, .skills__img, .contact__subtitle, .qualification__sections', { delay: 400 });
sr.reveal('.home__social, .about__info', { interval: 200 });
sr.reveal('.work__img, .contact__input', { interval: 200 }); 


/*==================== PARALLAX ABOUT IMAGE ====================*/
const aboutImg = document.querySelector('.about__img');
const homeImg = document.querySelector('.home__img');

if (aboutImg || homeImg) {
    window.addEventListener('scroll', () => {
        // Only apply parallax on desktop
        if (window.innerWidth < 768) {
            if (aboutImg) aboutImg.style.transform = '';
            if (homeImg) homeImg.style.transform = '';
            return;
        }

        const windowHeight = window.innerHeight;

        if (aboutImg) {
            const section = aboutImg.closest('.about__container');
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
                const center = sectionRect.top + sectionRect.height / 2 - windowHeight / 2;
                const offset = center * 0.1;
                aboutImg.style.transform = `translateY(${offset}px)`;
            }
        }

        if (homeImg) {
            const section = homeImg.closest('.home.section');
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
                const center = sectionRect.top + sectionRect.height / 2 - windowHeight / 2;
                const offset = center * 0.15;
                homeImg.style.transform = `translateY(${offset}px)`;
            }
        }
    });
}
