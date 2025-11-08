bubbleSortBtn.addEventListener("click", () => {
  disableControls();
  resetDelay();
  setHeights();
  bubbleSort();
  window.setTimeout(enableControls, delay);
});

function bubbleSort() {
  for (let i = 0; i < size - 1; i++) {
    for (let j = 0; j < size - i - 1; j++) {
      updateBars(elements[j], elements[j + 1], heights[j], heights[j + 1], COLORS.processing);

      if (heights[j] > heights[j + 1]) {
        [heights[j], heights[j + 1]] = [heights[j + 1], heights[j]];
        updateBars(elements[j], elements[j + 1], heights[j], heights[j + 1], COLORS.swapping);
      }
      updateBars(elements[j], elements[j + 1], heights[j], heights[j + 1], COLORS.base);
    }
    updateColor(elements[size - 1 - i], COLORS.sorted);
  }
  updateColor(elements[0], COLORS.sorted);
}