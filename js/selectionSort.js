selectionSortBtn.addEventListener("click", () => {
  disableControls();
  resetDelay();
  setHeights();
  selectionSort();
  window.setTimeout(enableControls, delay);
});

function selectionSort() {
  for (let i = 0; i < size - 1; i++) {
    let minIndex = i;
    updateColor(elements[i], COLORS.swapping); // Highlight current starting point

    for (let j = i + 1; j < size; j++) {
      updateColor(elements[j], COLORS.processing); // Highlight comparison

      if (heights[j] < heights[minIndex]) {
        if (minIndex !== i) updateColor(elements[minIndex], COLORS.base);
        minIndex = j;
        updateColor(elements[minIndex], COLORS.swapping); // New min found
      } else {
        updateColor(elements[j], COLORS.base);
      }
    }

    if (minIndex !== i) {
      [heights[i], heights[minIndex]] = [heights[minIndex], heights[i]];
      updateBars(elements[i], elements[minIndex], heights[i], heights[minIndex], COLORS.swapping);
      updateColor(elements[minIndex], COLORS.base);
    }
    updateColor(elements[i], COLORS.sorted);
  }
  updateColor(elements[size - 1], COLORS.sorted);
}