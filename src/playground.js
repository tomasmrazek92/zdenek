/* --- Note Modal */
const canvas1 = document.getElementById('drawingCanvas-dark');
const ctx1 = canvas1.getContext('2d');
ctx1.strokeStyle = 'black';

const canvas2 = document.getElementById('drawingCanvas-light');
const ctx2 = canvas2.getContext('2d');
ctx2.strokeStyle = 'white';

let drawing = false;
let base64ImageBlack;
let base64ImageWhite;

ctx1.lineWidth = 15;
ctx1.lineCap = 'round'; // Set the line cap to round
ctx2.lineWidth = 15;
ctx1.lineCap = 'round'; // Set the line cap to round

const imageDarkDataInput = document.getElementById('base64Image-dark');
const imageLightDataInput = document.getElementById('base64Image-light');

function getCoordinates(e, touch = false) {
  const rect = canvas1.getBoundingClientRect();
  const scaleX = canvas1.width / rect.width;
  const scaleY = canvas1.height / rect.height;
  const offsetX = (touch ? e.touches[0].clientX : e.clientX) - rect.left;
  const offsetY = (touch ? e.touches[0].clientY : e.clientY) - rect.top;

  return { offsetX: offsetX * scaleX, offsetY: offsetY * scaleY };
}

function startDrawing(e, touch = false) {
  drawing = true;
  toggleState(true);
  const { offsetX, offsetY } = getCoordinates(e, touch);
  ctx1.beginPath();
  ctx1.moveTo(offsetX, offsetY);
}

function draw(e, touch = false) {
  if (!drawing) return;
  const { offsetX, offsetY } = getCoordinates(e, touch);
  ctx1.lineTo(offsetX, offsetY);
  ctx1.stroke();
  ctx2.lineTo(offsetX, offsetY);
  ctx2.stroke();
}

function stopDrawing() {
  if (!drawing) return;
  drawing = false;
  base64ImageBlack = canvas1.toDataURL();
  base64ImageWhite = canvas2.toDataURL();
}

function toggleState(state) {
  $('#createBtn').toggleClass('disabled', !state);
  $('#canvas-embed').toggleClass('active', state);
}

// Mouse events
canvas1.addEventListener('mousedown', startDrawing);
canvas1.addEventListener('mousemove', draw);
canvas1.addEventListener('mouseup', stopDrawing);

// Touch events
canvas1.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    startDrawing(e, true);
  },
  { passive: false }
);

canvas1.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
    draw(e, true);
  },
  { passive: false }
);

canvas1.addEventListener('touchend', stopDrawing);

// Create Note
$('#createBtn').on('click', async function () {
  // Prevent multiple submissions
  $(this).addClass('disabled');

  var dots = '.';
  var btn = $(this); // Save reference to button
  var submitInterval = setInterval(function () {
    dots = dots.length < 3 ? dots + '.' : '.';
    btn.text('Submitting' + dots); // Use saved button reference
  }, 500);

  // API Call
  const uploadImage = async (base64Image) => {
    try {
      const response = await fetch('https://api.zdenek.design/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64: base64Image }),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Server responded with an error:', errorResponse);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`There was a problem with the fetch operation: ${error.message}`);
      if (error.stack) {
        console.error(error.stack);
      }
    }
  };

  // use Promise.all to wait for both promises to resolve
  Promise.all([uploadImage(base64ImageBlack), uploadImage(base64ImageWhite)])
    .then(([dataDark, dataLight]) => {
      // Success: both promises have resolved
      console.log('Dark image data:', dataDark.url);
      console.log('Light image data:', dataLight.url);

      imageDarkDataInput.value = '';
      imageLightDataInput.value = '';

      $('[name="img-source-dark"').val(dataDark.url);
      $('[name="img-source-light"').val(dataLight.url);

      // Submit the Form
      $('#submitBtn').trigger('click');
      $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url.includes('https://webflow.com/api/v1/form/')) {
          const isSuccessful = xhr.status === 200;
          const redirectFormName = 'note-form';
          const isRedirectForm = settings.data.includes(redirectFormName);
          if (isSuccessful) {
            clearInterval(submitInterval);
            startRotationAndTextUpdate();
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
        }
      });
    })
    .catch((error) => console.log('Caught an error:', error));
});

// Open modal
$('.plg-note_item.button-item').on('click', function () {
  $('html,body').addClass('overflow-hidden');
});

// Close Note
$('[close-note]').on('click', function () {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  toggleState(false);
  $('html,body').removeClass('overflow-hidden');
});

/* --- PLG Modal */
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
    if (window.matchMedia('(min-width: 0px) and (max-width: 991px)').matches) {
      $(modalContent)
        .find('video')
        .each(function () {
          var video = $(this)[0];
          video.load();
          video.muted = true; // Mute the video
          video.oncanplaythrough = function () {
            video.play();
          };
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
  tl.set(modal, { display: 'none' }, '<');

  // Swiper
  if (swiper) {
    swiper.destroy();
  }
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

// Submitting Animation
function startRotationAndTextUpdate() {
  var degree = 0;
  var textArray = [
    'Optimizing for Nokia3310...',
    'Optimizing for IE6...',
    'Minions work hard to save your brilliant massage...',
    'Optimizing for Apple Watch...',
    'Summoning loading minions...',
    'Polishing pixels, one by one...',
    'Unleashing loading ninjas...',
    'Summoning loading unicorns...',
    'This 5s is for you, breathe in, breathe out...',
    '5s can be long right?...',
    "Tap your screen three times and whisper 'loading' for a faster results..",
    'Patient bring results...',
    'Just a second, I have to start up my windows...',
  ];

  // Rotate the element every 500ms
  $('#rotateBox').addClass('spin');

  // Update the text of another element every 2000ms
  // Shuffle array
  textArray.sort(() => Math.random() - 0.5);

  var index = 0;
  var textInterval = setInterval(function () {
    $('#text-help').text(textArray[index]);
    index++;
    if (index === textArray.length) {
      clearInterval(textInterval);
    }
  }, 2000);

  // Countdown from 5 every second
  var countdownValue = 5;
  var countdownInterval = setInterval(function () {
    countdownValue--;
    $('#countdownText').text(countdownValue);
    if (countdownValue === 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}
