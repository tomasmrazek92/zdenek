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

// Video Autoplay
var U = async () => {
  await y(E);
  let o = document.querySelectorAll('video');
  if (!o.length) return;

  let e = new Map(), // Track intersection observer status
    i = new IntersectionObserver((t) => {
      for (let { target: r, isIntersecting: n } of t) {
        if (r instanceof HTMLVideoElement) {
          e.set(r, n);
          let videoContainer = r.closest('.w-background-video');
          let button = findButtonWithinContainer(videoContainer);
          if (button) {
            // Get current video state, assume paused by default
            let isPlaying = button.getAttribute('data-is-playing') === 'true';

            // Check if we need to update video state
            if ((isPlaying && !n) || (!isPlaying && n)) {
              triggerButtonClick(button);
              // Update the state in the data attribute
              button.setAttribute('data-is-playing', n.toString());
            }
          }
        }
      }
    }, {});

  for (let t of o) {
    (t.autoplay = !1), e.set(t, null), i.observe(t);

    // Initialize the button attribute
    let videoContainer = t.closest('.w-background-video');
    let button = findButtonWithinContainer(videoContainer);
    if (button) {
      button.setAttribute('data-is-playing', 'false');

      // Handle manual click
      button.addEventListener('click', () => {
        let isPlaying = button.getAttribute('data-is-playing') === 'true';
        button.setAttribute('data-is-playing', (!isPlaying).toString());
      });
    }
  }

  let s = b(document, 'visibilitychange', () => {
    for (let [t, r] of e) {
      let button = findButtonWithinContainer(t.parentElement);
      if (button) {
        let isPlaying = button.getAttribute('data-is-playing') === 'true';
        if ((document.hidden && isPlaying) || (!document.hidden && !isPlaying)) {
          triggerButtonClick(button);
          // Update the state in the data attribute
          button.setAttribute('data-is-playing', (!document.hidden).toString());
        }
      }
    }
  });

  return x(m, e, () => {
    i.disconnect(), s();
  });
};
