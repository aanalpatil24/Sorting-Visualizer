import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, Settings, BarChart2 } from 'lucide-react';

// =========================================
// 🎨 Constants & Utility Functions
// =========================================
const PRIMARY_COLOR = 'bg-blue-500';
const COMPARE_COLOR = 'bg-yellow-400';
const SWAP_COLOR = 'bg-red-500';
const SORTED_COLOR = 'bg-green-500';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  // =========================================
  // 🎣 State Management
  // =========================================
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(25); // Default middle ground
  const [animationSpeed, setAnimationSpeed] = useState(5); // Default middle speed (1-10 range)
  const [isSorting, setIsSorting] = useState(false);
  const [sortingAlgo, setSortingAlgo] = useState('');
  
  // Track visual states of bars [indices]
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Refs for current state access inside async sorting functions
  const arrayRef = useRef(array);
  arrayRef.current = array;
  const speedRef = useRef(animationSpeed);
  speedRef.current = animationSpeed;
  const isSortingRef = useRef(isSorting);
  isSortingRef.current = isSorting;

  // =========================================
  // ⚙️ Helper Actions
  // =========================================
  const getDelay = () => {
    // Speed range is now 1-10.
    // We want 10 to be fast but not instant (e.g., 50ms delay)
    // We want 1 to be slow (e.g., 500ms delay)
    // Formula: (11 - speed) * 50
    // Speed 10 = (11 - 10) * 50 = 50ms
    // Speed 1 = (11 - 1) * 50 = 500ms
    return (11 - speedRef.current) * 50;
  };

  const generateArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 400) + 10); // Heights between 10 and 410
    }
    setArray(newArray);
    setSortedIndices([]);
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortingAlgo('');
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const resetColors = () => {
    setComparingIndices([]);
    setSwappingIndices([]);
  };

  // =========================================
  // 🫧 Bubble Sort
  // =========================================
  const bubbleSort = async () => {
    setIsSorting(true);
    setSortingAlgo('Bubble Sort');
    const arr = [...arrayRef.current];
    const n = arr.length;
    let sorted = [...sortedIndices];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;

        setComparingIndices([j, j + 1]);
        await sleep(getDelay());

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(getDelay());
        }
        resetColors();
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    sorted.push(0);
    setSortedIndices([...sorted]);
    finishSorting();
  };

  // =========================================
  // 🔍 Selection Sort
  // =========================================
  const selectionSort = async () => {
    setIsSorting(true);
    setSortingAlgo('Selection Sort');
    const arr = [...arrayRef.current];
    const n = arr.length;
    let sorted = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setComparingIndices([minIdx, j]);
        await sleep(getDelay());
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setSwappingIndices([i, minIdx]);
        await sleep(getDelay());
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
      }
      sorted.push(i);
      setSortedIndices([...sorted]);
      resetColors();
    }
    finishSorting();
  };

  // =========================================
  // ✋ Insertion Sort
  // =========================================
  const insertionSort = async () => {
    setIsSorting(true);
    setSortingAlgo('Insertion Sort');
    const arr = [...arrayRef.current];
    const n = arr.length;

    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      setComparingIndices([i]);
      await sleep(getDelay());

      while (j >= 0 && arr[j] > key) {
        setComparingIndices([j, j + 1]);
        setSwappingIndices([j + 1]);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep(getDelay());
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      
      setSortedIndices(Array.from({length: i + 1}, (_, k) => k));
      resetColors();
    }
    finishSorting();
  };

  // =========================================
  // ⚡ Quick Sort
  // =========================================
  const quickSort = async () => {
    setIsSorting(true);
    setSortingAlgo('Quick Sort');
    let arr = [...arrayRef.current];
    await quickSortHelper(arr, 0, arr.length - 1);
    finishSorting();
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      setSortedIndices(prev => [...prev, pi]); 
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
       setSortedIndices(prev => [...prev, low]);
    }
  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    setSwappingIndices([high]);
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
      setComparingIndices([j, high]);
      await sleep(getDelay());

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        if (i !== j) await sleep(getDelay());
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(getDelay());
    resetColors();
    return (i + 1);
  };

  // =========================================
  // 🧩 Merge Sort
  // =========================================
  const mergeSort = async () => {
    setIsSorting(true);
    setSortingAlgo('Merge Sort');
    let arr = [...arrayRef.current];
    await mergeSortHelper(arr, 0, arr.length - 1);
    finishSorting();
  };

  const mergeSortHelper = async (arr, l, r) => {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;
    const currentMergeRange = [];
    for(let idx=l; idx<=r; idx++) currentMergeRange.push(idx);
    setComparingIndices(currentMergeRange);

    while (i < n1 && j < n2) {
      await sleep(getDelay());
      setSwappingIndices([k]);
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }
    while (i < n1) {
      await sleep(getDelay());
      setSwappingIndices([k]);
      arr[k] = L[i];
      setArray([...arr]);
      i++;
      k++;
    }
    while (j < n2) {
      await sleep(getDelay());
      setSwappingIndices([k]);
      arr[k] = R[j];
      setArray([...arr]);
      j++;
      k++;
    }
    resetColors();
  };

  const finishSorting = () => {
    setSortedIndices(arrayRef.current.map((_, idx) => idx));
    setComparingIndices([]);
    setSwappingIndices([]);
    setIsSorting(false);
    setSortingAlgo('');
  };

  // =========================================
  // 🖥️ Render
  // =========================================
  
  // Calculate dynamic transition duration based on current speed
  // Ensure it's slightly faster than the delay to avoid lag
  const transitionDuration = `${Math.max(50, getDelay() * 0.8)}ms`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Header */}
      <header className="pt-6 pb-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 tracking-wider flex items-center justify-center gap-3">
          <BarChart2 className="w-8 h-8" />
          Sorting Visualizer
        </h1>
        {sortingAlgo && (
          <p className="text-slate-400 mt-2 animate-pulse">
             Currently running: <span className="text-yellow-400 font-semibold">{sortingAlgo}</span>
          </p>
        )}
      </header>

      {/* Visualizer Area */}
      <main className="flex-grow flex items-end justify-center px-4 pb-36 pt-8 overflow-hidden">
        <div className="relative w-full max-w-6xl h-[450px] bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 flex items-end justify-center shadow-2xl">
            {array.map((height, idx) => {
              let colorClass = PRIMARY_COLOR;
              if (sortedIndices.includes(idx)) colorClass = SORTED_COLOR;
              if (comparingIndices.includes(idx)) colorClass = COMPARE_COLOR;
              if (swappingIndices.includes(idx)) colorClass = SWAP_COLOR;

              return (
                <div
                  key={idx}
                  // Removed static 'duration-100' class in favor of dynamic inline style
                  className={`mx-[1px] rounded-t-md transition-all ease-in-out ${colorClass}`}
                  style={{
                    height: `${height}px`,
                    width: `${Math.max(4, Math.floor(900 / arraySize))}px`, 
                    transitionDuration: transitionDuration, // Dynamic real-time smoothing
                    opacity: isSorting && !sortedIndices.includes(idx) && !comparingIndices.includes(idx) && !swappingIndices.includes(idx) ? 0.8 : 1
                  }}
                ></div>
              );
            })}
        </div>
      </main>

      {/* 🎛️ Controls Section */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-md border-t border-slate-700 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
          
          {/* Sliders Group */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto">
            <button
                onClick={generateArray}
                disabled={isSorting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all active:scale-95 whitespace-nowrap"
            >
                <RefreshCw className={`w-4 h-4 ${isSorting ? 'animate-spin' : ''}`} />
                New Array
            </button>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-center">
                {/* Size Slider 1-50 */}
                <div className="flex flex-col items-center sm:items-start">
                <label className="text-xs font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                    Size: <span className="text-blue-400 text-sm">{arraySize}</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="50"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isSorting}
                    className="w-32 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
                />
                </div>

                {/* Speed Slider 1-10 */}
                <div className="flex flex-col items-center sm:items-start">
                <label className="text-xs font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                    Speed: <span className="text-yellow-400 text-sm">{animationSpeed}</span>
                </label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                    disabled={isSorting}
                    className="w-32 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-yellow-500 disabled:opacity-50"
                />
                </div>
            </div>
          </div>

          {/* Algorithm Buttons Group */}
          <div className="flex flex-wrap justify-center gap-2 w-full xl:w-auto">
            <AlgoButton onClick={bubbleSort} disabled={isSorting} label="Bubble Sort" color="blue" />
            <AlgoButton onClick={selectionSort} disabled={isSorting} label="Selection Sort" color="indigo" />
            <AlgoButton onClick={insertionSort} disabled={isSorting} label="Insertion Sort" color="violet" />
            <AlgoButton onClick={quickSort} disabled={isSorting} label="Quick Sort" color="fuchsia" />
            <AlgoButton onClick={mergeSort} disabled={isSorting} label="Merge Sort" color="pink" />
          </div>

        </div>
      </footer>
    </div>
  );
}

function AlgoButton({ onClick, disabled, label, color }) {
    const colorVariants = {
        blue: 'bg-blue-600 hover:bg-blue-500',
        indigo: 'bg-indigo-600 hover:bg-indigo-500',
        violet: 'bg-violet-600 hover:bg-violet-500',
        fuchsia: 'bg-fuchsia-600 hover:bg-fuchsia-500',
        pink: 'bg-pink-600 hover:bg-pink-500',
    }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colorVariants[color] || 'bg-slate-600'} text-white px-3 py-2 lg:px-4 lg:py-3 rounded-lg font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex-grow md:flex-grow-0 shadow-lg`}
    >
      {label}
    </button>
  );
}