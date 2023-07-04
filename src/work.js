$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);
  const items = $('.all_list-item');

  ScrollTrigger.matchMedia({
    '(max-width: 991px)': function () {
      const accordionLine = $('.all_list-accordion-line._2');
      const defaultHeight = $('.all_logo').height() + 12;

      gsap.set(items, { height: defaultHeight });
      gsap.set(accordionLine, { rotation: 90 });

      items.on('click', function () {
        if ($(window).width() <= 991) {
          let video = $(this).find('video');
          const tl = gsap.timeline();
          if (!$(this).hasClass('open')) {
            $(this).addClass('open');
            tl.add(open($(this))).add(close(items.not($(this))), '<');
            if (video.length) {
              video[0].load();
              video[0].play();
            }
          } else {
            $(this).removeClass('open');
            tl.add(close($(this)));
            if (video.length) {
              $(this).find('video')[0].pause();
              $(this).find('video')[0].currentTime = 0;
            }
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

  items.hover(
    function () {
      let video = $(this).find('video');
      if (video.length) {
        video[0].load();
        video[0].play();
      }
      $('.all_list-visual_inner').find('img').removeAttr('loading');
    },
    function () {
      let video = $(this).find('video');
      if (video.length) {
        $(this).find('video')[0].pause();
        $(this).find('video')[0].currentTime = 0;
      }
    }
  );
});
