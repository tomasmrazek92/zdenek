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
      autoHeight: true,
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      observer: true,
      navigation: {
        nextEl: '.swiper-arrow.next',
        prevEl: '.swiper-arrow.prev',
      },
      on: {
        slideChange: (swiper) => {
          let index = swiper.realIndex;
          let visuals = $('.about-test_visual-item');
          let overlay = $('.about-test_overlay');

          console.log(index);

          // hide all
          overlay.stop().animate({ width: '102%' }, 500, function () {
            visuals.hide();
            visuals.eq(index).show();
            overlay.animate({ width: '0%' });
          });
        },
      },
    });

    console.log(swiper);
  }

  // --- Buttons
  let splitType = new SplitType('.button_label div', {
    types: 'chars',
    tagName: 'span',
  });

  function handleButtonInteraction(elem) {
    let labels = $(elem).find('.button_label div');
    let main = gsap.timeline({ paused: true });

    main.clear();

    main.fromTo(
      labels.eq(0),
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
      }
    );

    main.fromTo(
      labels.eq(1).find('.char'),
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
        delay: 0.1,
        duration: 0.7,
        stagger: {
          each: 0.015,
        },
        ease: Circ.easeOut,
      },
      '<'
    );

    main.restart();
  }

  $('.button').on('mouseenter', function () {
    handleButtonInteraction($(this));
  });
});
