$(document).ready(function () {
  // --- Work Cards
  $(document).ready(function () {
    $('.hp-work_item').hover(
      function () {
        const $childVideo = $(this).find('.work-video');
        $childVideo.show();
        $childVideo.find('video')[0].currentTime = 0; // Start from the beginning
        $childVideo.find('video')[0].play();
      },
      function () {
        const $childVideo = $(this).find('.work-video');
        $childVideo.hide();
        $childVideo.find('video')[0].pause();
      }
    );
  });

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
});
