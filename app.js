class SiteExperience {
    constructor() {
        this.navbar = document.getElementById('mainNavbar');
        this.backToTop = document.getElementById('backToTop');
        this.cookieBanner = document.getElementById('cookieBanner');
        this.acceptCookies = document.getElementById('acceptCookies');
        this.revealItems = document.querySelectorAll('.reveal');
        this.navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
        this.sectionIds = ['inicio', 'sobre', 'credenciais', 'areas', 'casos', 'metodo', 'testimonials', 'faq', 'contato'];
        this.scrollTicking = false;
    }

    init() {
        this.bindEvents();
        this.updateNavbar();
        this.updateBackToTop();
        this.initReveal();
        this.initActiveNav();
        this.initVideoCarousel();
        this.initCookieBanner();
        this.setCurrentYear();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (this.scrollTicking) return;
            this.scrollTicking = true;
            window.requestAnimationFrame(() => {
                this.updateNavbar();
                this.updateBackToTop();
                this.scrollTicking = false;
            });
        }, { passive: true });

        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (this.acceptCookies) {
            this.acceptCookies.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                this.cookieBanner.classList.remove('show');
            });
        }

        const navLinks = document.querySelectorAll('.navbar .nav-link');
        const navCollapse = document.getElementById('navbarNav');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
                    window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
                }
            });
        });
    }

    updateNavbar() {
        if (!this.navbar) return;
        if (window.scrollY > 40) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    updateBackToTop() {
        if (!this.backToTop) return;
        if (window.scrollY > 420) {
            this.backToTop.classList.add('show');
        } else {
            this.backToTop.classList.remove('show');
        }
    }

    initCookieBanner() {
        if (!this.cookieBanner) return;
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setTimeout(() => {
                this.cookieBanner.classList.add('show');
            }, 1200);
        }
    }

    initReveal() {
        if (!this.revealItems.length) return;
        if (!('IntersectionObserver' in window)) {
            this.revealItems.forEach((item) => item.classList.add('in-view'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        this.revealItems.forEach((item) => observer.observe(item));
    }

    initActiveNav() {
        if (!this.navLinks.length || !('IntersectionObserver' in window)) return;

        const sectionElements = this.sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        if (!sectionElements.length) return;

        const linkById = {};
        this.navLinks.forEach((link) => {
            const id = link.getAttribute('href').replace('#', '');
            linkById[id] = link;
        });

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const currentId = entry.target.id;
                this.navLinks.forEach((link) => link.classList.remove('active'));
                if (linkById[currentId]) linkById[currentId].classList.add('active');
            });
        }, { rootMargin: '-35% 0px -45% 0px', threshold: 0.01 });

        sectionElements.forEach((section) => sectionObserver.observe(section));
    }

    initVideoCarousel() {
        const carouselEl = document.getElementById('insightsCarousel');
        if (!carouselEl) return;

        const getVideos = () => Array.from(carouselEl.querySelectorAll('.insight-video'));
        const pauseAllVideos = () => {
            getVideos().forEach((video) => {
                video.pause();
            });
        };

        carouselEl.addEventListener('slide.bs.carousel', () => {
            pauseAllVideos();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) pauseAllVideos();
        });
    }

    setCurrentYear() {
        const year = document.getElementById('currentYear');
        if (year) year.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const siteExperience = new SiteExperience();
    siteExperience.init();
});
