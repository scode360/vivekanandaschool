/* 
    Green Valley Public School - Main JS
    Interactions, Animations, and UI Logic
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('show')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Counter Animation
    const counterElements = document.querySelectorAll('.counter-num');
    
    const countTo = (element) => {
        const target = +element.getAttribute('data-target');
        let count = 0;
        const speed = 200; // lower is slower
        const increment = target / speed;

        const updateCount = () => {
            count += increment;
            if (count < target) {
                element.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                element.innerText = target;
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countTo(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 6. Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navMenu.classList.remove('show');
                if (mobileMenuToggle) {
                    mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // 7. Simple Logo Placeholder Generation (SVG)
    const logoImg = document.querySelector('.logo-img');
    if (logoImg && logoImg.getAttribute('src').includes('placeholder')) {
        // Just as a fallback if real logo isn't there
        logoImg.style.display = 'none';
        const logoIcon = document.createElement('i');
        logoIcon.className = 'fas fa-graduation-cap';
        logoIcon.style.fontSize = '2rem';
        logoIcon.style.color = '#2E7D32';
        logoImg.parentNode.insertBefore(logoIcon, logoImg);
    }
});
