// Utility Functions for Sorting Visualizer

// Stores the current heights of bars for use in sorting algorithms
function setHeights() {
  heights = [];
  for (let i = 0; i < size; i++) {
    heights.push(elements[i].offsetHeight);
  }
}

// Utility Functions
function resetDelay() {
  delay = 0;
}

function setHeights() {
  heights = [];
  for (let i = 0; i < size; i++) {
    heights.push(parseInt(elements[i].style.height));
  }
}

// 🎨 Animation Helpers

function updateBars(el1, el2, height1, height2, color) {
  window.setTimeout(() => {
    if (el1) {
        el1.style.height = `${height1}px`;
        el1.style.backgroundColor = color;
    }
    if (el2) {
        el2.style.height = `${height2}px`;
        el2.style.backgroundColor = color;
    }
  }, (delay += timeGap));
}

function updateColor(element, color) {
  window.setTimeout(() => {
    if (element) element.style.backgroundColor = color;
  }, (delay += timeGap));
}

function updateAllColors(start, end, color) {
  window.setTimeout(() => {
    for (let i = start; i <= end; i++) {
       if (elements[i]) elements[i].style.backgroundColor = color;
    }
  }, (delay += timeGap));
}

// 🕹️ UI Controls

function disableControls() {
  const controls = [
    generateArrayBtn, arraySizeSlider, speedSlider,
    bubbleSortBtn, selectionSortBtn, insertionSortBtn, quickSortBtn, mergeSortBtn
  ];
  controls.forEach(c => c.disabled = true);
}

function enableControls() {
  const controls = [
    generateArrayBtn, arraySizeSlider, speedSlider,
    bubbleSortBtn, selectionSortBtn, insertionSortBtn, quickSortBtn, mergeSortBtn
  ];
  controls.forEach(c => c.disabled = false);
}

// Swap heights and change colors during comparisons
function updateBars(element1, element2, height1, height2, color) {
  window.setTimeout(() => {
    element1.style.height = `${height1}px`;
    element2.style.height = `${height2}px`;
    element1.style.background = color;
    element2.style.background = color;
  }, (delay += inc_delay));
}

// Change color of a single bar
function updateColor(element, color = "#3b82f6") {
  window.setTimeout(() => {
    element.style.background = color;
  }, (delay += inc_delay));
}

// Used in Merge Sort to update color + height simultaneously
function mergeUpdate(element, height, color) {
  window.setTimeout(() => {
    element.style.height = `${height}px`;
    element.style.background = color;
  }, (delay += inc_delay));
}

// Apply color to a range of bars (e.g., marking sorted portion)
function updateAllColors(start, end, color) {
  window.setTimeout(() => {
    for (let i = start; i <= end; i++) {
      elements[i].style.background = color;
    }
  }, (delay += inc_delay));
}

// ⛔ Disable Controls During Sorting
function disableControls() {
  [
    bubbleSort,
    mergeSort,
    selectionSort,
    quickSort,
    speed,
    arraySize,
    generateArray,
  ].forEach((control) => (control.disabled = true));

  // Subtle visual feedback
  document.querySelectorAll("button, input").forEach((el) => {
    el.style.opacity = "0.6";
    el.style.cursor = "not-allowed";
  });
}

// Enable Controls After Sorting (Optional Helper)
function enableControls() {
  [
    bubbleSort,
    mergeSort,
    selectionSort,
    quickSort,
    speed,
    arraySize,
    generateArray,
  ].forEach((control) => (control.disabled = false));

  document.querySelectorAll("button, input").forEach((el) => {
    el.style.opacity = "1";
    el.style.cursor = "pointer";
  });
}
