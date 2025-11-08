insertionSortBtn.addEventListener("click", () => {
  disableControls();
  resetDelay();
  setHeights();
  insertionSort();
  window.setTimeout(enableControls, delay);
});

function insertionSort() {
  for (let i = 1; i < size; i++) {
    let currentVal = heights[i];
    let j = i - 1;
    updateColor(elements[i], COLORS.swapping);

    while (j >= 0 && heights[j] > currentVal) {
      updateBars(elements[j], elements[j + 1], heights[j], heights[j], COLORS.processing);
      heights[j + 1] = heights[j];
      j--;
    }
    heights[j + 1] = currentVal;
    updateBars(elements[j + 1], elements[i], heights[j + 1], currentVal, COLORS.base);
    
    // Mark sorted portion (visual aid)
    for(let k = 0; k <= i; k++) {
        updateColor(elements[k], COLORS.sorted);
    }
  }
}