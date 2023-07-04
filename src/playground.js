/* --- Drawing */
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

ctx.lineWidth = 5; // Set the line width to 5 pixels

const imageDataInput = document.getElementById('base64Image');

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  ctx.beginPath();
  ctx.moveTo(offsetX * scaleX, offsetY * scaleY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  ctx.lineTo(offsetX * scaleX, offsetY * scaleY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;

  const base64Image = canvas.toDataURL('');
  const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  // Set the value of the hidden input field
  imageDataInput.removeAttribute('maxlength');
  imageDataInput.value = base64Data;
});

$('#createBtn').on('click', function () {
  $('#submitBtn').trigger('click');
});

/* --- Modals */
const modal = '.plg-modal';
const modalContent = '.plg-modal_content';
const modalSlider = '.plg-modal_slider';
let item;
let swiper;
let modalOpen = false;
let swiperInit = false;
let scrollPosition;

// --- Open Modal
$('.plg-visuals_visual').on('click', function () {
  let item = $(this);
  let name = item.find('.name').val();
  let slug = item.find('.slug').val();

  // Reset
  $(modalContent).empty();

  // Reveal
  let tl = gsap.timeline();
  tl.set(modal, {
    opacity: 0,
  });
  tl.to(modal, {
    opacity: 1,
    display: 'block',
  });

  // Load
  $(modalContent).load('/playground-items/' + slug + ' ' + '.plg-modal_slider', function () {
    modalOpen = true;
    if (swiperInit) {
      swiper.destroy(true, true);
      swiperInit = false;
    }

    // Disable Scroll
    disableScroll();

    // Swiper
    swiperMode(modalSlider);

    // Content
    $('.plg-modal_head-inner p').text(name);
    let items = $(modal).find('.plg-modal_item-1');
    let tl = gsap.timeline();
    tl.from(items, {
      y: '2rem',
      opacity: 0,
      stagger: {
        each: 0.2,
      },
    });

    // Play All videos
    if (window.matchMedia('(min-width: 0px) and (max-width: 991px)')) {
      $(modalContent)
        .find('video')
        .each(function () {
          $(this)[0].load();
          $(this)[0].play();
        });
    }
  });
});

function swiperMode(swiperInstance) {
  const mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');
  const desktop = window.matchMedia('(min-width: 992px)');

  if (modalOpen) {
    // Disable (for desktop)
    if (desktop.matches) {
      if (!swiperInit) {
        swiperInit = true;
        swiper = new Swiper(swiperInstance, {
          // Optional parameters
          slidesPerView: 'auto',
          spaceBetween: 48,
          speed: 500,
          observer: true,
          mousewheel: {
            thresholdDelta: 35,
          },
          keyboard: {
            enabled: true,
          },
          longSwipesRatio: 0.01,
          on: {
            slideChange: (swiper) => {
              handleVideos($('.swiper-wrapper'), swiper.realIndex);
            },
            init: (swiper) => {
              handleVideos($('.swiper-wrapper'), swiper.realIndex);
            },
            onRealIndexChange: (swiper) => {
              swiper.allowTouchMove = false;
              swiper.unsetGrabCursor();
            },
            onTouchEnd: (swiper) => {
              swiper.allowTouchMove = true;
            },
          },
        });
      }
    }

    // Enable (for Mobile)
    else if (mobile.matches) {
      if (swiperInit) {
        swiper.destroy(true, true);
        swiperInit = false;
      }
    }
  }
}

// Load
window.addEventListener('load', function () {
  swiperMode(modalSlider);
});

// Resize
window.addEventListener('resize', function () {
  swiperMode(modalSlider);
});

// Handle Videos
const handleVideos = (slider, index) => {
  let videos = $(slider).find('[visual-video]').not('.w-condition-invisible');
  let slides = $(slider).find('.swiper-slide');
  let currentSlide = slides.eq(index);
  console.log(videos);

  // stop all
  videos.each(function () {
    $(this).find('video')[0].pause();
    $(this).find('video')[0].currentTime = 0;
  });

  let currentVideo = currentSlide.find(videos).find('video')[0];
  console.log(currentVideo);

  if (currentVideo) {
    currentVideo.play();
  }
};

// --- Close Modal
$('#modalClose').on('click', function () {
  modalOpen = false;

  // Enable Scroll
  disableScroll();

  // Animation
  let tl = gsap.timeline();
  let items = $(modal).find('.plg-modal_item-1');
  tl.to(items, {
    y: '2rem',
    opacity: 0,
    stagger: {
      each: 0.2,
    },
    duration: 0.3,
  });
  tl.to(
    modal,
    {
      opacity: 0,
      duration: 0.3,
    },
    '<'
  );
  tl.set(modal, { display: 'none' }, '<0.1');
  tl.call(() => {
    // Swiper
    if (swiper) {
      swiper.destroy();
    }
  });
});

// Close on Esc
document.addEventListener('keydown', function (event) {
  if (modalOpen === true && event.keyCode === 27) {
    $('#modalClose').click();
  }
});

// Scroll Disabler
const disableScroll = () => {
  if (modalOpen) {
    scrollPosition = $(window).scrollTop();
    $('html, body').scrollTop(0).addClass('overflow-hidden');
  } else {
    $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
  }
};
