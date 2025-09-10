/**
 * Main Navigation JavaScript
 * Handles mobile menu, search, and basic navigation functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Main navigation script loading...');
    
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    
    // State management
    let isMenuOpen = false;
    
    // Mobile menu toggle
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    // Close mobile menu
    if (mobileClose) {
        mobileClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    }
    
    // Close on overlay click
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Close on mobile link click
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Search button functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleSearch();
        });
    }
    
    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId) || 
                             document.querySelector('[data-section="' + targetId + '"]') ||
                             document.querySelector('.' + targetId + '-section');
                
                if (target) {
                    const nav = document.querySelector('.premium-navigation');
                    const offset = nav ? nav.offsetHeight + 20 : 80;
                    const targetTop = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveLink(link);
                }
            }
        });
    });
    
    // Functions
    function toggleMobileMenu() {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        isMenuOpen = true;
        if (mobileToggle) mobileToggle.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        if (mobileClose) mobileClose.focus();
        
        console.log('Mobile menu opened');
    }
    
    function closeMobileMenu() {
        isMenuOpen = false;
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        if (mobileToggle) mobileToggle.focus();
        
        console.log('Mobile menu closed');
    }
    
    function handleSearch() {
        // Simple search functionality
        const searchTerm = prompt('What would you like to search for?');
        
        if (searchTerm && searchTerm.trim()) {
            console.log('Searching for:', searchTerm);
            
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
                const nav = document.querySelector('.premium-navigation');
                const offset = nav ? nav.offsetHeight + 20 : 80;
                const targetTop = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    function updateActiveLink(clickedLink) {
        // Remove active class from all links
        allNavLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    }
    
    // Scroll effects for navigation
    let lastScrollY = 0;
    const nav = document.querySelector('.premium-navigation');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
        
        // Set initial body padding for fixed nav
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        
        // Adjust on resize
        window.addEventListener('resize', function() {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
        });
    }
    
    console.log('Main navigation script loaded successfully');
});
