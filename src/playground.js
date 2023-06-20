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

  const base64Image = canvas.toDataURL();

  // Decode the base64-encoded image data
  const decodedImage = atob(base64Image.split(',')[1]);

  // Convert the decoded binary data to a text string
  const textString = new TextDecoder('utf-8').decode(
    new Uint8Array([...decodedImage].map((char) => char.charCodeAt(0)))
  );

  // Set the value of the hidden input field
  imageDataInput.value = base64Image;
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
let init = false;
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
  });
});

function swiperMode(swiperInstance) {
  const mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');
  const desktop = window.matchMedia('(min-width: 992px)');

  if (modalOpen) {
    // Disable (for desktop)
    if (desktop.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper(swiperInstance, {
          // Optional parameters
          slidesPerView: 'auto',
          spaceBetween: 48,
          speed: 500,
          observer: true,
          mousewheel: true,
          keyboard: {
            enabled: true,
          },
        });
      }
    }

    // Enable (for Mobile)
    else if (mobile.matches) {
      if (init) {
        swiper.destroy(true, true);
        init = false;
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

// --- Close Modal
$('#modalClose').on('click', function () {
  // Swiper
  if (swiper) {
    swiper.destroy();
  }
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
  });
  tl.to(
    modal,
    {
      opacity: 0,
    },
    '<'
  );
  tl.set(modal, { display: 'none' });
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
