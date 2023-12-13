import './App.css';
import React, { useState } from 'react';

function shuffleArray(array, seed) {
  if (seed === 0) {
    return array;
  }

  let rng = SeededRandom(seed);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function SeededRandom(seed) {
  let m = 0x80000000; // 2**31;
  let a = 1103515245;
  let c = 12345;

  seed = seed || Math.floor(Math.random() * m);
  return function () {
    seed = (a * seed + c) % m;
    return seed / m;
  };
}

function sanitizeInput(input) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(decodeURIComponent(input)));
  return div.innerHTML;
}

function App() {
  const words = window.location.search.split('=')[1].split(',');

  console.log(words);

  const [currentColor, setCurrentColor] = useState('');

  const [cellColors, setCellColors] = useState(Array(16).fill(''));

  const [shuffleIndex, setShuffleIndex] = useState(0);

  const handleColorClick = (color) => {
    setCurrentColor(color);
  };

  const colorOptions = ['#F9DF6D', '#A0C35A', '#B0C4EF', '#BB81C5'];

  // click handler that will set the color of that cell to currenColor
  const handleCellClick = (idx) => {
    // update the color of the cell at idx to be currentColor
    setCellColors((prevCellColors) => {
      const newCellColors = [...prevCellColors];
      newCellColors[idx] = prevCellColors[idx] === currentColor ? '' : currentColor;
      return newCellColors;
    });
  };

  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const shuffledOrder = shuffleArray(order, shuffleIndex);

  return (
    <div className="App" style={{ maxWidth: '100%' }}>
      <div style={{
        display: 'grid',
        maxWidth: '100%',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(1, 1fr)',
      }}>
        {colorOptions.map((color, idx) => (
          <div key={idx} style={{ cursor: 'pointer', borderRadius: 50, backgroundColor: color, padding: '10px', border: (color === currentColor ? '3px solid black' : `1px solid ${color}`) }} onClick={() => handleColorClick(color)}>
            &nbsp;
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '20px',
        maxWidth: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
      }}>

        {shuffledOrder.map((originalIndex, idx) => (
          <div key={idx} style={{ borderRadius: 50, backgroundColor: cellColors[originalIndex], padding: '10px' }} onClick={() => handleCellClick(originalIndex)}>
            {sanitizeInput(words[originalIndex])}
          </div>
        ))}
      </div>

      <button style={{ margin: 10, padding: 5 }} onClick={() => setShuffleIndex(shuffleIndex + 1)}>Shuffle</button>

    </div>
  );
}

export default App;
