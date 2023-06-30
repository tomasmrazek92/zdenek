// -- Hero Animation
let figmaBlock = '.figma-block-text-block';
let figmaCursor = 'body';
let figmaText = '.figma-block-text';
let figmaProfile = 'body';

let tl = gsap.timeline({
  delay: 0.2,
  durattion: 0.5,
  yoyo: true,
  repeat: -1,
  repeatDelay: 1.5,
  ease: Power1.easeOut,
});

tl.to(figmaCursor, {
  '--cursorX': '0.5em',
  '--cursorY': '0.5em',
})
  .fromTo(
    figmaBlock,
    {
      width: '1.2em',
      height: '0.5em',
      borderRadius: '0%',
    },
    {
      width: '1em',
      height: '1em',
      borderRadius: '50%',
    },
    '<0.1'
  )
  .to(
    figmaText,
    {
      yPercent: 30,
      opacity: 0,
    },
    '<'
  )
  .to(
    figmaProfile,
    {
      '--profileOpacity': '1',
      '--profileY': '0%',
    },
    '<'
  );

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
      let video = $(this).find('video');
      if (video.length) {
        console.log(video);
        video[0].load();
        video[0].play();
      }
    }
  },
  function () {
    $(logoClass).each(function () {
      $(this).removeClass('active');
      let video = $(this).find('video');
      if (video.length) {
        video[0].pause();
        video[0].currentTime = 0;
      }
    });
  }
);
