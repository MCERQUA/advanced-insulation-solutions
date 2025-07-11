// Advanced Research Report Interactive Scripts

// Global Variables
let scrollProgress = 0;
let chartInstances = {};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 1500);

    // Initialize all components
    initializeNavigation();
    initializeAnimations();
    initializeCharts();
    initializeCalculator();
    initializeCounters();
    initializeMobileMenu();
    updateProgressBar();
});

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.report-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        updateActiveNav();
        updateProgressBar();
        handleNavbarScroll();
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.report-nav').offsetHeight;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
}

// Animation Functions
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// Chart.js Initialization
function initializeCharts() {
    // Overall Score Doughnut Chart
    const overallScoreCtx = document.getElementById('overallScoreChart');
    if (overallScoreCtx) {
        chartInstances.overallScore = new Chart(overallScoreCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [37.5, 62.5],
                    backgroundColor: ['#f59e0b', 'rgba(255, 255, 255, 0.1)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });
    }

    // Keyword Opportunity Chart
    const keywordCtx = document.getElementById('keywordChart');
    if (keywordCtx) {
        chartInstances.keywords = new Chart(keywordCtx, {
            type: 'bar',
            data: {
                labels: [
                    'insulation contractor denver',
                    'spray foam insulation denver',
                    'attic insulation denver',
                    'insulation companies near me',
                    'home insulation denver'
                ],
                datasets: [{
                    label: 'Monthly Search Volume',
                    data: [590, 320, 210, 880, 140],
                    backgroundColor: '#2563eb'
                }, {
                    label: 'Estimated Value ($/year in thousands)',
                    data: [85, 55, 35, 75, 20],
                    backgroundColor: '#10b981'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Market Share Chart
    const marketShareCtx = document.getElementById('marketShareChart');
    if (marketShareCtx) {
        chartInstances.marketShare = new Chart(marketShareCtx, {
            type: 'pie',
            data: {
                labels: ['REenergizeCO', 'NetZero', 'Ideal Home', 'Others', 'Your Potential'],
                datasets: [{
                    data: [35, 25, 20, 17, 3],
                    backgroundColor: [
                        '#ef4444',
                        '#f59e0b',
                        '#3b82f6',
                        '#94a3b8',
                        '#10b981'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
}

// Calculator Functions
function initializeCalculator() {
    // Set initial values
    updateCalculator();
}

function updateCalculator() {
    const reviews = document.getElementById('reviewsSlider').value;
    const ranking = document.getElementById('rankingSelect').value;
    const investment = document.getElementById('investmentSlider').value;
    
    // Update display values
    document.getElementById('reviewsValue').textContent = reviews;
    document.getElementById('investmentValue').textContent = parseInt(investment).toLocaleString();
    
    // Calculate results
    const baseLeads = 10;
    const reviewMultiplier = 1 + (reviews / 50) * 0.5;
    const rankingMultiplier = ranking === '1' ? 3 : ranking === '3' ? 2.5 : ranking === '5' ? 2 : 1.5;
    const investmentMultiplier = investment / 5000;
    
    const leads = Math.round(baseLeads * reviewMultiplier * rankingMultiplier * investmentMultiplier);
    const conversionRate = 15 + (reviews / 10) + (6 - ranking);
    const customers = Math.round(leads * (conversionRate / 100));
    const avgJobValue = 3500;
    const revenue = customers * avgJobValue;
    const roi = Math.round(((revenue - investment) / investment) * 100);
    
    // Update results
    document.getElementById('leadsResult').textContent = leads;
    document.getElementById('conversionResult').textContent = conversionRate + '%';
    document.getElementById('customersResult').textContent = customers;
    document.getElementById('revenueResult').textContent = '$' + revenue.toLocaleString();
    document.getElementById('roiResult').textContent = roi + '%';
    
    // Update ROI color
    const roiElement = document.getElementById('roiResult');
    if (roi > 500) {
        roiElement.style.color = 'var(--success)';
    } else if (roi > 200) {
        roiElement.style.color = 'var(--warning)';
    } else {
        roiElement.style.color = 'var(--danger)';
    }
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('[data-animate="counter"] .stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 30);
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.report-nav').offsetHeight;
        const targetPosition = section.offsetTop - navHeight - 20;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function showMetricDetail(metric) {
    // Show detailed modal or tooltip for each metric
    alert(`Detailed analysis for ${metric} would appear here in a modal.`);
}

function showPhase(phaseNumber) {
    // Update active phase
    document.querySelectorAll('.timeline-phase').forEach(phase => {
        phase.classList.remove('active');
    });
    document.querySelectorAll('.timeline-phase')[phaseNumber - 1].classList.add('active');
    
    // Update progress line
    const progressLine = document.querySelector('.progress-line');
    progressLine.style.height = `${(phaseNumber - 1) * 25}%`;
}

function playVideo() {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'block';
    // In a real implementation, you would load and play the video here
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    modal.style.display = 'none';
    const video = document.getElementById('summaryVideo');
    video.pause();
}

function scheduleCall() {
    // In a real implementation, this would open a calendar booking widget
    window.open('https://calendly.com/your-booking-link', '_blank');
}

function downloadReport() {
    // In a real implementation, this would generate and download a PDF
    window.print();
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNav();
    updateProgressBar();
    handleNavbarScroll();
}, 10));

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg-animation');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.impact-card, .score-metric, .keyword-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize timeline on load
showPhase(1);

// Print styles optimization
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections
    document.querySelectorAll('.timeline-phase').forEach(phase => {
        phase.classList.add('active');
    });
});

window.addEventListener('afterprint', () => {
    // Reset to first phase
    showPhase(1);
});

// Easter egg - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    alert('🎉 Congratulations! You found the secret. Use code "KONAMI" for 10% off your first month!');
}