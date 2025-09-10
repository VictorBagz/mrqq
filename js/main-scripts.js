/* Main Theme JavaScript */

// Revolution Slider Configuration
function setREVStartSize(e) {
    window.RSIW = window.RSIW === undefined ? window.innerWidth : window.RSIW;
    window.RSIH = window.RSIH === undefined ? window.innerHeight : window.RSIH;
    try {
        var pw = document.getElementById(e.c).parentNode.offsetWidth,
            newh;
        pw = pw === 0 || isNaN(pw) || (e.l == "fullwidth" || e.layout == "fullwidth") ? window.RSIW : pw;
        e.tabw = e.tabw === undefined ? 0 : parseInt(e.tabw);
        e.thumbw = e.thumbw === undefined ? 0 : parseInt(e.thumbw);
        e.tabh = e.tabh === undefined ? 0 : parseInt(e.tabh);
        e.thumbh = e.thumbh === undefined ? 0 : parseInt(e.thumbh);
        e.tabhide = e.tabhide === undefined ? 0 : parseInt(e.tabhide);
        e.thumbhide = e.thumbhide === undefined ? 0 : parseInt(e.thumbhide);
        e.mh = e.mh === undefined || e.mh == "" || e.mh === "auto" ? 0 : parseInt(e.mh, 0);
        if (e.layout === "fullscreen" || e.l === "fullscreen")
            newh = Math.max(e.mh, window.RSIH);
        else {
            e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
            for (var i in e.rl) if (e.gw[i] === undefined || e.gw[i] === 0) e.gw[i] = e.gw[i - 1];
            e.gh = e.el === undefined || e.el === "" || (Array.isArray(e.el) && e.el.length == 0) ? e.gh : e.el;
            e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
            for (var i in e.rl) if (e.gh[i] === undefined || e.gh[i] === 0) e.gh[i] = e.gh[i - 1];

            var nl = new Array(e.rl.length),
                ix = 0,
                sl;
            e.tabw = e.tabhide >= pw ? 0 : e.tabw;
            e.thumbw = e.thumbhide >= pw ? 0 : e.thumbw;
            e.tabh = e.tabhide >= pw ? 0 : e.tabh;
            e.thumbh = e.thumbhide >= pw ? 0 : e.thumbh;
            for (var i in e.rl) nl[i] = e.rl[i] < window.RSIW ? 0 : e.rl[i];
            sl = nl[0];
            for (var i in nl) if (sl > nl[i] && nl[i] > 0) { sl = nl[i]; ix = i; }
            var m = pw > (e.gw[ix] + e.tabw + e.thumbw) ? 1 : (pw - (e.tabw + e.thumbw)) / (e.gw[ix]);
            newh = (e.gh[ix] * m) + (e.tabh + e.thumbh);
        }
        var el = document.getElementById(e.c);
        if (el !== null && el) el.style.height = newh + "px";
        el = document.getElementById(e.c + "_wrapper");
        if (el !== null && el) {
            el.style.height = newh + "px";
            el.style.display = "block";
        }
    } catch (e) {
        console.log("Failure at Presize of Slider:" + e)
    }
}

// Revolution Slider Modules
window.RS_MODULES = window.RS_MODULES || {};
window.RS_MODULES.modules = window.RS_MODULES.modules || {};
window.RS_MODULES.waiting = window.RS_MODULES.waiting || [];
window.RS_MODULES.defered = true;
window.RS_MODULES.moduleWaiting = window.RS_MODULES.moduleWaiting || {};
window.RS_MODULES.type = 'compiled';

// Revolution Slider Error Handler
if (typeof revslider_showDoubleJqueryError === "undefined") {
    function revslider_showDoubleJqueryError(sliderID) {
        console.log("You have some jquery.js library include that comes after the Slider Revolution files js inclusion.");
        console.log("To fix this, you can:");
        console.log("1. Set 'Module General Options' -> 'Advanced' -> 'jQuery & OutPut Filters' -> 'Put JS to Body' to on");
        console.log("2. Find the double jQuery.js inclusion and remove it");
        return "Double Included jQuery Library";
    }
}

