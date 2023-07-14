$(document).ready(function () {
  let classes = ['_1', '_2', '_3', '_4', '_5', '_6', '_7'];
  let element = document.getElementById('404_eyes'); // replace 'yourElementID' with your actual element's id

  console.log(element);

  // Function for shuffling array
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Shuffle classes initially
  classes = shuffle(classes);

  let index = 0;
  setInterval(() => {
    // remove all potential classes
    classes.forEach((cls) => element.classList.remove(cls));
    // add new class
    element.classList.add(classes[index]);
    index++;
    // if we've gone through all the classes, shuffle them and start over
    if (index === classes.length) {
      index = 0;
      classes = shuffle(classes);
    }
  }, 500); // 500 seconds
});
