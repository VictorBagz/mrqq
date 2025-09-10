/* Contact Form 7 Design JavaScript */

// Popup message functionality
var popup_message = {
    "ajaxurl": "https://mrquickie.com/wp-admin/admin-ajax.php",
    "popup_text": "Thank you for your message. It has been sent."
};

// Initialize popup functionality when document is ready
jQuery(document).ready(function($) {
    // Contact form submission handler
    $('.wpcf7-form').on('submit', function(e) {
        // Show success message using SweetAlert
        if (typeof swal === 'function') {
            swal({
                title: "Success!",
                text: popup_message.popup_text,
                icon: "success",
                button: "OK"
            });
        } else {
            alert(popup_message.popup_text);
        }
    });
    
    // Initialize any other popup functionality
    console.log('Contact Form 7 design JavaScript loaded');
});
