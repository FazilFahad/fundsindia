(function($) {
    $.fn.scrollingTo = function(opts) {
        var defaults = {
            animationTime: 1000,
            easing: '',
            callbackBeforeTransition: function() {},
            callbackAfterTransition: function() {}
        };

        var config = $.extend({}, defaults, opts);

        $(this).click(function(e) {
            var eventVal = e;
            e.preventDefault();

            var $section = $(document).find($(this).data('section'));
            if ($section.length < 1) {
                return false;
            };

            if ($('html, body').is(':animated')) {
                $('html, body').stop(true, true);
            };

            var scrollPos = $section.offset().top;

            if ($(window).scrollTop() == scrollPos) {
                return false;
            };

            config.callbackBeforeTransition(eventVal, $section);

            $('html, body').animate({
                'scrollTop': (scrollPos + 'px')
            }, config.animationTime, config.easing, function() {
                config.callbackAfterTransition(eventVal, $section);
            });
        });
    };
}(jQuery));
$(document).ready(function() {

    var getWindowWidth = $(window).width();
    var getWindowHeight = $(window).height();

    function headRoom() {
        var header = new Headroom(document.querySelector("#header"), {
            tolerance: {
                up: 8,
                down: 5
            },
            offset: 130,
        });
        header.init();
    }
    headRoom();

    function googleMap() {
        $('#map_canvas1').addClass('scrolloff');
        $('#canvas1').on('click', function() {
            $('#map_canvas1').removeClass('scrolloff');
        });
        $("#map_canvas1").mouseleave(function() {
            $('#map_canvas1').addClass('scrolloff');
        });
    }
    // googleMap();

    function scrollSmooth() {
        $('.classname').click(function() {
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 2000);
            return false;
        });
    }
    // scrollSmooth();

    function matchHeight() {
        var getWindowWidth = $(window).width();
        var getWindowHeight = $(window).height();
        $('.parent').each(function() {
            $(this).find('.child').matchHeight({
                byRow: true,
            });
        });
    }
    matchHeight();

    function viewPortHeight() {
        $(".viewport-banner").css({ "width": getWindowWidth, "height": getWindowHeight });
        console.log("getWindowWidth::" + getWindowWidth + "getWindowHeight::" + getWindowHeight);
    }
    viewPortHeight();

    function accordionControl() {
        // if (getWindowWidth >= 992) {
        $('.panel-collapse.in').collapse('hide');
        // console.log("hide-accordion");
        // } else {
        // $('.panel-collapse:not(".in")').collapse('show');
        // console.log("show-accordion");
        // }
    }
    accordionControl();

    function formStyle() {
        $(".input").focusin(function() {
            $(this).find("span").animate({ "opacity": "0" }, 200);
        });

        $(".input").focusout(function() {
            $(this).find("span").animate({ "opacity": "1" }, 300);
        });
    }
    formStyle();

    function swiperControl() {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            simulateTouch: false,
            loop: true,
            spaceBetween: 20,
            autoplay: 3000,
            breakpoints: {
                1366: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1199: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                767: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                580: {
                    slidesPerView: 1,
                    spaceBetween: 5
                }
            }
        });
    }

    swiperControl();

    function doAnimate() {
        var doAnimations = function() {
            var offset = $(window).scrollTop() + $(window).height(),
                $animatables = $('.animatable');
            if ($animatables.size() == 0) {
                $(window).off('scroll', doAnimations);
            }
            $animatables.each(function(i) {
                var $animatable = $(this);
                if (($animatable.offset().top + $animatable.height() - 200) < offset) {
                    $animatable.removeClass('animatable').addClass('animated');
                }
            });

        };
        $(window).on('scroll', doAnimations);
        $(window).trigger('scroll');
    }
    doAnimate();

    (function() {
        jQuery('.smooth-scroll').scrollingTo();
    }());

    


    function categoryControl() {
        var selectedCategory = $("#categoryCollapse .active").text();
        $(".category-selected").text(" ").append(selectedCategory);
        console.log("selectedCategory::" + selectedCategory);
    }
    // categoryControl();


    // resize
    $(window).resize(function() {

        // accordionControl();
        viewPortHeight();
        swiperControl();
    });
});