// Muffin Framework Configuration
var mfn = {
    "mobileInit": "1240",
    "parallax": "translate3d",
    "responsive": "1",
    "sidebarSticky": "",
    "lightbox": {"disable": false, "disableMobile": false, "title": false},
    "slider": {"blog": 3000, "clients": 3000, "offer": 3000, "portfolio": 3000, "shop": 3000, "slider": 3000, "testimonials": 3000},
    "livesearch": {"minChar": 3, "loadPosts": 10, "translation": {"pages": "Pages", "categories": "Categories", "portfolio": "Portfolio", "post": "Posts", "products": "Products"}},
    "accessibility": {"translation": {"headerContainer": "Header container", "toggleSubmenu": "Toggle submenu"}},
    "home_url": "",
    "home_url_lang": "https://mrquickie.com",
    "site_url": "https://mrquickie.com",
    "translation": {"success_message": "Link copied to the clipboard.", "error_message": "Something went wrong. Please try again later!"}
};

// Muffin WooCommerce Variables
var mfnwoovars = {
    "ajaxurl": "https://mrquickie.com/wp-admin/admin-ajax.php",
    "wpnonce": "3634f05372",
    "rooturl": "",
    "productthumbsover": "mfn-thumbnails-outside",
    "productthumbs": "0px",
    "mainimgmargin": "mfn-mim-0",
    "myaccountpage": "https://mrquickie.com/my-account/",
    "groupedQuantityErrori18n": "Please choose the quantity of items you wish to add to your cart…"
};

// WooCommerce Order Attribution
var wc_order_attribution = {
    "params": {"lifetime": 1.0e-5, "session": 30, "base64": false, "ajaxurl": "https://mrquickie.com/wp-admin/admin-ajax.php", "prefix": "wc_order_attribution_", "allowTracking": true},
    "fields": {"source_type": "current.typ", "referrer": "current_add.rf", "utm_campaign": "current.cmp", "utm_source": "current.src", "utm_medium": "current.mdm", "utm_content": "current.cnt", "utm_id": "current.id", "utm_term": "current.trm", "utm_source_platform": "current.plt", "utm_creative_format": "current.fmt", "utm_marketing_tactic": "current.tct", "session_entry": "current_add.ep", "session_start_time": "current_add.fd", "session_pages": "session.pgs", "session_count": "udata.vst", "user_agent": "udata.uag"}
};

// Initialize when document is ready
jQuery(document).ready(function($) {
    // Modern mobile menu toggle (new navigation)
    $('.mobile-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.mobile-nav-overlay').toggleClass('active');
        $('body').toggleClass('menu-open');
    });
    
    // Close mobile menu (new navigation)
    $('.mobile-close, .mobile-nav-link').on('click', function(e) {
        if ($(this).hasClass('mobile-close')) {
            e.preventDefault();
        }
        $('.mobile-toggle').removeClass('active');
        $('.mobile-nav-overlay').removeClass('active');
        $('body').removeClass('menu-open');
    });
    
    // Legacy mobile menu toggle
    $('.mfn-header-menu-toggle').on('click', function(e) {
        e.preventDefault();
        $('.mfn-header-tmpl-menu-sidebar').toggleClass('active');
    });
    
    // Legacy close mobile menu
    $('.mfn-close-icon').on('click', function(e) {
        e.preventDefault();
        $('.mfn-header-tmpl-menu-sidebar').removeClass('active');
    });
    
    // Search toggle
    $('.search-btn, .mfn-search-button').on('click', function(e) {
        e.preventDefault();
        var searchTerm = prompt('What would you like to search for?');
        if (searchTerm) {
            console.log('Searching for: ' + searchTerm);
            // Simple search implementation
            var searchLower = searchTerm.toLowerCase();
            var targetSection = null;
            
            if (searchLower.includes('service') || searchLower.includes('repair')) {
                targetSection = $('.mobile-services-section');
            } else if (searchLower.includes('work') || searchLower.includes('gallery')) {
                targetSection = $('.our-works-section');
            } else if (searchLower.includes('video')) {
                targetSection = $('.modern-videos-section');
            } else if (searchLower.includes('contact')) {
                targetSection = $('footer');
            }
            
            if (targetSection && targetSection.length) {
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 100
                }, 800);
            }
        }
    });
    
    // Close search
    $('.icon_close').on('click', function(e) {
        e.preventDefault();
        $('.search_wrapper').removeClass('active');
    });
    
    // Cart toggle
    $('.toggle-mfn-cart').on('click', function(e) {
        e.preventDefault();
        $('.mfn-cart-holder').toggleClass('active');
        $('.mfn-cart-overlay').toggleClass('active');
    });
    
    // Login modal toggle
    $('.toggle-login-modal').on('click', function(e) {
        e.preventDefault();
        $('.mfn-header-login').toggleClass('active');
    });
    
    // Smooth scrolling for navigation links
    $('.nav-link, .mobile-nav-link').on('click', function(e) {
        var href = $(this).attr('href');
        
        if (href && href.indexOf('#') === 0) {
            e.preventDefault();
            var target = $(href);
            if (!target.length) {
                target = $('[data-section="' + href.substring(1) + '"]');
            }
            if (!target.length) {
                target = $('.' + href.substring(1) + '-section');
            }
            
            if (target.length) {
                var offset = $('.premium-navigation').height() || 80;
                $('html, body').animate({
                    scrollTop: target.offset().top - offset
                }, 800);
                
                // Close mobile menu if open
                $('.mobile-toggle').removeClass('active');
                $('.mobile-nav-overlay').removeClass('active');
                $('body').removeClass('menu-open');
            }
        }
    });
    
    // Initialize sliders
    if ($('.content_slider').length) {
        $('.content_slider').each(function() {
            // Initialize content sliders
            console.log('Content slider initialized');
        });
    }
    
    // Initialize shop sliders
    if ($('.shop_slider').length) {
        $('.shop_slider').each(function() {
            // Initialize shop sliders
            console.log('Shop slider initialized');
        });
    }
    
    // Scroll effects for navigation
    var lastScrollTop = 0;
    var nav = $('.premium-navigation');
    
    if (nav.length) {
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            
            // Add scrolled class
            if (scrollTop > 50) {
                nav.addClass('scrolled');
            } else {
                nav.removeClass('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Set body padding for fixed nav
        $('body').css('padding-top', nav.outerHeight());
        
        // Adjust on resize
        $(window).resize(function() {
            $('body').css('padding-top', nav.outerHeight());
        });
    }
    
    // Force visibility of critical sections
    setTimeout(function() {
        $('.new-footer-design, .modern-videos-section, .video-card').css({
            'opacity': '1',
            'transform': 'none',
            'display': 'block',
            'visibility': 'visible'
        });
    }, 100);
    
    console.log('Main scripts loaded and enhanced');
});

