// Hotel Saravanaa - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // ---- Hero Slider ----
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }

    function startSlider() { slideInterval = setInterval(nextSlide, 5000); }
    function stopSlider() { clearInterval(slideInterval); }

    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            stopSlider();
            goToSlide(parseInt(this.dataset.slide));
            startSlider();
        });
    });

    if (slides.length > 0) startSlider();

    // ---- Navbar Scroll ----
    var navbar = document.getElementById('navbar');
    var backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        backToTop.classList.toggle('visible', window.scrollY > 500);
        updateActiveNav();
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile Menu ----
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Active Nav ----
    function updateActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 120;
        sections.forEach(function(sec) {
            var top = sec.offsetTop, h = sec.offsetHeight, id = sec.id;
            var link = document.querySelector('.nav-link[href="#' + id + '"]');
            if (link) {
                if (scrollPos >= top && scrollPos < top + h) {
                    document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }

    // ---- Language Toggle ----
    var currentLang = 'en';
    var originalTexts = {};
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        originalTexts[el.getAttribute('data-i18n')] = el.innerHTML;
    });

    document.querySelectorAll('.lang-option').forEach(function(opt) {
        opt.addEventListener('click', function() {
            var lang = this.dataset.lang;
            if (lang === currentLang) return;
            currentLang = lang;
            document.querySelectorAll('.lang-option').forEach(function(o) { o.classList.remove('active'); });
            this.classList.add('active');
            if (lang === 'ta') {
                document.body.setAttribute('data-lang', 'ta');
                var t = translations.ta;
                document.querySelectorAll('[data-i18n]').forEach(function(el) {
                    var k = el.getAttribute('data-i18n');
                    if (t[k]) el.innerHTML = t[k];
                });
            } else {
                document.body.removeAttribute('data-lang');
                document.querySelectorAll('[data-i18n]').forEach(function(el) {
                    var k = el.getAttribute('data-i18n');
                    if (originalTexts[k]) el.innerHTML = originalTexts[k];
                });
            }
        });
    });

    // ---- Menu Filters ----
    function setupFilter(filterId) {
        var container = document.getElementById(filterId);
        if (!container) return;
        var btns = container.querySelectorAll('.filter-btn');
        var section = container.closest('.menu-section');
        var cats = section.querySelectorAll('.menu-category');
        btns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var cat = this.dataset.category;
                btns.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                cats.forEach(function(c) {
                    c.classList.toggle('hidden-category', cat !== 'all' && c.dataset.category !== cat);
                });
            });
        });
    }
    setupFilter('vegMenuFilter');
    setupFilter('nonvegMenuFilter');

    // ---- Contact Form → WhatsApp ----
    var form = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var n = document.getElementById('name').value;
            var p = document.getElementById('phone').value;
            var em = document.getElementById('email').value;
            var oc = document.getElementById('occasion').value;
            var m = document.getElementById('message').value;
            var msg = 'Hi Hotel Saravanaa!\n\nName: ' + n + '\nPhone: ' + p;
            if (em) msg += '\nEmail: ' + em;
            msg += '\nEnquiry: ' + oc + '\nMessage: ' + m;
            window.open('https://wa.me/919176360120?text=' + encodeURIComponent(msg), '_blank');
            form.classList.add('hidden');
            success.classList.remove('hidden');
            setTimeout(function() {
                form.classList.remove('hidden');
                success.classList.add('hidden');
                form.reset();
            }, 5000);
        });
    }

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // ---- Scroll Reveal Animation ----
    if ('IntersectionObserver' in window) {
        var revealEls = document.querySelectorAll('.specialty-card, .location-card, .occasion-card, .highlight, .about-img-main, .about-img-small');
        revealEls.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(function(el) { observer.observe(el); });
    }
});
