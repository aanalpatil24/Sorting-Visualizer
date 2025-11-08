mergeSortBtn.addEventListener("click", () => {
  disableControls();
  resetDelay();
  setHeights();
  mergeSort(0, size - 1);
  window.setTimeout(enableControls, delay);
});

function mergeSort(start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }
}

function merge(start, mid, end) {
  let temp = [], i = start, j = mid + 1;
  // Highlight active merge section
  updateAllColors(start, end, COLORS.processing);

  while (i <= mid && j <= end) {
    if (heights[i] <= heights[j]) temp.push(heights[i++]);
    else temp.push(heights[j++]);
  }
  while (i <= mid) temp.push(heights[i++]);
  while (j <= end) temp.push(heights[j++]);

  for (let k = 0; k < temp.length; k++) {
    heights[start + k] = temp[k];
    // Visualize overwrite
    updateBars(elements[start + k], elements[start + k], temp[k], temp[k], COLORS.sorted);
  }
}