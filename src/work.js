$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    '(max-width: 991px)': function () {
      const items = $('.all_list-item');
      const accordionLine = $('.all_list-accordion-line._2');
      const defaultHeight = $('.all_logo').height() + 12;

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
