function setHeights() {
  heights = [];
  for (let i = 0; i < size; i++) {
    heights.push(parseInt(elements[i].style.height));
  }
}

function resetDelay() {
  delay = 0;
}

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
