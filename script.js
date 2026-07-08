/**
 * PORTFOLIO JAVASCRIPT - MOUHAMADOU MOUSTAPHA GUEYE
 * Multi-page active navigation, Scroll Animations & Form Redirection
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (navLinksContainer.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 2. ACTIVE NAVIGATION LINK (MULTI-PAGE) & STICKY HEADER
    // ==========================================
    const header = document.querySelector('.site-header');
    
    // Highlight menu link matching the current active page
    let currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '' || currentPage === '/' || !currentPage) {
        currentPage = 'index.html';
    } else {
        // Strip out query parameters and hashes
        currentPage = currentPage.split('?')[0].split('#')[0];
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        // Handle matching index.html for root path or exact file name
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    const handleScroll = () => {
        if (!header) return;

        // Sticky Header effect on scroll
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once at start to set header scroll state
    handleScroll();

    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const animElements = document.querySelectorAll('.scroll-anim');

    if ('IntersectionObserver' in window) {
        const animObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appeared');
                    // Stop observing once appeared to prevent refades
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        animElements.forEach(el => animObserver.observe(el));
    } else {
        // Fallback for older browsers
        animElements.forEach(el => el.classList.add('appeared'));
    }

    // ==========================================
    // 4. CONTACT FORM ACTION LOGIC
    // ==========================================
    const form = document.getElementById('portfolio-contact-form');
    const btnSubmitWhatsapp = document.getElementById('btn-submit-whatsapp');

    // User's contact details (no emojis in generated text)
    const WHATSAPP_NUMBER = '221775482725';
    const EMAIL_RECIPIENT = 'moustaphagueyezerr@gmail.com';

    // Helper: Retrieve form inputs and format them
    const getFormData = () => {
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();

        return { name, email, subject, message };
    };

    // ACTION A: Email Submit (Standard submit event handler)
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const { name, email, subject, message } = getFormData();

            // Constructing Email mailto link
            const emailSubject = `[Portfolio Contact] ${subject}`;
            const emailBody = `Bonjour Moustapha,

Vous avez recu un nouveau message depuis votre portfolio de la part de ${name}.

Informations de contact :
Nom : ${name}
Email : ${email}
Sujet : ${subject}

Message :
${message}

Cordialement.`;

            const mailtoUrl = `mailto:${EMAIL_RECIPIENT}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Redirect using location
            window.location.href = mailtoUrl;
        });
    }

    // ACTION B: WhatsApp Redirect (Custom click event with form validation)
    if (btnSubmitWhatsapp && form) {
        btnSubmitWhatsapp.addEventListener('click', () => {
            // Trigger HTML5 validation checks programmatically
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const { name, email, subject, message } = getFormData();

            // Constructing WhatsApp Text
            const whatsappText = `Bonjour Moustapha, je vous contacte depuis votre portfolio.
Voici mes informations :
Nom : ${name}
Email : ${email}
Sujet : ${subject}
Message : ${message}`;

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }
});
