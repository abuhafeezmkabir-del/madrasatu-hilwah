// ============================================
// MADRASATU HILWAH TAHFIZIL QUR'AN
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => { preloader.classList.add('fade-out'); setTimeout(() => preloader.remove(), 500); }, 500);
        });
    }

    // AOS Init
    if (typeof AOS !== 'undefined') AOS.init({ duration: 700, once: true, offset: 50, easing: 'ease-out-cubic' });

    // Navbar scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

    // Back to top
    const btt = document.querySelector('.back-to-top');
    if (btt) {
        window.addEventListener('scroll', () => btt.style.display = window.pageYOffset > 300 ? 'flex' : 'none');
        btt.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // Counters
    document.querySelectorAll('.counter').forEach(c => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = +c.getAttribute('data-target');
                    const inc = target / 150;
                    const update = () => {
                        const cur = +c.innerText.replace(/[^0-9]/g, '');
                        if (cur < target) { c.innerText = Math.ceil(cur + inc) + '+'; setTimeout(update, 15); }
                        else c.innerText = target + '+';
                    };
                    update();
                    obs.unobserve(c);
                }
            });
        }, { threshold: 0.5 });
        obs.observe(c);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const t = document.querySelector(href);
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dark mode
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const saved = localStorage.getItem('hilwah-theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        themeToggle.innerHTML = saved === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        themeToggle.addEventListener('click', () => {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('hilwah-theme', next);
            themeToggle.innerHTML = next === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        });
    }

    // Swiper
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1, spaceBetween: 20, loop: true, autoplay: { delay: 4000 },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    // Form validation
    document.querySelectorAll('form').forEach(f => {
        f.addEventListener('submit', function(e) {
            let ok = true;
            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) { ok = false; field.classList.add('is-invalid'); }
                else field.classList.remove('is-invalid');
            });
            if (!ok) { e.preventDefault(); alert('Please fill in all required fields.'); }
        });
    });

    // Year
    const y = document.getElementById('current-year');
    if (y) y.textContent = new Date().getFullYear();
});