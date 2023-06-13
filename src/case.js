gsap.registerPlugin(ScrollTrigger);

$('.section_case-hero').each(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.2,
      invalidateOnRefresh: true,
    },
  });

  tl.to('.case-hero_bg', {
    opacity: 0.4,
    scale: 1.1,
  });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: 'html',
        start: 'top top',
        scrub: 0.2,
        invalidateOnRefresh: true,
        markers: true,
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
