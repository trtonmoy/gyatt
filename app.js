const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function createPopups(i) {
    i = i || 0;
    if (i < 100) {
        const newPopup = document.createElement('div');
        newPopup.classList.add('popup');
        randomTop = getRandomNumber(0, winHeight);
        randomLeft = getRandomNumber(0, winWidth);
        newPopup.style.top = randomTop + 'px';
        newPopup.style.left = randomLeft + 'px';
        document.body.appendChild(newPopup);
        i++;
        setTimeout(function () {
            createPopups(i);
        }, 50);
    }
}

function showPopups(i) {
    const popups = document.getElementsByClassName('box');
    i = i || 0;
    if (i < popups.length) {
        randomTop = getRandomNumber(0, winHeight);
        randomLeft = getRandomNumber(0, winWidth);
        popups[i].style.top = randomTop + 'px';
        popups[i].style.left = randomLeft + 'px';
        popups[i].style.display = 'block';
        i++;
    }
    setTimeout(function () {
        showPopups(i);
    }, 50);
}

let textIndex = 0;

function typeWriter() {
  const searchInput = document.getElementById('form-search');
  const searchButton = document.getElementById('google_search');
  const textToType = "GYATT ME...";
  const speed = 100;

  if (textIndex < textToType.length) {
    searchInput.textContent += textToType.charAt(textIndex);
    textIndex++;
    setTimeout(typeWriter, speed);
  } else {
    searchButton.classList.add('shake-hard');
    setTimeout(() => {
      searchButton.classList.remove('shake-hard');
    }, 500);
  }
}


window.addEventListener('load', function () {
  setTimeout(() => {
    document.getElementById('form-search').textContent = '';
    typeWriter();
  }, 1000);

   // Get a list of all ".close" elements
   let closeButtons = document.querySelectorAll('.close');

   // Add click event listener to each ".close" element
   closeButtons.forEach(function(button) {
     button.addEventListener('click', function() {
       // Get the parent ".box" element and hide it
       let parentBox = button.closest('.box');
       if (parentBox) {
         parentBox.style.display = 'none';
       }
     });
   });

  document.getElementById('google_search').addEventListener('click', function () {
    showPopups(0);
  });

    // Global variable to keep track of the highest z-index assigned
    let highestZIndex = 0; 

    // Get a list of all ".box" elements 
    let elements = document.querySelectorAll('.box');

    // Function to enable dragging of ".box" elements
    function dragElement(element) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        let title = element.querySelector(".title");

        // When title is pressed
        title.onmousedown = function(event) {
        // Get initial cursor position 
        pos3 = event.clientX;
        pos4 = event.clientY;

        // Bring ".box" element to front by changing z-index
        highestZIndex = highestZIndex + 1;     // Get next highest z-index 
        element.style.zIndex = highestZIndex;   // Assign it to this element

        // When mouse is moved while button is down
        document.onmousemove = function(event) {
            // Calculate new cursor position 
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;

            // Move the ".box" element
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        };

        // When mouse button is released
        document.onmouseup = function() {
            // Stop tracking the mouse movement
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
    }

    // Make all ".box" elements draggable and bring them to the front when their title is clicked
    elements.forEach(dragElement);


});