// Revolution Slider Initialization
var tpj = jQuery;
var revapi8;

if (window.RS_MODULES === undefined) window.RS_MODULES = {};
if (RS_MODULES.modules === undefined) RS_MODULES.modules = {};

RS_MODULES.modules["revslider81"] = {
    once: RS_MODULES.modules["revslider81"] !== undefined ? RS_MODULES.modules["revslider81"].once : undefined,
    init: function() {
        window.revapi8 = window.revapi8 === undefined || window.revapi8 === null || window.revapi8.length === 0 ? document.getElementById("rev_slider_8_1") : window.revapi8;
        if (window.revapi8 === null || window.revapi8 === undefined || window.revapi8.length == 0) {
            window.revapi8initTry = window.revapi8initTry === undefined ? 0 : window.revapi8initTry + 1;
            if (window.revapi8initTry < 20) requestAnimationFrame(function() { RS_MODULES.modules["revslider81"].init() });
            return;
        }
        window.revapi8 = jQuery(window.revapi8);
        if (window.revapi8.revolution == undefined) {
            revslider_showDoubleJqueryError("rev_slider_8_1");
            return;
        }
        
        // Initialize Revolution Slider
        if (typeof revapi8.revolutionInit === 'function') {
            revapi8.revolutionInit({
                revapi: "revapi8",
                DPR: "dpr",
                duration: "4000ms",
                visibilityLevels: "1240,1024,778,480",
                gridwidth: 1920,
                gridheight: 600,
                lazyType: "smart",
                perspective: 600,
                perspectiveType: "global",
                editorheight: "600,768,311,720",
                responsiveLevels: "1240,1024,778,480",
                progressBar: {disableProgressBar: true},
                navigation: {
                    onHoverStop: false
                },
                viewPort: {
                    global: true,
                    globalDist: "-200px",
                    enable: false
                },
                fallbacks: {
                    allowHTML5AutoPlayOnAndroid: true
                }
            });
        }
    }
};

if (window.RS_MODULES.checkMinimal !== undefined) {
    window.RS_MODULES.checkMinimal();
}

console.log('Main scripts initialized');
