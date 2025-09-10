/**
 * Manual Scroll Controls for Our Works and Top Picks Sections
 */

document.addEventListener('DOMContentLoaded', function() {
    // Our Works Section Scroll Controls
    const ourWorksContainer = document.querySelector('.slideshow-container');
    const ourWorksTrack = document.querySelector('.slideshow-track');
    const ourWorksLeftBtn = ourWorksContainer?.querySelector('.scroll-btn-left');
    const ourWorksRightBtn = ourWorksContainer?.querySelector('.scroll-btn-right');
    
    // Top Picks Section Scroll Controls
    const topPicksContainer = document.querySelector('.lazy-scroll-container');
    const topPicksTrack = document.querySelector('.lazy-scroll-track');
    const topPicksLeftBtn = topPicksContainer?.querySelector('.products-scroll-left');
    const topPicksRightBtn = topPicksContainer?.querySelector('.products-scroll-right');
    
    let ourWorksCurrentPosition = 0;
    let topPicksCurrentPosition = 0;
    
    // Scroll amount (adjust based on slide/card width + margin)
    const ourWorksScrollAmount = 400; // 320px width + 80px margin
    const topPicksScrollAmount = 360; // 300px width + 60px margin
    
    // Our Works Scroll Functions
    if (ourWorksLeftBtn && ourWorksRightBtn && ourWorksTrack) {
        ourWorksLeftBtn.addEventListener('click', function() {
            ourWorksCurrentPosition += ourWorksScrollAmount;
            if (ourWorksCurrentPosition > 0) {
                ourWorksCurrentPosition = 0;
            }
            ourWorksTrack.style.transform = `translateX(${ourWorksCurrentPosition}px)`;
            ourWorksTrack.style.animation = 'none'; // Pause auto-scroll when manually controlling
        });
        
        ourWorksRightBtn.addEventListener('click', function() {
            const maxScroll = -(ourWorksScrollAmount * 4); // 5 images, so 4 scroll positions
            ourWorksCurrentPosition -= ourWorksScrollAmount;
            if (ourWorksCurrentPosition < maxScroll) {
                ourWorksCurrentPosition = maxScroll;
            }
            ourWorksTrack.style.transform = `translateX(${ourWorksCurrentPosition}px)`;
            ourWorksTrack.style.animation = 'none'; // Pause auto-scroll when manually controlling
        });
        
        // Resume auto-scroll after 3 seconds of inactivity
        let ourWorksTimeout;
        function resetOurWorksAutoScroll() {
            clearTimeout(ourWorksTimeout);
            ourWorksTimeout = setTimeout(() => {
                ourWorksTrack.style.animation = 'scroll-left 40s linear infinite';
                ourWorksCurrentPosition = 0;
            }, 3000);
        }
        
        ourWorksLeftBtn.addEventListener('click', resetOurWorksAutoScroll);
        ourWorksRightBtn.addEventListener('click', resetOurWorksAutoScroll);
    }
    
    // Top Picks Scroll Functions
    if (topPicksLeftBtn && topPicksRightBtn && topPicksTrack) {
        topPicksLeftBtn.addEventListener('click', function() {
            topPicksCurrentPosition += topPicksScrollAmount;
            if (topPicksCurrentPosition > 0) {
                topPicksCurrentPosition = 0;
            }
            topPicksTrack.style.transform = `translateX(${topPicksCurrentPosition}px)`;
            topPicksTrack.style.animation = 'none'; // Pause auto-scroll when manually controlling
        });
        
        topPicksRightBtn.addEventListener('click', function() {
            const maxScroll = -(topPicksScrollAmount * 5); // 6 products, so 5 scroll positions
            topPicksCurrentPosition -= topPicksScrollAmount;
            if (topPicksCurrentPosition < maxScroll) {
                topPicksCurrentPosition = topPicksScrollAmount;
            }
            topPicksTrack.style.transform = `translateX(${topPicksCurrentPosition}px)`;
            topPicksTrack.style.animation = 'none'; // Pause auto-scroll when manually controlling
        });
        
        // Resume auto-scroll after 3 seconds of inactivity
        let topPicksTimeout;
        function resetTopPicksAutoScroll() {
            clearTimeout(topPicksTimeout);
            topPicksTimeout = setTimeout(() => {
                topPicksTrack.style.animation = 'lazy-scroll 45s linear infinite';
                topPicksCurrentPosition = 0;
            }, 3000);
        }
        
        topPicksLeftBtn.addEventListener('click', resetTopPicksAutoScroll);
        topPicksRightBtn.addEventListener('click', resetTopPicksAutoScroll);
    }
    
    // Add smooth transitions
    if (ourWorksTrack) {
        ourWorksTrack.style.transition = 'transform 0.5s ease-in-out';
    }
    
    if (topPicksTrack) {
        topPicksTrack.style.transition = 'transform 0.5s ease-in-out';
    }
});
