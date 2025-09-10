/* Google Analytics and Google Tag Manager */

// Google Tag Manager Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag("set","linker",{"domains":["mrquickie.com"]});
gtag("js", new Date());
gtag("set", "developer_id.dZTNiMT", true);
gtag("config", "GT-5NPZM9M3");

// Site Kit Configuration
window._googlesitekit = window._googlesitekit || {}; 
window._googlesitekit.throttledEvents = []; 
window._googlesitekit.gtagEvent = (name, data) => { 
    var key = JSON.stringify({ name, data }); 
    if (!! window._googlesitekit.throttledEvents[ key ]) { 
        return; 
    } 
    window._googlesitekit.throttledEvents[ key ] = true; 
    setTimeout( () => { 
        delete window._googlesitekit.throttledEvents[ key ]; 
    }, 5 ); 
    gtag( "event", name, { ...data, event_source: "site-kit" } ); 
}

// reCAPTCHA Configuration
var wpcf7_recaptcha = {
    "sitekey": "6LcC5SkqAAAAAFx8TkW4Y65IJdWiSxnyrCWKy6ym",
    "actions": {
        "homepage": "homepage",
        "contactform": "contactform"
    }
};

console.log('Google Analytics and tracking scripts loaded');
