import React, { useState } from 'react';

function Smth() {
  const [placeholderPosition, setPlaceholderPosition] = useState(null);

  function handleDragOver(event, position) {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    console.log(event.clientY);
    const yPosition = event.clientY - rect.top;
    const cardHeight = rect.height;

    // Calculate the relative position of the cursor inside the card
    if (yPosition < cardHeight / 2) {
      // Cursor is in the top half of the card
      setPlaceholderPosition('top');
    } else {
      // Cursor is in the bottom half of the card
      setPlaceholderPosition('bottom');
    }
  }

  function handleDragLeave() {
    setPlaceholderPosition(null);
  }

  function handleDrop() {
    // Handle the drop logic here
    setPlaceholderPosition(null);
  }

  return (
    <div>
      {placeholderPosition === 'top' && <div style={{ height: '20px', background: 'yellow' }}>Placeholder Top</div>}

      <div
        style={{ width: '100px', height: '100px' }}
        draggable="true"
        onDragOver={(e) => handleDragOver(e, 'top')}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Card 1
      </div>

      {placeholderPosition === 'bottom' && (
        <div style={{ height: '20px', background: 'yellow' }}>Placeholder Bottom</div>
      )}

      <div
        draggable="true"
        onDragOver={(e) => handleDragOver(e, 'bottom')}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Card 2
      </div>
    </div>
  );
}

export default Smth;
