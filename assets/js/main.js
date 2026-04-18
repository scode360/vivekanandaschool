/* 
    Vivekananda School - Premium Redesign Scripts
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect - Optimized with requestAnimationFrame
    const header = document.querySelector('header');
    let scrollPos = 0;
    let ticking = false;

    function updateHeader() {
        if (scrollPos > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        scrollPos = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const icon = mobileToggle.querySelector('i');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Portal Toggle Logic (if on portal page)
    const portalButtons = document.querySelectorAll('.portal-toggle .btn');
    if (portalButtons.length > 0) {
        portalButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                portalButtons.forEach(b => {
                    b.classList.remove('btn-primary');
                    b.classList.add('btn-outline');
                });
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-outline');
                
                // Update placeholder based on mode
                const usernameInput = document.getElementById('username');
                if (usernameInput) {
                    usernameInput.placeholder = btn.innerText === 'Student' ? 'Enter Registration ID' : 'Enter Registered Phone Number';
                }
            });
        });
    }

    // 3. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Counter Animation
    const counterElements = document.querySelectorAll('.counter-num');
    
    const countTo = (element) => {
        const target = +element.getAttribute('data-target');
        let count = 0;
        const duration = 2000; // ms
        const incrementValue = target / (duration / 16); // 60fps

        const updateCount = () => {
            count += incrementValue;
            if (count < target) {
                element.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
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
    }, { threshold: 0.2 }); // Trigger earlier for better UX

    counterElements.forEach(el => counterObserver.observe(el));

    // 5. Smooth Scroll for Internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
                // Close menu if mobile
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
});
