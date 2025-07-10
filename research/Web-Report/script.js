// Force hide loader immediately if still visible after 3 seconds
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}, 3000);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader immediately and with timeout as backup
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Fallback - completely hide if CSS transition doesn't work
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const reportDateEl = document.getElementById('report-date');
    if (reportDateEl) reportDateEl.textContent = currentDate;
    
    document.querySelectorAll('.report-date').forEach(el => {
        el.textContent = currentDate;
    });

    // Initialize animations
    initializeAnimations();

    // Initialize navigation
    initializeNavigation();

    // Initialize smooth scroll
    initializeSmoothScroll();
});

// Backup loader hide on window load
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Animation observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate progress bars
                if (entry.target.querySelector('.progress-fill')) {
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Observe sections for progress bars
    document.querySelectorAll('.section').forEach(el => {
        observer.observe(el);
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translateY(${parallax}px)`;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Add number counting animation
    const observerOptions = {
        threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const numbers = text.match(/\d+/);
                
                if (numbers) {
                    const endValue = parseInt(numbers[0]);
                    let startValue = 0;
                    const duration = 2000;
                    const increment = endValue / (duration / 16);

                    const counter = setInterval(() => {
                        startValue += increment;
                        if (startValue >= endValue) {
                            target.textContent = text.replace(/\d+/, endValue);
                            clearInterval(counter);
                        } else {
                            target.textContent = text.replace(/\d+/, Math.floor(startValue));
                        }
                    }, 16);
                }

                countObserver.unobserve(target);
            }
        });
    }, observerOptions);

    // Observe metric values for counting animation
    document.querySelectorAll('.metric-value, .stat-value').forEach(el => {
        if (/\d/.test(el.textContent)) {
            countObserver.observe(el);
        }
    });
});

// Add style for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        width: 20px;
        height: 20px;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .nav-cta {
        background: #2563eb !important;
        color: white !important;
        padding: 8px 16px !important;
        border-radius: 6px;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .nav-cta:hover {
        background: #1d4ed8 !important;
        transform: translateY(-2px);
    }

    canvas {
        max-height: 400px;
    }
    
    /* Force hide loader styles */
    .loader.hidden {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);
