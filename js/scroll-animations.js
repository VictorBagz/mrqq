// Scroll Animation System
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Add js-enabled class to body to enable animations
        document.body.classList.add('js-enabled');
        
        this.createObserver();
        this.observeElements();
        this.addSmoothScrolling();
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: [0.1, 0.25, 0.5]
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => this.handleIntersection(entry));
        }, options);
    }

    handleIntersection(entry) {
        const element = entry.target;
        const elementId = element.dataset.animateId || Math.random().toString(36);
        
        if (entry.isIntersecting && !this.animatedElements.has(elementId)) {
            this.animateElement(element);
            this.animatedElements.add(elementId);
        }
    }

    animateElement(element) {
        // Add visible class for CSS transitions
        element.classList.add('animate-visible');

        // Apply specific animation based on data attributes or element type
        const animationType = element.dataset.animation || this.getDefaultAnimation(element);
        const delay = element.dataset.delay || 0;

        setTimeout(() => {
            element.classList.add(animationType);
        }, delay);
    }

    getDefaultAnimation(element) {
        // Determine animation based on element type and position
        if (element.classList.contains('service-item')) {
            return 'scale-in';
        } else if (element.classList.contains('slide')) {
            return 'fade-in';
        } else if (element.classList.contains('product-card')) {
            return 'slide-up';
        } else if (element.classList.contains('footer-column')) {
            return 'slide-up';
        } else if (element.tagName === 'SECTION') {
            return 'slide-up';
        } else {
            return 'fade-in';
        }
    }

    observeElements() {
        // Select elements to animate
        const selectors = [
            '.mobile-hero-section',
            '.mobile-services-section',
            '.service-item',
            '.our-works-section',
            '.top-picks-section',
            '.product-card',
            'section[class*="mcb-section"]',
            '.footer-column',
            '.slide',
            'iframe',
            'h1, h2, h3, h4',
            '.button'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                // Add base animation class
                element.classList.add('animate-on-scroll');
                
                // Add stagger delay for grouped elements
                if (this.shouldStagger(element, selector)) {
                    const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
                    element.classList.add(staggerClass);
                }

                // Set unique ID for tracking
                element.dataset.animateId = `${selector}-${index}`;
                
                // Start observing
                this.observer.observe(element);
            });
        });
    }

    shouldStagger(element, selector) {
        const staggerSelectors = [
            '.service-item',
            '.product-card',
            '.footer-column'
        ];
        return staggerSelectors.some(s => selector.includes(s));
    }

    addSmoothScrolling() {
        // Add smooth scrolling to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Public method to manually trigger animation
    triggerAnimation(element) {
        if (element && !this.animatedElements.has(element.dataset.animateId)) {
            this.animateElement(element);
        }
    }

    // Method to reset animations (useful for development)
    resetAnimations() {
        this.animatedElements.clear();
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            element.classList.remove('animate-visible', 'slide-up', 'fade-in', 'scale-in', 'slide-in-left', 'slide-in-right');
        });
    }
}

// Parallax effect for background elements
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Select elements for parallax effect
        this.elements = document.querySelectorAll('.parallax-section, .mobile-hero-section, .our-works-section');
        
        if (this.elements.length > 0) {
            this.bindEvents();
        }
    }

    bindEvents() {
        let ticking = false;

        const updateParallax = () => {
            this.elements.forEach(element => this.updateElement(element));
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Throttled scroll listener
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    updateElement(element) {
        const rect = element.getBoundingClientRect();
        const speed = element.dataset.parallaxSpeed || 0.5;
        const yPos = -(rect.top * speed);
        
        // Only apply transform if element is in viewport
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    }
}

// Performance optimization: Reduce animations on slower devices
const optimizeForPerformance = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if (isSlowConnection || isLowEndDevice) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        document.documentElement.style.setProperty('--stagger-delay', '0.05s');
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Scroll animations script loaded');
        
        // Add js-enabled class immediately
        document.body.classList.add('js-enabled');
        
        // Check for user preference for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            optimizeForPerformance();
            
            // Initialize scroll animations
            window.scrollAnimations = new ScrollAnimations();
            
            // Initialize parallax effects (only on larger screens)
            if (window.innerWidth > 768) {
                window.parallaxEffects = new ParallaxEffects();
            }
            
            console.log('Scroll animations initialized');
        } else {
            console.log('Reduced motion preference detected, animations disabled');
        }
        
        // Force footer and videos visibility as fallback
        setTimeout(() => {
            const footer = document.querySelector('.new-footer-design');
            if (footer) {
                footer.style.opacity = '1';
                footer.style.transform = 'none';
                footer.style.display = 'block';
                console.log('Footer visibility forced');
            }
            
            // Force videos section visibility
            const videosSection = document.querySelector('.modern-videos-section');
            if (videosSection) {
                videosSection.style.opacity = '1';
                videosSection.style.transform = 'none';
                videosSection.style.display = 'block';
                videosSection.style.visibility = 'visible';
                console.log('Videos section visibility forced');
            }
            
            // Force all video cards visibility
            const videoCards = document.querySelectorAll('.video-card');
            videoCards.forEach((card, index) => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.display = 'block';
                card.style.visibility = 'visible';
                console.log(`Video card ${index + 1} visibility forced`);
            });
        }, 100);
        
    } catch (error) {
        console.error('Error initializing scroll animations:', error);
        
        // Fallback: make sure all animated elements are visible
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimations, ParallaxEffects };
}
