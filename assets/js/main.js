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

    // 6. Image Overlay Click/Tap Handler for Mobile
    const overlayItems = document.querySelectorAll('.facility-item, .gallery-item');
    
    overlayItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // If it's a mobile device (or touch-based)
            if (window.innerWidth <= 1024) {
                // Remove clicked class from all other items first
                overlayItems.forEach(other => {
                    if (other !== item) other.classList.remove('clicked');
                });
                // Toggle clicked class on current item
                this.classList.toggle('clicked');
            }
        });
    });

    // 7. Board Exam Achiever Tabs
    const tabButtons = document.querySelectorAll('.achiever-tab-btn');
    const tabPanes = document.querySelectorAll('.achiever-tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTabId = btn.getAttribute('data-tab');

                // Remove active classes
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });

                // Add active classes
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                
                const targetPane = document.getElementById(targetTabId);
                if (targetPane) {
                    targetPane.classList.add('active');
                    
                    // Trigger scroll reveal for newly visible images/cards
                    const paneReveals = targetPane.querySelectorAll('[data-reveal]');
                    paneReveals.forEach(el => {
                        // Small timeout to allow transition display to register first
                        setTimeout(() => {
                            el.classList.add('revealed');
                        }, 50);
                    });
                }
            });
        });
    }

    // 8. Dynamic Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        // Initialize by adding 'show' to all items
        galleryItems.forEach(item => item.classList.add('show'));

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');

                // Toggle active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        // Show item
                        item.classList.remove('hidden');
                        // Small timeout for nice scale animation
                        setTimeout(() => {
                            item.classList.add('show');
                        }, 20);
                    } else {
                        // Hide item
                        item.classList.remove('show');
                        // Let transition finish before hiding completely
                        setTimeout(() => {
                            if (!item.classList.contains('show')) {
                                item.classList.add('hidden');
                            }
                        }, 400); // matches style.css transition time
                    }
                });
            });
        });
    }

    // 9. Premium Lightbox Feature
    // Dynamically insert Lightbox HTML structure
    const lightboxHTML = `
        <div class="lightbox-modal" id="lightboxModal" aria-hidden="true" role="dialog">
            <div class="lightbox-content">
                <button class="lightbox-close" id="lightboxClose" aria-label="Close lightbox">&times;</button>
                <img class="lightbox-img" id="lightboxImg" src="" alt="">
                <div class="lightbox-caption" id="lightboxCaption"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    // Function to open Lightbox
    const openLightbox = (src, alt) => {
        if (!lightboxModal || !lightboxImg || !lightboxCaption) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCaption.textContent = alt || 'Image Preview';
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    };

    // Function to close Lightbox
    const closeLightbox = () => {
        if (!lightboxModal) return;
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock background scrolling
        // Clear src after fade transition completes to avoid flash of old image next time
        setTimeout(() => {
            if (!lightboxModal.classList.contains('active')) {
                lightboxImg.src = '';
            }
        }, 400);
    };

    // Attach click events to achiever images and gallery items
    document.body.addEventListener('click', (e) => {
        // Find if the clicked element is an image inside an achiever card or gallery item
        const img = e.target.closest('.spotlight-img-container img, .achiever-img-container img, .gallery-item img');
        if (img) {
            e.preventDefault();
            // Retrieve original src and alt/caption details
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || img.parentElement.nextElementSibling?.textContent || '';
            openLightbox(src, alt);
        }
    });

    // Close on click of background or close button
    if (lightboxModal && lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
        lightboxModal.addEventListener('click', (e) => {
            // Close only if clicking the background backdrop, not the image content itself
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });
});


