$(function() {
    $('.colorbox').colorbox({
        rel: 'gallery',
        maxWidth: '98%'
    });
    $('[data-toggle="tooltip"]').tooltip();

    $('.content-tabs .tab-link').click(function(){
        var tab_id = $(this).attr('data-tab');
        location.hash = tab_id;
        animateTabHash($(this), tab_id);
    });

    $('html').on('click', '#rating-form .stars .star', function() {
        $('#rating-form .stars .star').removeClass('star-hover');
        $(this).addClass('star-on').removeClass('star-off');
        $(this).prevAll('.star').addClass('star-on').removeClass('star-off');
        $(this).nextAll('.star').addClass('star-off').removeClass('star-on');
    });

    $('html').on('mouseenter', '#rating-form .stars .star', function() {
        if ($(this).hasClass('star-off')) {
            $(this).addClass('star-hover').prevAll('.star-off').addClass('star-hover');
        }
    });

    $('html').on('mouseleave', '#rating-form .stars .star', function() {
        if ($(this).hasClass('star-off')) {
            $(this).removeClass('star-hover').prevAll('.star-off').removeClass('star-hover');
        }
    });
});

function animateTabHash(element, tab_id) {
    $('.content-tabs .tab-link').removeClass('current');
    $('.tab-content').removeClass('current');

    element.addClass('current');
    $("#"+tab_id).addClass('current');

    var offset = element.offset();
    $('html, body').animate({
        scrollTop: offset.top
    });
}

$(window).bind("load", function() {
    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        var tabElement =  $('[data-tab="'+hash+'"].tab-link');
        if(tabElement.length && tabElement.not('.current')) {
            animateTabHash(tabElement, hash);
        }
    }

    // filter form submit without click to submit button
    var sels = document.querySelectorAll('#frm-filterForm select, #frm-filterForm input[type="checkbox"]'), i;
    for (i = 0; i < sels.length; ++i) {
        sels[i].addEventListener('change',function() {
            loader = new Loader('body', true);
            loader.show();
            if (this.id == 'filterCategories') {
                document.getElementById('filterAuthor').value = '';
            }
            document.getElementById('frm-filterForm').submit();
        }, false);
    }

});



/**
 * Class Loader, show or hide loader
 *
 * @param idElement
 * @param forceRelative
 *
*/
function Loader(idParent, forceRelative) {
    this.idParent = idParent;
    this.id = this.idParent + '-loader-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    this.wrapper = document.getElementById(this.idParent);
    if (!this.wrapper) {
        throw('Loader: Element with id' + this.idParent + ' not found.');
    }
    style = window.getComputedStyle(this.wrapper);
    if (style.getPropertyValue('position') != 'relative' && forceRelative) {
        this.wrapper.style.position = "relative";
    }
    if (style.getPropertyValue('position') != 'relative' && !forceRelative) {
        throw('Loader: Element must set up css position:relative');
    }
    this.overlay;

}
Loader.prototype.show = function() {
    overlay = document.getElementById(this.id);
    if (!overlay) {
        var loader = document.createElement('div');
        loader.classList.add('loader');
        this.overlay = document.createElement('div');
        this.overlay.setAttribute('id', this.id);
        this.overlay.classList.add('loader-overlay');
        this.overlay.appendChild(loader);
        if (this.idParent == 'body') {
            this.overlay.style.height = '100vh';
        }
        this.wrapper.appendChild(this.overlay);
    } else {
        this.overlay.style.display = 'block';
    }
}
Loader.prototype.hide = function() {
    overlay = document.getElementById(this.id);
    if (overlay) {
        overlay.style.display = 'none';
    }
}


/**
 * @param naja
 * @param idElement
 * @param forceRelative
 */
function LoaderExtension(naja, idElement, forceRelative) {
    naja.addEventListener('init', function () {
        this.loader = new Loader(idElement, forceRelative);
    }.bind(this));
    naja.addEventListener('start', showLoader.bind(this));
    naja.addEventListener('complete', complete.bind(this));

    function showLoader() {
        this.loader.show();
    }
    function complete() {
        // hide loader
        this.loader.hide();
        $('html, body').stop(true, true).animate(
            {
                scrollTop: 0
            },
            300
        );
        // attach tooltip
        $('[data-toggle="tooltip"]').tooltip();
    }
    return this;
}



if (typeof Nette !== 'undefined') {

    Nette.formErrorClass = 'form-error';

    /**
     * Add display error message to Nette Form.
     */
    Nette.addError = function(element, message) {
        if (element.focus) {
            element.focus();
        }
        if (message) {
            var e = document.createElement('div');
            e.innerText = message;
            e.className = Nette.formErrorClass;
            element.parentNode.insertBefore(e, element);
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
