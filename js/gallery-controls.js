/**
 * Enhanced Gallery Controls
 * Implements smooth scrolling gallery functionality with auto-scroll and interactive navigation
 */

class Gallery {
    constructor(options) {
        this.trackSelector = options.trackSelector;
        this.dotsSelector = options.dotsSelector;
        this.leftButtonSelector = options.leftButtonSelector;
        this.rightButtonSelector = options.rightButtonSelector;
        this.autoScrollInterval = options.autoScrollInterval || 3000; // Default to 3 seconds
        this.track = document.querySelector(this.trackSelector);
        this.dots = document.querySelectorAll(`${this.dotsSelector} .gallery-dot`);
        this.items = document.querySelectorAll(`${this.trackSelector} .gallery-item`);
        this.leftButton = document.querySelector(this.leftButtonSelector);
        this.rightButton = document.querySelector(this.rightButtonSelector);
        
        if (!this.track || !this.items.length) {
            console.warn(`Gallery not found: ${this.trackSelector}`);
            return;
        }
        
        this.currentIndex = 0;
        this.itemCount = this.items.length;
        this.isTransitioning = false;
        this.autoScrollTimer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoScroll();
        this.updateGallery();
        
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.goToSlide(index);
                }
            });
        });
        
        // Scroll button navigation
        if (this.leftButton) {
            this.leftButton.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.prevSlide();
                }
            });
        }
        
        if (this.rightButton) {
            this.rightButton.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.nextSlide();
                }
            });
        }
        
        // Pause auto-scroll on hover
        this.track.addEventListener('mouseenter', () => {
            this.pauseAutoScroll();
        });
        
        this.track.addEventListener('mouseleave', () => {
            this.startAutoScroll();
        });
        
        // Pause auto-scroll when hovering over buttons
        if (this.leftButton) {
            this.leftButton.addEventListener('mouseenter', () => {
                this.pauseAutoScroll();
            });
            this.leftButton.addEventListener('mouseleave', () => {
                this.startAutoScroll();
            });
        }
        
        if (this.rightButton) {
            this.rightButton.addEventListener('mouseenter', () => {
                this.pauseAutoScroll();
            });
            this.rightButton.addEventListener('mouseleave', () => {
                this.startAutoScroll();
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.updateGallery();
        });
        
        // Touch/swipe support
        this.setupTouchSupport();
        
        // Keyboard navigation
        this.setupKeyboardSupport();
    }
    
    setupTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Check if it's a horizontal swipe (more horizontal than vertical)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }
        }, { passive: true });
    }
    
    setupKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (document.activeElement === this.track || this.track.contains(document.activeElement)) {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.goToSlide(0);
                        break;
                    case 'End':
                        e.preventDefault();
                        this.goToSlide(this.itemCount - 1);
                        break;
                }
            }
        });
    }
    
    updateGallery() {
        if (!this.track || !this.items.length) return;
        
        const itemWidth = this.getItemWidth();
        const translateX = -this.currentIndex * itemWidth;
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        this.updateDots();
        
        // Update button states
        this.updateButtonStates();
        
        // Add transitioning class for smooth animation
        this.track.classList.add('transitioning');
        this.isTransitioning = true;
        
        // Remove transitioning class after animation
        setTimeout(() => {
            this.track.classList.remove('transitioning');
            this.isTransitioning = false;
        }, 500);
    }
    
    getItemWidth() {
        if (!this.items[0]) return 0;
        
        // Get the computed width of the first item including margins and padding
        const itemStyle = window.getComputedStyle(this.items[0]);
        const itemWidth = this.items[0].offsetWidth;
        const marginLeft = parseFloat(itemStyle.marginLeft) || 0;
        const marginRight = parseFloat(itemStyle.marginRight) || 0;
        
        return itemWidth + marginLeft + marginRight;
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });
    }
    
    updateButtonStates() {
        // Update button states based on current position
        if (this.leftButton) {
            if (this.currentIndex === 0) {
                this.leftButton.setAttribute('aria-disabled', 'true');
                this.leftButton.style.opacity = '0.5';
            } else {
                this.leftButton.setAttribute('aria-disabled', 'false');
                this.leftButton.style.opacity = '';
            }
        }
        
        if (this.rightButton) {
            if (this.currentIndex === this.itemCount - 1) {
                this.rightButton.setAttribute('aria-disabled', 'true');
                this.rightButton.style.opacity = '0.5';
            } else {
                this.rightButton.setAttribute('aria-disabled', 'false');
                this.rightButton.style.opacity = '';
            }
        }
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.itemCount || index === this.currentIndex) {
            return;
        }
        
        this.currentIndex = index;
        this.updateGallery();
        this.restartAutoScroll();
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.itemCount;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.goToSlide(prevIndex);
    }
    
    startAutoScroll() {
        this.pauseAutoScroll();
        this.autoScrollTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoScrollInterval);
    }
    
    pauseAutoScroll() {
        if (this.autoScrollTimer) {
            clearInterval(this.autoScrollTimer);
            this.autoScrollTimer = null;
        }
    }
    
    restartAutoScroll() {
        this.pauseAutoScroll();
        this.startAutoScroll();
    }
    
    destroy() {
        this.pauseAutoScroll();
        // Remove event listeners if needed
    }
}

