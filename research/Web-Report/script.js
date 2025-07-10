// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);

    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('report-date').textContent = currentDate;
    document.querySelectorAll('.report-date').forEach(el => {
        el.textContent = currentDate;
    });

    // Initialize animations
    initializeAnimations();

    // Initialize navigation
    initializeNavigation();

    // Initialize charts
    initializeCharts();

    // Initialize smooth scroll
    initializeSmoothScroll();
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Initialize all charts
function initializeCharts() {
    // Chart defaults
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#64748b';
    
    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart');
    if (engagementCtx) {
        new Chart(engagementCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Facebook',
                        data: [3.8, 4.1, 4.0, 4.3, 4.2, 4.2],
                        borderColor: '#1877f2',
                        backgroundColor: 'rgba(24, 119, 242, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Instagram',
                        data: [5.2, 5.5, 5.8, 6.0, 6.1, 6.1],
                        borderColor: '#e4405f',
                        backgroundColor: 'rgba(228, 64, 95, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'LinkedIn',
                        data: [3.2, 3.4, 3.6, 3.7, 3.8, 3.8],
                        borderColor: '#0077b5',
                        backgroundColor: 'rgba(0, 119, 181, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Twitter',
                        data: [2.5, 2.6, 2.8, 2.9, 2.9, 2.9],
                        borderColor: '#1da1f2',
                        backgroundColor: 'rgba(29, 161, 242, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Organic Traffic',
                    data: [38000, 40000, 42000, 43500, 44000, 45000],
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Visitors: ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Sentiment Chart
    const sentimentCtx = document.getElementById('sentimentChart');
    if (sentimentCtx) {
        new Chart(sentimentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative'],
                datasets: [{
                    data: [78, 18, 4],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderColor: [
                        'rgba(16, 185, 129, 1)',
                        'rgba(99, 102, 241, 1)',
                        'rgba(239, 68, 68, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Radar Chart for Competitive Analysis
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Website Traffic', 'Social Media', 'SEO', 'Reviews', 'Content', 'Brand Awareness'],
                datasets: [
                    {
                        label: 'Your Brand',
                        data: [75, 85, 76, 90, 70, 82],
                        backgroundColor: 'rgba(99, 102, 241, 0.2)',
                        borderColor: 'rgba(99, 102, 241, 1)',
                        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
                    },
                    {
                        label: 'Industry Average',
                        data: [70, 75, 70, 82, 65, 75],
                        backgroundColor: 'rgba(156, 163, 175, 0.2)',
                        borderColor: 'rgba(156, 163, 175, 1)',
                        pointBackgroundColor: 'rgba(156, 163, 175, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(156, 163, 175, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }
}

// Download report function
function downloadReport() {
    // In a real implementation, this would generate a PDF
    alert('Report download feature would be implemented here. This would generate a comprehensive PDF report of all findings.');
}

// Schedule consultation function
function scheduleConsultation() {
    // In a real implementation, this would open a scheduling modal or redirect to a booking page
    alert('Consultation scheduling feature would be implemented here. This would allow the client to book a meeting to discuss the findings.');
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

            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add number counting animation
    const observerOptions = {
        threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent.replace(/\D/g, ''));
                let startValue = 0;
                const duration = 2000;
                const increment = endValue / (duration / 16);

                const counter = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        target.textContent = target.textContent.replace(/\d+/, endValue);
                        clearInterval(counter);
                    } else {
                        target.textContent = target.textContent.replace(/\d+/, Math.floor(startValue));
                    }
                }, 16);

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
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    canvas {
        max-height: 400px;
    }
`;
document.head.appendChild(style);