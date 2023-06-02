var timeoutId; // Variable to store the timeout ID
$('.about-find_item').hover(
  function () {
    var $imgBox = $('.about-find_img-gallery');
    var $children = $imgBox.children().not(':first-child'); // Exclude the first child

    // Hide all children except the first
    $children.hide();

    var currentIndex = 0;

    // Define a function to show the next child item
    function showNextItem() {
      $children.hide(); // Hide all children
      $children.eq(currentIndex).show(); // Show the current child
      currentIndex = (currentIndex + 1) % $children.length; // Increment the index, wrapping around if needed
      timeoutId = setTimeout(showNextItem, 1000); // Schedule the next iteration after 1 second
    }

    showNextItem(); // Start the loop
  },
  function () {
    // Hover out handler
    clearTimeout(timeoutId); // Clear the timeout to stop the loop
    $('.about-find_img-gallery').children().not(':first-child').hide(); // Hide all children when hovering out
  }
);
