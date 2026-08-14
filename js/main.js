/**
 * Lifeline Ride Services — Main JavaScript
 * Premium Non-Emergency Medical Transportation Website
 */

'use strict';

/* ============================================================
   1. DOM Ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFaqAccordion();
    initBackToTop();
    initActiveNavLink();
    initContactForm();
    initClickTracking();
});

/* ============================================================
   2. Sticky Navbar + Scroll Shadow
   ============================================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
}

/* ============================================================
   3. Mobile Menu Toggle
   ============================================================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const nav = document.getElementById('navbar');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (nav && !nav.contains(e.target) && menu.classList.contains('open')) {
            menu.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================================
   4. Smooth Scroll for Anchor Links
   ============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--nav-height')) || 72;

            const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* ============================================================
   5. Intersection Observer — Scroll Animations
   ============================================================ */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up, .fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ============================================================
   6. FAQ Accordion
   ============================================================ */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    const otherAnswer = other.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0';
                    const otherQ = other.querySelector('.faq-question');
                    if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isOpen) {
                item.classList.remove('open');
                answer.style.maxHeight = '0';
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Set initial aria state
        question.setAttribute('aria-expanded', 'false');
    });
}

/* ============================================================
   7. Back to Top Button
   ============================================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   8. Active Nav Link (current page highlighting)
   ============================================================ */
function initActiveNavLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const page = href.split('/').pop();
        if (page === current || (current === '' && page === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/* ============================================================
   9. Contact Form Validation
   ============================================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const showError = (field, msg) => {
        field.classList.add('error');
        let errEl = field.parentElement.querySelector('.error-msg');
        if (!errEl) {
            errEl = document.createElement('span');
            errEl.className = 'error-msg';
            field.parentElement.appendChild(errEl);
        }
        errEl.textContent = msg;
    };

    const clearError = (field) => {
        field.classList.remove('error');
        const errEl = field.parentElement.querySelector('.error-msg');
        if (errEl) errEl.remove();
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^[\d\s\-\(\)\+]{7,}$/.test(phone);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;

        const fields = [
            { id: 'name', label: 'Full name', check: v => v.trim().length >= 2 },
            { id: 'phone', label: 'Phone number', check: v => validatePhone(v) },
            { id: 'email', label: 'Email address', check: v => !v || validateEmail(v), optional: true },
            { id: 'pickup', label: 'Pickup address', check: v => v.trim().length >= 5 },
            { id: 'destination', label: 'Destination', check: v => v.trim().length >= 3 },
            { id: 'date', label: 'Date needed', check: v => v.trim().length > 0 },
            { id: 'tripType', label: 'Type of trip', check: v => v !== '' },
        ];

        fields.forEach(({ id, label, check, optional }) => {
            const el = document.getElementById(id);
            if (!el) return;
            clearError(el);
            if (optional && !el.value.trim()) return;
            if (!check(el.value)) {
                showError(el, `Please enter a valid ${label.toLowerCase()}.`);
                valid = false;
            }
        });

        if (valid) {
            const submitBtn = form.querySelector('[type="submit"]');
            const original = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '✓ Request Sent Successfully!';
                    submitBtn.style.background = 'var(--color-green)';
                    form.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = original;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitBtn.innerHTML = '✗ Error - Please try again or call us';
                submitBtn.style.background = '#EF4444';

                setTimeout(() => {
                    submitBtn.innerHTML = original;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 5000);
            }
        }
    });

    // Live validation on blur
    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('blur', () => {
            if (el.classList.contains('error') && el.value.trim()) {
                clearError(el);
            }
        });
    });
}

/* ============================================================
   10. Click-to-Call Tracking
   ============================================================ */
function initClickTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            // Analytics hook — replace with your actual analytics call
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_to_call', {
                    event_category: 'engagement',
                    event_label: link.href
                });
            }
            console.info('[Lifeline] Click-to-call:', link.href);
        });
    });
}
