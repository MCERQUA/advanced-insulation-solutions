// Echo AI Systems - Company Research Report Interactive Scripts

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

// Chart.js Initialization with Real Data
function initializeCharts() {
    // Overall Score Doughnut Chart
    const overallScoreCtx = document.getElementById('overallScoreChart');
    if (overallScoreCtx) {
        chartInstances.overallScore = new Chart(overallScoreCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [42, 58], // 4.2/10 score
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

    // Competitor Analysis Chart
    const competitorCtx = document.getElementById('competitorChart');
    if (competitorCtx) {
        chartInstances.competitor = new Chart(competitorCtx, {
            type: 'radar',
            data: {
                labels: ['Website', 'SEO', 'Reviews', 'Social Media', 'Content', 'Local SEO'],
                datasets: [{
                    label: 'Advanced Insulation Solutions',
                    data: [7, 3, 3, 2, 6, 4],
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: '#ef4444',
                    pointBackgroundColor: '#ef4444'
                }, {
                    label: 'NetZero Insulation',
                    data: [8, 9, 7, 6, 9, 8],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: '#10b981',
                    pointBackgroundColor: '#10b981'
                }, {
                    label: 'Colorado Insulation',
                    data: [6, 8, 9, 4, 5, 9],
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: '#2563eb',
                    pointBackgroundColor: '#2563eb'
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
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
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
function showMetricDetail(metric) {
    // Create modal content based on metric
    const modalContent = {
        website: {
            title: 'Website Performance Details',
            content: 'Your website scores 7/10. Strengths include mobile responsiveness and SSL security. Areas for improvement: meta tag optimization, internal linking, and content structure.'
        },
        search: {
            title: 'Search Visibility Analysis',
            content: 'Currently not ranking for primary keywords. Missing XML sitemap submission and local SEO optimization. Competitors dominate first page results.'
        },
        social: {
            title: 'Social Media Presence',
            content: 'Minimal presence with only 78 Facebook followers. No active posting strategy or engagement. Competitors have 1000+ followers across platforms.'
        },
        reputation: {
            title: 'Online Reputation Status',
            content: 'Limited online reviews visible. Google Business Profile exists but needs optimization. No review generation system in place.'
        },
        local: {
            title: 'Local SEO Performance',
            content: 'Google Business Profile incomplete. Missing photos, services, and regular posts. Not appearing in local pack results.'
        },
        content: {
            title: 'Content Strategy Assessment',
            content: 'Good homepage content but no blog section. Missing opportunities for keyword targeting and thought leadership.'
        }
    };
    
    const details = modalContent[metric];
    if (details) {
        // In production, this would open a proper modal
        alert(`${details.title}\n\n${details.content}`);
    }
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

// Add hover effects to cards
document.querySelectorAll('.score-metric, .keyword-card, .file-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Print styles optimization
window.addEventListener('beforeprint', () => {
    // Expand all sections for printing
    document.querySelectorAll('[data-animate]').forEach(element => {
        element.classList.add('animated');
    });
});

// Download functionality
function downloadReport() {
    // In production, this would generate a proper PDF
    window.print();
}

// Add event listener for download button
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.download-section button');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadReport);
    }
});