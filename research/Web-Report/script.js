// Research Report Interactive Scripts

// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.report-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
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

    window.addEventListener('scroll', updateActiveNav);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate score bars
                if (entry.target.classList.contains('score-fill')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.summary-card, .report-card, .metric-card, .competitor-card, .timeline-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Animate score bars
    const scoreFills = document.querySelectorAll('.score-fill');
    scoreFills.forEach(fill => {
        observer.observe(fill);
    });

    // Print functionality
    window.downloadReport = function() {
        // In a real implementation, this would generate and download a PDF
        // For now, we'll trigger the print dialog
        window.print();
    };

    // Add interactive tooltips to metrics
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const nav = document.querySelector('.report-nav');
        const navContainer = document.querySelector('.nav-container');
        
        // Create mobile menu button
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.style.display = 'none';
        
        // Insert menu button
        navContainer.appendChild(menuButton);
        
        // Toggle menu on mobile
        menuButton.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-active');
        });
        
        // Check screen size
        const checkMobile = () => {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
            } else {
                menuButton.style.display = 'none';
                document.querySelector('.nav-menu').classList.remove('mobile-active');
            }
        };
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
    };
    
    createMobileMenu();

    // Add copy functionality for key insights
    const addCopyButtons = () => {
        const insightBoxes = document.querySelectorAll('.insight-box, .alert-box');
        insightBoxes.forEach(box => {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: none; border: none; cursor: pointer; color: #64748b;';
            
            box.style.position = 'relative';
            box.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', function() {
                const text = box.textContent.trim();
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
        });
    };
    
    addCopyButtons();

    // Interactive data visualization for scores
    const createInteractiveScores = () => {
        const scoreItems = document.querySelectorAll('.score-item');
        scoreItems.forEach(item => {
            item.addEventListener('click', function() {
                const fill = this.querySelector('.score-fill');
                const score = fill.textContent;
                const label = this.querySelector('.score-label').textContent;
                
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'score-tooltip';
                tooltip.textContent = `${label}: ${score} - Click for details`;
                tooltip.style.cssText = 'position: absolute; background: #1e293b; color: white; padding: 8px 12px; border-radius: 6px; font-size: 14px; z-index: 1000;';
                
                document.body.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - 40) + 'px';
                
                // Remove after 2 seconds
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    };
    
    createInteractiveScores();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            document.querySelector('.nav-menu').classList.remove('mobile-active');
        }
    });

    // Performance tracking simulation
    console.log('Research Report loaded successfully');
    console.log('Time to interactive:', performance.now().toFixed(2) + 'ms');
});

// Add CSS for mobile menu and active states
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .nav-menu.mobile-active {
            display: flex;
        }
    }
    
    .copy-btn:hover {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);