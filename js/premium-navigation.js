/**
 * Premium Modern Navigation JavaScript
 * Handles scroll effects, mobile menu, and smooth interactions
 */

class PremiumNavigation {
    constructor() {
        this.nav = document.querySelector('.premium-navigation');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.mobileOverlay = document.querySelector('.mobile-nav-overlay');
        this.mobileClose = document.querySelector('.mobile-close');
        this.mobileLinks = document.querySelectorAll('.mobile-nav-link');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.searchBtn = document.querySelector('.search-btn');
        
        this.isMenuOpen = false;
        this.lastScrollY = 0;
        this.scrollThreshold = 50;

        this.init();
    }

    init() {
        if (!this.nav) return;

        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupSearchFunctionality();
        this.setupKeyboardNavigation();
        this.setupActiveLink();
        
        console.log('Premium Navigation initialized');
    }

    setupScrollEffects() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // Add scrolled class for glass morphism effect
                    if (currentScrollY > this.scrollThreshold) {
                        this.nav.classList.add('scrolled');
                    } else {
                        this.nav.classList.remove('scrolled');
                    }

                    // Hide/show navigation on scroll direction
                    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                        // Scrolling down
                        this.nav.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        this.nav.style.transform = 'translateY(0)';
                    }

                    this.lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();
    }

    setupMobileMenu() {
        if (!this.mobileToggle || !this.mobileOverlay) return;

        // Toggle mobile menu
        this.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Close mobile menu
        this.mobileClose?.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeMobileMenu();
        });

        // Close on overlay click
        this.mobileOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileOverlay) {
                this.closeMobileMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Close on mobile link click
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.mobileToggle.classList.add('active');
        this.mobileOverlay.classList.add('active');
        
        // Add class to prevent body scroll
        document.body.classList.add('mobile-menu-open');
        
        // Focus management
        this.mobileClose?.focus();
        
        console.log('Mobile menu opened');
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.mobileToggle.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        
        // Add small delay before restoring body scroll to allow animation to complete
        setTimeout(() => {
            document.body.classList.remove('mobile-menu-open');
        }, 100);
        
        // Return focus to toggle button
        this.mobileToggle?.focus();
        
        console.log('Mobile menu closed');
    }

    setupSmoothScrolling() {
        // Smooth scroll for navigation links
        [...this.navLinks, ...this.mobileLinks].forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId) || 
                                 document.querySelector(`[data-section="${targetId}"]`) ||
                                 document.querySelector(`.${targetId}-section`);
                    
                    if (target) {
                        const offsetTop = target.offsetTop - (this.nav.offsetHeight + 20);
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Update active link
                        this.updateActiveLink(link);
                    }
                }
            });
        });
    }

    setupSearchFunctionality() {
        if (!this.searchBtn) return;

        this.searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSearch();
        });
    }

    handleSearch() {
        // Enhanced search functionality
        const searchTerm = prompt('What would you like to search for?');
        
        if (searchTerm && searchTerm.trim()) {
            // You can implement actual search logic here
            console.log('Searching for:', searchTerm);
            
            // Example: scroll to relevant section based on search term
            const searchLower = searchTerm.toLowerCase();
            let targetSection = null;
            
            if (searchLower.includes('service') || searchLower.includes('repair')) {
                targetSection = document.querySelector('.mobile-services-section') || 
                              document.querySelector('[data-section="services"]');
            } else if (searchLower.includes('work') || searchLower.includes('gallery')) {
                targetSection = document.querySelector('.our-works-section') || 
                              document.querySelector('[data-section="works"]');
            } else if (searchLower.includes('video')) {
                targetSection = document.querySelector('.modern-videos-section') || 
                              document.querySelector('[data-section="videos"]');
            } else if (searchLower.includes('contact')) {
                targetSection = document.querySelector('footer') || 
                              document.querySelector('[data-section="contact"]');
            }
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - (this.nav.offsetHeight + 20);
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        [...this.navLinks, ...this.mobileLinks].forEach((link, index, links) => {
            link.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (index + 1) % links.length;
                        links[nextIndex].focus();
                        break;
                        
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = (index - 1 + links.length) % links.length;
                        links[prevIndex].focus();
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        links[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        links[links.length - 1].focus();
                        break;
                }
            });
        });
    }

    setupActiveLink() {
        // Intersection Observer for active link highlighting
        const sections = document.querySelectorAll('section[class*="section"], main section');
        
        if (sections.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: `-${this.nav.offsetHeight + 50}px 0px -50% 0px`,
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = this.getSectionId(entry.target);
                    if (sectionId) {
                        this.updateActiveLink(null, sectionId);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    getSectionId(section) {
        // Get section identifier from various sources
        if (section.id) return section.id;
        
        const classList = Array.from(section.classList);
        
        // Check for common section class patterns
        for (const className of classList) {
            if (className.includes('hero')) return 'home';
            if (className.includes('service')) return 'services';
            if (className.includes('work')) return 'works';
            if (className.includes('video')) return 'videos';
            if (className.includes('contact') || className.includes('footer')) return 'contact';
        }
        
        return null;
    }

    updateActiveLink(clickedLink, sectionId) {
        // Remove active class from all links
        [...this.navLinks, ...this.mobileLinks].forEach(link => {
            link.classList.remove('active');
        });

        if (clickedLink) {
            // Add active class to clicked link
            clickedLink.classList.add('active');
        } else if (sectionId) {
            // Add active class to links matching section
            [...this.navLinks, ...this.mobileLinks].forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Public methods for external control
    hideNavigation() {
        this.nav.style.transform = 'translateY(-100%)';
    }

    showNavigation() {
        this.nav.style.transform = 'translateY(0)';
    }

    lockNavigation() {
        this.nav.style.position = 'absolute';
    }

    unlockNavigation() {
        this.nav.style.position = 'fixed';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Add body padding for fixed navigation
        const nav = document.querySelector('.premium-navigation');
        if (nav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        }

        // Initialize navigation
        window.premiumNavigation = new PremiumNavigation();
        
        // Add resize listener to adjust body padding
        window.addEventListener('resize', () => {
            if (nav) {
                document.body.style.paddingTop = nav.offsetHeight + 'px';
            }
        });

    } catch (error) {
        console.error('Error initializing Premium Navigation:', error);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumNavigation;
}
