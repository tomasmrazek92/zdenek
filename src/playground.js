/* Drawing */
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
  imageDataInput.value = textString;
});

/* Modals */

const modal = '.plg-modal';
const modalContent = '.plg-modal_content';
let item;

$('.plg-visuals_visual').on('click', function () {
  var item = $(this);
  var name = item.find('.name').val();
  var slug = item.find('.slug').val();
  var modal = '.plg-modal';
  var modalContent = '.plg-modal_content';

  $(modalContent)
    .empty()
    .load('/playground-items/' + slug + ' ' + '.plg-modal_slider', function () {
      $('.plg-modal_head-inner p').text(name);
      let tl = gsap.timeline();
      tl.set(modal, {
        opacity: 0,
      });
      tl.to(modal, {
        opacity: 1,
        display: 'block',
      });
      let items = $(modal).find('.plg-modal_item-1');
      tl.from(items, {
        y: '2rem',
        opacity: 0,
        stagger: {
          each: 0.2,
        },
      });
    });
});

$('#modalClose').on('click', function () {
  let tl = gsap.timeline();
  let items = $(modal).find('.plg-modal_item-1');
  tl.to(items, {
    y: '2rem',
    opacity: 0,
    stagger: {
      each: 0.2,
    },
  });
  tl.to(modal, {
    opacity: 0,
  });
  tl.set(modal, { display: 'none' });
});
