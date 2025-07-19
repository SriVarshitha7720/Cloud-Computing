jQuery(document).ready(function ($) {

    $('#contactform').submit(function (e) {
        e.preventDefault(); // stop the form from submitting normally

        // Get form data
        var name = $('input[name=name]');
        var email = $('input[name=email]');
        var comment = $('textarea[name=comment]');
        var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
        var returnError = false;

        // Reset previous error states
        name.removeClass('error');
        email.removeClass('error');
        comment.removeClass('error');

        // Validation
        if (name.val().trim() === '') {
            name.addClass('error');
            returnError = true;
        }

        if (email.val().trim() === '' || !regx.test(email.val())) {
            email.addClass('error');
            returnError = true;
        }

        if (comment.val().trim() === '') {
            comment.addClass('error');
            returnError = true;
        }

        if (returnError) {
            return false;
        }

        var formData = $(this).serialize();

        // AJAX submit
        $.ajax({
            url: 'contact.php',
            type: 'POST',
            data: formData,
            cache: false,
            success: function (response) {
                if (response.trim() === '1') {
                    window.location.href = 'thankyou.html';
                } else {
                    alert('Sorry, unexpected error. Please try again later.');
                }
            },
            error: function () {
                alert('There was a problem submitting the form. Please try again.');
            }
        });

    });

});
