$(document).ready(function () {
  // --- Nav
  let menuOpen = false;
  let scrollPosition;
  $('.navbar_menu-btn').on('click', function () {
    if (!menuOpen) {
      scrollPosition = $(window).scrollTop();
      $('html, body').scrollTop(0).addClass('overflow-hidden');
      menuOpen = true;
    } else {
      $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
      menuOpen = false;
    }
  });
  $('.navbar_menu-overlay').on('click', function () {
    $('.navbar_menu-btn').trigger('click');
  });

  // --- Testimonals
  let testimonials = '.about-test_content';

  if ($(testimonials)) {
    let swiper = new Swiper(testimonials, {
      // Optional parameters
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 250,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      observer: true,
      autoHeight: true,
      navigation: {
        nextEl: '.swiper-arrow.next',
        prevEl: '.swiper-arrow.prev',
      },
      breakpoints: {
        0: {
          autoHeight: true,
        },
        992: {
          autoHeight: false,
        },
      },
      on: {
        slideChange: (swiper) => {
          let index = swiper.realIndex;
          let visuals = $('.about-test_visual-item');
          let overlay = $('.about-test_overlay');

          // hide all
          overlay.stop().animate({ width: '102%' }, 500, function () {
            visuals.hide();
            visuals.eq(index).show();
            overlay.animate({ width: '0%' });
          });
        },
      },
    });
  }

  // --- Buttons
  let splitType = new SplitType('.button_label div', {
    types: 'chars',
    tagName: 'span',
  });

  function handleButtonInteraction(elem, direction) {
    let labels = $(elem).find('.button_label div');
    if (labels.length) {
      let main = gsap.timeline();

      main.to(labels.eq(0), {
        duration: direction === true ? 0.7 : 1.4,
        yPercent: direction === true ? -100 : 0,
      });

      main.to(
        labels.eq(1).find('.char'),
        {
          yPercent: direction === true ? -100 : 0,
          delay: 0.1,
          duration: direction === true ? 0.7 : 1,
          stagger: {
            each: direction === true ? 0.015 : 0,
          },
          ease: Circ.easeOut,
        },
        '<'
      );
    }
  }

  $('.button').on('mouseenter mouseleave', function (event) {
    if (window.innerWidth >= 992) {
      handleButtonInteraction($(this), event.type === 'mouseenter' ? true : false);
    }
  });

  // Email Copy
  $('[email-btn]').click(function () {
    let str = $(this).find('.button_label div:first-child').text();
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });

  // --- Transition
  let transitionTrigger = $('.page-transition_trigger');
  let introDurationMS = 1000;
  let exitDurationMS = 800;
  let excludedClass = 'no-transition';

  // On Link Click
  $('a').on('click', function (e) {
    $('.page-transition_mask').addClass($(this).is('[work-link]') ? 'bg-dark' : 'bg-default');

    if (
      $(this).prop('hostname') === window.location.host &&
      $(this).attr('href').indexOf('#') === -1 &&
      !$(this).hasClass(excludedClass) &&
      $(this).attr('target') !== '_blank' &&
      transitionTrigger.length > 0
    ) {
      e.preventDefault();
      let transitionURL = $(this).attr('href');
      transitionTrigger.click();
      setTimeout(function () {
        window.location = transitionURL;
      }, exitDurationMS);
    }
  });

  // On Back Button Tap
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
  // Hide Transition on Window Width Resize
  setTimeout(() => {
    $(window).on('resize', function () {
      setTimeout(() => {
        $('.page-transition').css('display', 'none');
      }, 50);
    });
  }, introDurationMS);
});
