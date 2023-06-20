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

  function animateChars(chars, individualDuration, direction) {
    chars.each(function (index) {
      let duration = individualDuration;

      let tl = gsap.timeline({
        defaults: {
          delay: individualDuration * index * 0.05,
        },
      });

      tl.to($(this), {
        yPercent: direction === 'in' ? -100 : 0,
        duration: duration / 2,
        ease: Circ.easeOut,
      });
    });
  }

  function handleButtonInteraction(event) {
    let labels = $(this).find('.button_label div');

    labels.each(function () {
      let chars = $(this).find('.char');
      let individualDuration = 0.8;

      animateChars(chars, individualDuration, event.type === 'mouseenter' ? 'in' : 'out');
    });
  }

  $('.button').on('mouseenter mouseleave', handleButtonInteraction);
});
