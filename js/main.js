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
      case 2: timeGap = 100; break;
      case 3: timeGap = 50; break;
      case 4: timeGap = 20; break;
      case 5: timeGap = 5; break;   // Fast
      default: timeGap = 50;
  }
}