/* 
    Vivekananda School - Premium Redesign Scripts
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const icon = mobileToggle.querySelector('i');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '40px';
                navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                
                // Styles for mobile links
                navLinks.querySelectorAll('a').forEach(a => {
                    a.style.color = '#1E3A8A';
                    a.style.fontSize = '1.2rem';
                    a.style.textAlign = 'center';
                });
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                navLinks.style.display = '';
            }
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
    }, { threshold: 0.8 });

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
                if (navLinks.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });
});
