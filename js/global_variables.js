// Global Configuration & References

// DOM Elements
const arrayContainer = document.getElementById("array");
const generateArrayBtn = document.getElementById("generateArray");
const arraySizeSlider = document.getElementById("arraySize");
const speedSlider = document.getElementById("speed");

// Algorithm Buttons
const bubbleSortBtn = document.getElementById("bubbleSort");
const selectionSortBtn = document.getElementById("selectionSort");
const insertionSortBtn = document.getElementById("insertionSort");
const quickSortBtn = document.getElementById("quickSort");
const mergeSortBtn = document.getElementById("mergeSort");

// Visualization State

// Animation pacing
let delay = 0;
let timeGap = 50;

// Array data
let elements = [];
let heights = [];

// Initial configuration
let size = parseInt(arraySizeSlider.value) || 50;

// Color Scheme
const COLORS = {
  base: "#3b82f6",
  processing: "#facc15",
  swapping: "#ef4444",
  sorted: "#22c55e",
};