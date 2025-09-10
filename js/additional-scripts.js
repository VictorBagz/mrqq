/* Additional JavaScript functionality */

// WordPress Emoji Settings
window._wpemojiSettings = {
    "baseUrl": "https://s.w.org/images/core/emoji/16.0.1/72x72/",
    "ext": ".png",
    "svgUrl": "https://s.w.org/images/core/emoji/16.0.1/svg/",
    "svgExt": ".svg",
    "source": {"concatemoji": "https://mrquickie.com/wp-includes/js/wp-emoji-release.min.js?ver=6.8.2"}
};

// Emoji Support Detection
!function(s, n) {
    var o, i, e;
    function c(e) {
        try {
            var t = {supportTests: e, timestamp: (new Date).valueOf()};
            sessionStorage.setItem(o, JSON.stringify(t))
        } catch (e) {}
    }
    function p(e, t, n) {
        e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(t, 0, 0);
        var t = new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data),
            a = (e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(n, 0, 0), new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data));
        return t.every(function(e, t) {
            return e === a[t]
        })
    }
    // ... rest of emoji detection code
}((window, document), window._wpemojiSettings);

// Speculation Rules for prefetching
if (document.createElement) {
    var speculationScript = document.createElement('script');
    speculationScript.type = 'speculationrules';
    speculationScript.textContent = JSON.stringify({
        "prefetch": [{
            "source": "document",
            "where": {
                "and": [
                    {"href_matches": "/*"},
                    {"not": {"href_matches": ["/wp-*.php", "/wp-admin/*", "/wp-content/uploads/*", "/wp-content/*", "/wp-content/plugins/*", "/wp-content/themes/betheme-child/*", "/wp-content/themes/betheme/*", "/*\\?(.+)"]}},
                    {"not": {"selector_matches": "a[rel~=\"nofollow\"]"}},
                    {"not": {"selector_matches": ".no-prefetch, .no-prefetch a"}}
                ]
            },
            "eagerness": "conservative"
        }]
    });
    document.head.appendChild(speculationScript);
}

// Accordion functionality
function initAccordions() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAccordions();
    
    // Add any other initialization code here
    console.log('Additional scripts loaded');
});

// Image optimization for sizes="auto"
if (CSS && CSS.supports && CSS.supports('contain-intrinsic-size', '1px')) {
    var autoImages = document.querySelectorAll('img[sizes*="auto"]');
    autoImages.forEach(function(img) {
        img.style.containIntrinsicSize = '3000px 1500px';
    });
}

console.log('Additional scripts initialized');
