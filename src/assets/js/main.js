(function() {
    "use strict";

    //===== Prealoder

    window.onload = function() {
        window.setTimeout(fadeout, 200);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function() {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }
    };

    //===== navbar-toggler
    let navbarToggler = document.querySelector(".navbar-toggler");
    navbarToggler.addEventListener('click', function() {
        navbarToggler.classList.toggle("active");
    })


    //======= portfolio-btn active
    var elements = document.getElementsByClassName("portfolio-btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function() {

            // remove class from sibling

            var el = elements[0];
            while (el) {
                if (el.tagName === "BUTTON") {
                    //remove class
                    el.classList.remove("active");

                }
                // pass to the new sibling
                el = el.nextSibling;
            }

            this.classList.add("active");
        };
    }


})();

// ====== scroll top js
function scrollTo(element, to = 0, duration = 1000) {

    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = (() => {

        currentTime += increment;

        const val = Math.easeInOutQuad(currentTime, start, change, duration);

        element.scrollTop = val;

        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    });

    animateScroll();
};

Math.easeInOutQuad = function(t, b, c, d) {

    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

document.querySelector('.scroll-top').onclick = function() {
    scrollTo(document.documentElement);
}