import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const words = window.location.search.split('=')[1].split(',');

  console.log(words);

  const [currentColor, setCurrentColor] = useState('');

  const [cellColors, setCellColors] = useState(Array(16).fill(''));

  const handleColorClick = (color) => {
    setCurrentColor(color);
  };

  const colorOptions = ['#F9DF6D', '#A0C35A', '#B0C4EF', '#BB81C5'];

  // click handler that will set the color of that cell to currenColor
  const handleCellClick = (idx) => {
    // update the color of the cell at idx to be currentColor
    setCellColors((prevCellColors) => {
      const newCellColors = [...prevCellColors];
      newCellColors[idx] = currentColor;
      return newCellColors;
    });
  };

  return (
    <div className="App">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '10px'
      }}>
        {colorOptions.map((color, idx) => (
          <div key={idx} style={{ backgroundColor: color, padding: '10px' }} onClick={() => handleColorClick(color)}>
            &nbsp;
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '10px'
      }}>

        {words.map((word, idx) => (
          <div key={idx} style={{ backgroundColor: cellColors[idx], padding: '10px' }} onClick={() => handleCellClick(idx)}>
            {word}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
