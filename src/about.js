$(document).ready(function () {
  // Gallery Grid
  $('.about-find_item').each(function () {
    var $imgBox = $(this).find('.about-find_img-gallery');
    var $children = $imgBox.children();
    var currentIndex = 0;
    var timeoutId;

    function showNextItem() {
      $children.hide(); // Hide all children
      $children.eq(currentIndex).show(); // Show the current child
      currentIndex = (currentIndex + 1) % $children.length; // Increment the index, wrapping around if needed
      timeoutId = setTimeout(showNextItem, 500); // Schedule the next iteration after 0.5 seconds
    }

    function startLoop() {
      if (!timeoutId) {
        showNextItem();
      }
    }

    function stopLoop() {
      clearTimeout(timeoutId); // Clear the timeout to stop the loop
      timeoutId = undefined;
    }

    $(this).hover(startLoop, stopLoop);

    // Start the loop immediately if the element is already being hovered
    if ($(this).is(':hover')) {
      startLoop();
    }
  });

  // Education
  // --- Logos Card
  let logoClass = '.about-exp_item';
  let cardClass = '.about-exp_card';
  $(logoClass).hover(
    function () {
      let card = $(this).find(cardClass);

      console.log('card');
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
          tl.add(open($(this))).add(close(items.not($(this))), '<');
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
