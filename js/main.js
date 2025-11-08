// Initialization & Event Listeners

generateArrayBtn.addEventListener("click", generateArray);
arraySizeSlider.addEventListener("input", updateArraySize);
speedSlider.addEventListener("input", updateSpeed);

window.onload = () => {
    updateSpeed();
    generateArray();
};

// Array Generation

function generateArray() {
  arrayContainer.innerHTML = "";
  // Dynamic bar width based on container size and number of elements
  const containerWidth = arrayContainer.clientWidth - 40;
  const barWidth = Math.max(2, Math.floor(containerWidth / size) - 2);

  for (let i = 0; i < size; i++) {
    const height = Math.floor(Math.random() * 400) + 20;
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${height}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.backgroundColor = COLORS.base;
    arrayContainer.appendChild(bar);
  }
  elements = arrayContainer.children;
}

// Dynamic Updates

function updateArraySize() {
  size = parseInt(arraySizeSlider.value);
  generateArray();
}

function updateSpeed() {
  const val = parseInt(speedSlider.value);
  // Map slider 1-5 to appropriate millisecond delays
  switch(val) {
      case 1: timeGap = 200; break; // Slow
      case 2: timeGap = 150; break;
      case 3: timeGap = 125; break;
      case 4: timeGap = 100; break;
      case 5: timeGap = 75; break;
      case 6: timeGap = 50; break;
      case 7: timeGap = 30; break;
      case 8: timeGap = 20; break;
      case 9: timeGap = 10; break;
      case 10: timeGap = 5; break;    // Fast
      default: timeGap = 50;
  }
}

// Get display elements
const arraySizeDisplay = document.getElementById("arraySizeValue");
const speedDisplay = document.getElementById("speedValue");

// Update array size dynamically
arraySizeSlider.addEventListener("input", () => {
  arraySizeDisplay.textContent = arraySizeSlider.value;
  size = parseInt(arraySizeSlider.value);
  generateArray();
});

// Update speed dynamically
speedSlider.addEventListener("input", () => {
  speedDisplay.textContent = speedSlider.value;
  updateSpeed();
});