// Initialize galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize Our Works Gallery
    const worksGallery = new Gallery({
        trackSelector: '#worksGalleryTrack',
        dotsSelector: '#worksGalleryNav',
        leftButtonSelector: '#worksScrollLeft',
        rightButtonSelector: '#worksScrollRight',
        autoScrollInterval: 3000 // 3 seconds for works gallery
    });
    
    // Initialize Products Gallery
    const productsGallery = new Gallery({
        trackSelector: '#productsGalleryTrack',
        dotsSelector: '#productsGalleryNav',
        leftButtonSelector: '#productsScrollLeft',
        rightButtonSelector: '#productsScrollRight',
        autoScrollInterval: 3000 // 3 seconds for products gallery
    });
    
    // Add ARIA attributes for accessibility
    document.querySelectorAll('.gallery-track').forEach(track => {
        track.setAttribute('role', 'region');
        track.setAttribute('aria-label', 'Image gallery');
        track.setAttribute('tabindex', '0');
    });
    
    document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('tabindex', '0');
    });
    
    // Add accessibility attributes to scroll buttons
    document.querySelectorAll('.gallery-scroll-btn').forEach(button => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
    });
    
    // Handle intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Gallery is visible, ensure auto-scroll is running
                    const trackId = entry.target.id;
                    if (trackId === 'worksGalleryTrack' && worksGallery) {
                        worksGallery.startAutoScroll();
                    } else if (trackId === 'productsGalleryTrack' && productsGallery) {
                        productsGallery.startAutoScroll();
                    }
                } else {
                    // Gallery is not visible, pause auto-scroll for performance
                    const trackId = entry.target.id;
                    if (trackId === 'worksGalleryTrack' && worksGallery) {
                        worksGallery.pauseAutoScroll();
                    } else if (trackId === 'productsGalleryTrack' && productsGallery) {
                        productsGallery.pauseAutoScroll();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.gallery-track').forEach(track => {
            galleryObserver.observe(track);
        });
    }
    
    // Preload images for better performance
    function preloadGalleryImages() {
        const images = document.querySelectorAll('.gallery-item img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // Preload images after a short delay
    setTimeout(preloadGalleryImages, 1000);
    
    // Add focus management for better accessibility
    document.querySelectorAll('.gallery-dot').forEach(dot => {
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dot.click();
            }
        });
    });
    
    // Add keyboard support for scroll buttons
    document.querySelectorAll('.gallery-scroll-btn').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable auto-scroll for users who prefer reduced motion
        if (worksGallery) worksGallery.pauseAutoScroll();
        if (productsGallery) productsGallery.pauseAutoScroll();
    }
    
    // Error handling for images
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load gallery image:', this.src);
            // You could add a placeholder image here
            this.style.backgroundColor = '#f3f4f6';
            this.style.display = 'block';
        });
    });
    
    console.log('Gallery controls initialized successfully');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
} else if (typeof window !== 'undefined') {
    window.Gallery = Gallery;
}
