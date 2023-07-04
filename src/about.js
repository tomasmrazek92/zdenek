$(document).ready(function () {
  // Gallery Grid
  $('.about-find_item')
    .not('[spotify-card]')
    .each(function () {
      var $this = $(this);
      var $imgBox = $this.find('.about-find_img-gallery');
      var $children = $imgBox.children();
      var currentIndex = 0;
      var timeoutId;

      function showNextItem() {
        $children.css('visibility', 'hidden');
        $children.eq(currentIndex).css('visibility', 'visible');
        currentIndex = (currentIndex + 1) % $children.length;
      }

      function startLoop() {
        if (!timeoutId) {
          showNextItem();
          timeoutId = setInterval(showNextItem, 500);
        }
      }

      function stopLoop() {
        clearInterval(timeoutId);
        timeoutId = undefined;
      }

      function checkElementVisibility() {
        if (window.innerWidth <= 991) {
          var rect = $this[0].getBoundingClientRect();
          var windowHeight = window.innerHeight || document.documentElement.clientHeight;
          var offset = (windowHeight - 20) / 2;

          if (rect.top >= offset && rect.bottom <= windowHeight - offset) {
            startLoop();
          } else {
            stopLoop();
          }
        } else {
          stopLoop();
        }
      }

      // Hover
      $(this).hover(function () {
        showNextItem(); // Show first child immediately
        startLoop(); // Start the loop
      }, stopLoop); // Stop the loop on mouseleave

      // Scroll and Resize
      $(window).on('scroll resize', checkElementVisibility);
    });

  let current = 0;
  $('.about-find_spotify-icon').on('click', function () {
    let spotify = $('.about-find_spotify');
    let spotifyText = $('.about-find_spotify-title p');

    current = $(this).hasClass('next') ? current + 1 : current - 1;

    if (current >= spotify.length) {
      current = 0;
    }

    if (current < 0) {
      current = spotify.length - 1;
    }

    spotify.hide();
    spotifyText.hide();
    spotify.eq(current).show();
    spotifyText.eq(current).show();
  });

  // Education
  // --- Logos Card
  let logoClass = '.about-exp_item';
  let cardClass = '.about-exp_card';
  $(logoClass).hover(
    function () {
      let card = $(this).find(cardClass);

      $(this).addClass('active');
      card.css({ visibility: 'visible' }); // Temporarily show the card to measure it

      let buffer = 10; // add a small buffer, adjust as necessary
      var rect = card[0].getBoundingClientRect();

      var fullyVisible =
        rect.left >= buffer &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) - buffer;

      if (!fullyVisible) {
        card.addClass('right');
      }
    },
    function () {
      $(logoClass).removeClass('active');
      $(cardClass).removeClass('right');
      $(cardClass).attr('style', '');
    }
  );

  // --- Acordions
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    '(max-width: 991px)': function () {
      const items = $('.about-exp_item');
      const accordionLine = $('.all_list-accordion-line._2');
      const defaultHeight = $('.about-exp_badge').height() + 8;

      console.log($('.about-exp_badge').height());

      gsap.set(items, { height: defaultHeight });
      gsap.set(accordionLine, { rotation: 90 });

      items.on('click', function () {
        if ($(window).width() <= 991) {
          const tl = gsap.timeline();
          if (!$(this).hasClass('open')) {
            $(this).addClass('open');
            tl.add(open($(this))).add(close(items.not($(this))), '<');
          } else {
            $(this).removeClass('open');
            tl.add(close($(this)));
          }
        }
      });

      function open(elem) {
        let tl = gsap.timeline();
        return tl
          .to(elem, { height: 'auto' })
          .to($(elem).find(accordionLine), { rotation: 0 }, '<');
      }

      function close(elems) {
        let tl = gsap.timeline();
        return tl
          .to(elems, { height: defaultHeight })
          .to($(elems).find(accordionLine), { rotation: 90 }, '<');
      }
    },
  });
});
