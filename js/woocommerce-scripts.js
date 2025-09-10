/* WooCommerce JavaScript */

// WooCommerce parameters
var wc_add_to_cart_params = {
    "ajax_url": "/wp-admin/admin-ajax.php",
    "wc_ajax_url": "/?wc-ajax=%%endpoint%%",
    "i18n_view_cart": "View cart",
    "cart_url": "https://mrquickie.com/cart/",
    "is_cart": "",
    "cart_redirect_after_add": "no"
};

var wc_cart_fragments_params = {
    "ajax_url": "/wp-admin/admin-ajax.php",
    "wc_ajax_url": "/?wc-ajax=%%endpoint%%",
    "cart_hash_key": "wc_cart_hash_315676bb92f04a91bf3182b64e718ee1",
    "fragment_name": "wc_fragments_315676bb92f04a91bf3182b64e718ee1",
    "request_timeout": "5000"
};

var woocommerce_params = {
    "ajax_url": "/wp-admin/admin-ajax.php",
    "wc_ajax_url": "/?wc-ajax=%%endpoint%%"
};

// Initialize WooCommerce functionality
jQuery(document).ready(function($) {
    // Remove no-js class and add js class
    (function () {
        var c = document.body.className;
        c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
        document.body.className = c;
    })();
    
    // Cart functionality
    $('.add_to_cart_button').on('click', function(e) {
        console.log('Add to cart clicked');
    });
    
    // Quantity updates
    $('.qty').on('change', function() {
        console.log('Quantity changed');
    });
    
    console.log('WooCommerce scripts loaded');
});
