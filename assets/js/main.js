/*==================== PWA SERVICE WORKER ====================*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.error('ServiceWorker registration failed:', err));
    });
}

/*==================== FOUC FIX — show body once DOM is ready ====================*/
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('ready');
});

/*==================== SKILLS RENDERING ====================*/
const DEVICONS_BASE = 'https://devicons.io/devicons/icons/';

const skillSections = [
    {
        id: 'skills-programming',
        items: [
            { name: 'Java', icon: 'java' },
            { name: 'JavaScript', icon: 'javascript' },
            { name: 'TypeScript', icon: 'typescript-icon' },
            { name: 'HTML', icon: 'html-5' },
            { name: 'Groovy', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg' },
            { name: 'Dart', icon: 'dart' },
            { name: 'CSS', icon: 'css-3' },
            { name: 'Python', icon: 'python' },
            { name: 'YAML', icon: 'yaml' },
            { name: 'JSON', icon: 'json' }
        ]
    },
    {
        id: 'skills-engineering',
        items: [
            { name: 'Cucumber', icon: 'cucumber' },
            { name: 'NodeJS', icon: 'nodejs-icon' },
            { name: 'Curl', icon: 'curl' },
            { name: 'SoapUI Pro', iconUrl: 'https://avatars.githubusercontent.com/u/1644671?s=200&v=4' },
            { name: 'Postman', icon: 'postman-icon' },
            { name: 'Deque', iconUrl: 'https://avatars.githubusercontent.com/u/4094299?s=200&v=4' },
            { name: 'GitHub', icon: 'github-icon' },
            { name: 'Bitbucket', icon: 'bitbucket' },
            { name: 'Jenkins', icon: 'jenkins' },
            { name: 'GitLab', icon: 'gitlab' },
            { name: 'GitHub Actions', icon: 'github-actions' },
            { name: 'Gitkraken', icon: 'gitkraken' },
            { name: 'Maven', icon: 'maven' },
            { name: 'JUnit', iconClass: 'devicon-junit-plain colored' },
            { name: 'TestNG', iconUrl: 'https://avatars.githubusercontent.com/u/12528662?s=200&v=4' },
            { name: 'Log4J', icon: 'apache' },
            { name: 'Lighthouse', icon: 'lighthouse' },
            { name: 'Selenoid', iconUrl: 'https://avatars.githubusercontent.com/u/26328913?s=200&v=4' },
            { name: 'Wiremock', iconUrl: 'https://avatars.githubusercontent.com/u/21368587?s=200&v=4' },
            { name: 'npm', icon: 'npm-icon' },
            { name: 'Babel', iconClass: 'devicon-babel-plain colored' },
            { name: 'GraphQL', icon: 'graphql' },
            { name: 'Docker', icon: 'docker-icon' },
            { name: 'Sonarqube', icon: 'sonarqube' },
            { name: 'Grafana', icon: 'grafana' },
            { name: 'Bash', icon: 'bash-icon' },
            { name: 'Shell', iconClass: 'devicon-powershell-plain colored' },
            { name: 'Dynatrace', icon: 'dynatrace' },
            { name: 'ESLint', icon: 'eslint' },
            { name: 'Google Analytics', icon: 'google-analytics' },
            { name: 'Homebrew', icon: 'homebrew' },
            { name: 'Prettier', icon: 'prettier' },
            { name: 'Qlik', icon: 'qlik' },
            { name: 'Swagger', icon: 'swagger' },

        ]
    },
    {
        id: 'skills-ai-optimization',
        items: [
            { name: 'MCP', icon: 'mcp-icon' },
            { name: 'GitHub Copilot', icon: 'github-copilot' },
            { name: 'LangChain', icon: 'langchain' },
            { name: 'AutoGen', iconUrl: 'https://camo.githubusercontent.com/2905ec919ee215233fc90a7fa9303c96f4526e9e25d9f0cd1d0cd590f4a6a5e1/68747470733a2f2f6d6963726f736f66742e6769746875622e696f2f6175746f67656e2f302e322f696d672f61672e737667' },
            { name: 'Antigravity', iconUrl: "https://avatars.githubusercontent.com/u/242056456?s=200&v=4" },
            { name: 'Kiro', iconUrl: "https://avatars.githubusercontent.com/u/207925904?s=200&v=4" },
            { name: 'JetBrains', icon: 'jetbrains-icon' },
            { name: 'VS Code', iconClass: 'devicon-vscode-plain colored' },
            { name: 'Claude', icon: 'claude-icon' },
            { name: 'Cursor', icon: 'cursor-icon' }

        ]
    },
    {
        id: 'skills-ai-tools',
        items: [
            { name: 'F.R.I.D.A.Y', subtitle: 'Suit for the Stock Market' },
            { name: 'WIT', subtitle: 'Test Intelligence Agent' },
            { name: 'SAGE', subtitle: 'Defect Intelligence & Prevention' },
            { name: 'ASK', subtitle: 'Profile to Position' },
        ]
    },
    {
        id: 'skills-frameworks',
        items: [
            { name: 'Selenium', icon: 'selenium' },
            { name: 'Appium', icon: 'appium' },
            { name: 'WebdriverIO', iconUrl: 'https://raw.githubusercontent.com/webdriverio/webdriverio/master/website/static/img/webdriverio.png' },
            { name: 'Playwright', icon: 'playwright' },
            { name: 'Flutter Integration Test', icon: 'flutter', nameStyle: 'font-size:0.75em;' },
            { name: 'Puppeteer', icon: 'puppeteer' },
            { name: 'Cinnamon' },
            { name: 'REST-Assured', iconUrl: 'https://avatars.githubusercontent.com/u/19369327?s=200&v=4' },
            { name: 'Carina', iconUrl: 'https://avatars.githubusercontent.com/u/59013197?s=200&v=4' },
            { name: 'Allure', iconUrl: 'https://avatars.githubusercontent.com/u/5879127?s=200&v=4' },
            { name: 'Cypress', icon: 'cypress-icon' }
        ]
    },
    {
        id: 'skills-uxui',
        items: [
            { name: 'Photoshop', iconClass: 'devicon-photoshop-plain colored' },
            { name: 'Adobe Lightroom' },
            { name: 'iMovie' },
            { name: 'Figma', icon: 'figma' },
        ]
    },
    {
        id: 'skills-test-management',
        items: [
            { name: 'Jira', icon: 'jira' },
            { name: 'Xray', icon: 'xray' },
            { name: 'Quality Center' },
            { name: 'Confluence', icon: 'confluence' },
            { name: 'Slack', icon: 'slack-icon' },
            { name: 'Trello', icon: 'trello' },
            { name: 'ReportPortal', iconUrl: 'https://avatars.githubusercontent.com/u/17636279?s=200&v=4' },
            { name: 'Applitools', icon: 'applitools-icon' },
        ]
    },
    {
        id: 'skills-cloud',
        items: [
            { name: 'Firebase', icon: 'firebase-icon' },
            { name: 'Perfecto', iconUrl: 'https://avatars.githubusercontent.com/u/17961151?s=200&v=4' },
            { name: 'Headspin', iconUrl: 'https://avatars.githubusercontent.com/u/104040852?s=200&v=4' },
            { name: 'Saucelabs', iconUrl: 'https://avatars.githubusercontent.com/u/88837?s=200&v=4' },
            { name: 'BrowserStack', iconClass: 'devicon-browserstack-plain colored' },
            { name: 'AWS', icon: 'aws' },
        ]
    },
    {
        id: 'skills-technologies',
        items: [
            { name: 'Flutter', icon: 'flutter' },
            { name: 'Adobe', iconUrl: 'https://avatars.githubusercontent.com/u/476009?s=200&v=4' },
            { name: 'iOS', icon: 'apple' },
            { name: 'Android', icon: 'android' },
            { name: 'Hybris', iconUrl: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Hybris_company_%28SAP%29_logo.jpg' },
            { name: 'React', iconClass: 'devicon-react-original colored' },
            { name: 'Cordova', icon: 'cordova' },
            { name: 'Algolia', icon: 'algolia-icon' },
            { name: '.NET', icon: 'dotnet' },
        ]
    },
    {
        id: 'skills-databases',
        items: [
            { name: 'MongoDB', icon: 'mongodb-icon' },
            { name: 'Elasticsearch', icon: 'elasticsearch' },
        ]
    },
    {
        id: 'skills-languages',
        items: [
            { name: 'English' },
            { name: 'Tamil' },
            { name: 'Kannada' },
            { name: 'Hindi' },
        ]
    },
];

function renderSkillIcon(item) {
    if (item.iconClass) {
        return `<i class="${item.iconClass}"></i>`;
    }
    const src = item.icon
        ? `${DEVICONS_BASE}${item.icon}.svg`
        : item.iconUrl || null;
    if (src) {
        return `<p class="skills__image"><img src="${src}" alt="${item.name}" loading="lazy" /></p>`;
    }
    return '';
}

function renderSkillItem(item) {
    const style = item.nameStyle ? ` style="${item.nameStyle}"` : '';
    const nameHtml = item.subtitle
        ? `<span style="display:block;line-height:0.8;">${item.name}<br><span style="font-size:0.65em;font-weight:normal;opacity:0.75;">${item.subtitle}</span></span>`
        : item.name;
    return `
    <div class="skills__data">
        <div class="skills__titles">
            <h3 class="skills__name"${style}>${nameHtml}</h3>
            ${renderSkillIcon(item)}
        </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    skillSections.forEach(({ id, items }) => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = items.map(renderSkillItem).join('');
        }
    });
});


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

    for (let i = 0; i < skillsContent.length; i++) {
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

    for (let i = 0; i < certificationContent.length; i++) {
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
// Cache DOM references once — avoid repeated querySelector on every scroll
const headerEl = document.getElementById('header');
const scrollUpEl = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
        if (!link) return;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}

function scrollHeader() {
    if (window.scrollY >= 80) {
        headerEl.classList.add('scroll-header');
    } else {
        headerEl.classList.remove('scroll-header');
    }
}

function scrollUp() {
    if (window.scrollY >= 560) {
        scrollUpEl.classList.add('show-scroll');
    } else {
        scrollUpEl.classList.remove('show-scroll');
    }
}

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

sr.reveal('.home__container, .section__title, .section__subtitle, .about__container, .skills__container, .skills__subtitle, .skills__text, .qualification__container, .portfolio__container, .clients__container, .hobbies__container, .contact__container, .certification__container', {});
sr.reveal('.about__subtitle, .about__text, .skills__img, .contact__subtitle, .qualification__sections', { delay: 400 });
sr.reveal('.home__social, .about__info', { interval: 200 });
sr.reveal('.work__img, .contact__input', { interval: 200 });


/*==================== PARALLAX ABOUT IMAGE ====================*/
const aboutImg = document.querySelector('.about__img');
const homeImg = document.querySelector('.home__img');

function runParallax() {
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
            aboutImg.style.transform = `translateY(${center * 0.1}px)`;
        }
    }
    if (homeImg) {
        const section = homeImg.closest('.home.section');
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
            const center = sectionRect.top + sectionRect.height / 2 - windowHeight / 2;
            homeImg.style.transform = `translateY(${center * 0.15}px)`;
        }
    }
}

/*==================== SINGLE RAF-THROTTLED SCROLL LISTENER ====================*/
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            scrollActive();
            scrollHeader();
            scrollUp();
            if (aboutImg || homeImg) runParallax();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });
