// ==========================================
// ADVANCED VISUAL EFFECTS INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll-triggered Animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply scroll animations after a brief delay
    setTimeout(() => {
        document.querySelectorAll('.product-card, .catalog-card').forEach((el) => {
            el.classList.add('animate-on-scroll', 'fade-in-up');
            scrollObserver.observe(el);
        });

        document.querySelectorAll('.stat-item').forEach((el) => {
            el.classList.add('animate-on-scroll', 'scale-in');
            scrollObserver.observe(el);
        });

        document.querySelectorAll('.news-card').forEach((el) => {
            el.classList.add('animate-on-scroll', 'fade-in-up');
            scrollObserver.observe(el);
        });

        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.classList.add('animate-on-scroll', 'fade-in-left');
            scrollObserver.observe(heroText);
        }

        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.classList.add('animate-on-scroll', 'fade-in-right');
            scrollObserver.observe(heroVisual);
        }
    }, 100);

    // 2. Particle Background Effect
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero || hero.querySelector('.particles-bg')) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-bg';
        hero.appendChild(particleContainer);

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            particleContainer.appendChild(particle);
        }
    }
    createParticles();

    // 3. Enhanced Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }

    // 4. Ripple Effect on Buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple to all buttons
    setTimeout(() => {
        document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-icon').forEach(button => {
            if (!button.classList.contains('ripple')) {
                button.classList.add('ripple');
                button.addEventListener('click', createRipple);
            }
        });
    }, 500);

    // 5. Parallax Effect on Scroll
    function parallaxEffect() {
        const scrolled = window.pageYOffset;

        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yOffset = scrolled * speed * 0.1;
            card.style.transform = `translateY(${yOffset}px)`;
        });

        const circles = document.querySelectorAll('.circle');
        circles.forEach((circle, index) => {
            const speed = 0.3 + (index * 0.15);
            const yOffset = scrolled * speed * 0.15;
            circle.style.transform = `translateY(${yOffset}px)`;
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 6. 3D Tilt Effect on Product Cards
    function tiltCard(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
        card.style.transform = '';
    }

    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mousemove', tiltCard);
            card.addEventListener('mouseleave', resetTilt);
        });
    }, 500);

    // 7. Gradient Text Animation
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        gradientText.classList.add('gradient-text-animated');
    }

    // 8. Blob Morphing on circles
    document.querySelectorAll('.circle').forEach(circle => {
        circle.classList.add('blob-morph');
    });

    // 9. Add shimmer effect to special cards
    setTimeout(() => {
        const newArrivals = document.querySelectorAll('.new-arrivals-widget .product-card');
        newArrivals.forEach(card => {
            card.classList.add('shimmer-effect');
        });
    }, 1000);

    // 10. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('✨ Visual effects initialized successfully!');
});
