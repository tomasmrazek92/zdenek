gsap.registerPlugin(ScrollTrigger);

$('.section_case-hero').each(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'top top',
      end: 'bottom top',
      scrub: 0.2,
      invalidateOnRefresh: true,
    },
  });

  tl.to('.case-hero_bg', {
    keyframes: {
      '50%': {
        opacity: 0.4,
      },
    },
    scale: 1.2,
  });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: 'html',
        start: 'top top',
        scrub: 0.2,
        invalidateOnRefresh: true,
      },
    })
    .to('#scroll-arrow', {
      keyframes: {
        '50%': {
          opacity: 0,
        },
      },
    });
});
