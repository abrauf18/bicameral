// DocumentViewer.js
import React, { useState } from 'react';

const DataAnalysis = ({
  images,
  items,
  highlightedItemId // itemKey we want to highlight
}) => {
  const [currentDoc, setCurrentDoc] = useState(Object.keys(images)[0] || '');

  if (!images || Object.keys(images).length === 0) {
    return <div>No images available.</div>;
  }

  const docList = Object.keys(images);
  const base64Src = images[currentDoc];

  // We assume each itemData might have docName_coords like "INVOICE_coords", "CHECK_coords"
  // We'll find coords for the currentDoc if they exist
  const boundingBoxes = [];
  Object.entries(items).forEach(([itemKey, itemData]) => {
    if (itemKey === 'images') return;
    const { unique_id } = itemData;
    // find something like "INVOICE_coords" that matches currentDoc
    const docCoordsKey = `${currentDoc}_coords`;
    if (itemData[docCoordsKey]) {
      itemData[docCoordsKey].forEach((coordObj) => {
        boundingBoxes.push({
          itemKey,
          unique_id,
          coords: coordObj.coords
        });
      });
    }
  });

  // We'll define an aspect ratio or attempt to fit the image in a container
  // For a real app, you might use a Zoom/Pan library
  // The bounding boxes are absolutely positioned over the image container
  const viewerStyle = {
    position: 'relative',
    border: '1px solid #ccc',
    width: '600px',
    height: '800px', // or auto, or use an actual ratio from the image
    overflow: 'hidden'
  };

  // We'll make the image 100% x 100% so bounding boxes line up with fraction coords
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // or 'cover' depending on your preference
  };

  return (
    <div style={{ flex: 1, padding: '1rem' }}>
      <h3>Document Viewer</h3>
      {/* Document selection */}
      <label>Select Document: </label>
      <select value={currentDoc} onChange={(e) => setCurrentDoc(e.target.value)}>
        {docList.map((docName) => (
          <option key={docName} value={docName}>
            {docName}
          </option>
        ))}
      </select>

      <div style={viewerStyle}>
        <img src={`data:image/png;base64,${base64Src}`} alt="doc" style={imageStyle} />
        {boundingBoxes.map((box, idx) => {
          const [x1, y1, x2, y2] = box.coords;
          const highlight = highlightedItemId === box.itemKey;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${x1 * 100}%`,
                top: `${y1 * 100}%`,
                width: `${(x2 - x1) * 100}%`,
                height: `${(y2 - y1) * 100}%`,
                border: `2px solid ${highlight ? 'red' : 'blue'}`,
                boxSizing: 'border-box',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  backgroundColor: highlight ? 'red' : 'blue',
                  color: '#fff',
                  fontSize: '12px',
                  padding: '2px',
                  position: 'absolute',
                  top: '-1.5em',
                  left: 0,
                }}
              >
                {box.unique_id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataAnalysis;