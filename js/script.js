// ========================================
// Hotel Saravanaa - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Preloader
    // ========================================
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('preloader').classList.add('loaded');
        }, 1500);
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll
        updateActiveNavLink();
    });

    // Back to top click
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========================================
    // Mobile Menu
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector('.nav-link[href="#' + id + '"]');

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }

    // ========================================
    // Language Toggle
    // ========================================
    let currentLang = 'en';
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang === currentLang) return;

            currentLang = lang;
            langOptions.forEach(function(o) { o.classList.remove('active'); });
            this.classList.add('active');

            if (lang === 'ta') {
                document.body.setAttribute('data-lang', 'ta');
                applyTranslations('ta');
            } else {
                document.body.removeAttribute('data-lang');
                revertToEnglish();
            }
        });
    });

    // Store original English text
    const originalTexts = {};
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        originalTexts[el.getAttribute('data-i18n')] = el.innerHTML;
    });

    function applyTranslations(lang) {
        const trans = translations[lang];
        if (!trans) return;

        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            if (trans[key]) {
                el.innerHTML = trans[key];
            }
        });
    }

    function revertToEnglish() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            if (originalTexts[key]) {
                el.innerHTML = originalTexts[key];
            }
        });
    }

    // ========================================
    // Menu Category Filters
    // ========================================
    function setupMenuFilter(filterContainerId, menuSectionSelector) {
        const filterContainer = document.getElementById(filterContainerId);
        if (!filterContainer) return;

        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        const section = filterContainer.closest('.menu-section');
        const categories = section.querySelectorAll('.menu-category');

        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');

                // Update active button
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');

                // Show/hide categories
                categories.forEach(function(cat) {
                    if (category === 'all') {
                        cat.classList.remove('hidden-category');
                    } else if (cat.getAttribute('data-category') === category) {
                        cat.classList.remove('hidden-category');
                    } else {
                        cat.classList.add('hidden-category');
                    }
                });
            });
        });
    }

    setupMenuFilter('vegMenuFilter', '#veg-menu');
    setupMenuFilter('nonvegMenuFilter', '#nonveg-menu');

    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Gather form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const occasion = document.getElementById('occasion').value;
            const message = document.getElementById('message').value;

            // Build WhatsApp message
            let waMsg = 'Hi Hotel Saravanaa!\n\n';
            waMsg += 'Name: ' + name + '\n';
            waMsg += 'Phone: ' + phone + '\n';
            if (email) waMsg += 'Email: ' + email + '\n';
            waMsg += 'Enquiry: ' + occasion + '\n';
            waMsg += 'Message: ' + message;

            // Encode and open WhatsApp
            const waUrl = 'https://wa.me/919176360120?text=' + encodeURIComponent(waMsg);
            window.open(waUrl, '_blank');

            // Show success message
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');

            // Reset after 5 seconds
            setTimeout(function() {
                contactForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
                contactForm.reset();
            }, 5000);
        });
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animateElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animateElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // ========================================
    // Duplicate food scroll for infinite effect
    // ========================================
    const foodScroll = document.querySelector('.food-scroll');
    if (foodScroll) {
        const items = foodScroll.innerHTML;
        foodScroll.innerHTML = items + items;
    }

    // ========================================
    // Smooth scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

});
