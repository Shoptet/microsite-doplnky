$(function() {
    $('.colorbox').colorbox({
        rel: 'gallery',
        maxWidth: '98%'
    });

    $('html').on('change', '#filter-form select', function() {
        // TODO: overlay
        $('body').prepend('<div class="overlay"><div class="loader"></div></div>').addClass('overlay-visible');
        $(this).parents('form').submit();
    });
});

if (typeof Nette !== 'undefined') {

    Nette.formErrorClass = 'form_error';

    /**
     * Add display error message to Nette Form.
     */
    Nette.addError = function(element, message) {
        var errorClass = Nette.formErrorClass;
        if (element.focus) {
            element.focus();
        }
        if (message) {
            var e = document.createElement('span');
            e.innerText = message;
            e.className = Nette.formErrorClass;
            element.parentNode.insertBefore(e, element.nextSibling);
        }
    };

    /**
     * Remove error message in submitted form to prevent display duplicate messages
     */
    document.querySelectorAll('form').forEach(
        function(form) {
            form.addEventListener("submit", function() {
                [].forEach.call(form.querySelectorAll('.' + Nette.formErrorClass), function(e){
                    e.parentNode.removeChild(e);
              });
            }, false);
        }
    );

}
