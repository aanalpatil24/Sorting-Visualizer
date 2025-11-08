quickSortBtn.addEventListener("click", () => {
  disableControls();
  resetDelay();
  setHeights();
  quickSort(0, size - 1);
  window.setTimeout(() => {
      updateAllColors(0, size - 1, COLORS.sorted);
      enableControls();
  }, delay);
});

function quickSort(start, end) {
  if (start < end) {
    const pivotIdx = partition(start, end);
    quickSort(start, pivotIdx - 1);
    quickSort(pivotIdx + 1, end);
  }
}

function partition(start, end) {
  const pivotValue = heights[end];
  let pivotIndex = start;
  updateColor(elements[end], COLORS.swapping); // Highlight pivot

  for (let i = start; i < end; i++) {
    updateColor(elements[i], COLORS.processing);
    if (heights[i] < pivotValue) {
      updateBars(elements[i], elements[pivotIndex], heights[i], heights[pivotIndex], COLORS.swapping);
      [heights[i], heights[pivotIndex]] = [heights[pivotIndex], heights[i]];
      updateBars(elements[i], elements[pivotIndex], heights[i], heights[pivotIndex], COLORS.base);
      pivotIndex++;
    } else {
      updateColor(elements[i], COLORS.base);
    }
  }
  // Final pivot swap
  updateBars(elements[end], elements[pivotIndex], heights[end], heights[pivotIndex], COLORS.swapping);
  [heights[end], heights[pivotIndex]] = [heights[pivotIndex], heights[end]];
  updateBars(elements[end], elements[pivotIndex], heights[end], heights[pivotIndex], COLORS.base);
  
  return pivotIndex;
}