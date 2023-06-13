$(document).ready(function () {
  // --- Logos Card
  let logoClass = '.hp-projects_item';
  let cardClass = '.hp-projects_card';
  $(logoClass).hover(
    function () {
      let card = $(this).find(cardClass);
      card.css({ visibility: 'visible' }); // Temporarily show the card to measure it

      let buffer = 10; // add a small buffer, adjust as necessary
      var rect = card[0].getBoundingClientRect();

      var fullyVisible =
        rect.left >= buffer &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) - buffer;

      if (fullyVisible) {
        $(this).addClass('active');
      }
    },
    function () {
      $(logoClass).removeClass('active');
    }
  );

  //-- Testimonals
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
      observer: true,
      navigation: {
        nextEl: '.swiper-arrow.next',
        prevEl: '.swiper-arrow.prev',
      },
      on: {
        slideChange: (swiper) => {
          let index = swiper.activeIndex;
          let visuals = $('.about-test_visual-item');

          console.log(index);

          // hide all
          visuals.hide();
          visuals.eq(index).show();
        },
      },
    });

    console.log(swiper);
  }
});
