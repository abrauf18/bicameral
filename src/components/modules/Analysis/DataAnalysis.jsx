import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const DataAnalysis = ({
  images,
  items,
  highlightedItemId,
}) => {
  const [currentDoc, setCurrentDoc] = useState(Object.keys(images)[0] || "");

  if (!images || Object.keys(images).length === 0) {
    return <div>No images available.</div>;
  }

  const docList = Object.keys(images);
  const base64Src = images[currentDoc];

  const boundingBoxes = [];
  Object.entries(items).forEach(([itemKey, itemData]) => {
    if (itemKey === "images") return;
    const { unique_id } = itemData;
    const docCoordsKey = `${currentDoc}_coords`;
    if (itemData[docCoordsKey]) {
      itemData[docCoordsKey].forEach((coordObj) => {
        boundingBoxes.push({
          itemKey,
          unique_id,
          coords: coordObj.coords,
        });
      });
    }
  });

  const viewerStyle = {
    position: "relative",
    border: "1px solid #ccc",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <div style={{ flex: 1, padding: "1rem" }}>
      <h3 className="text-xl font-bold mb-2 flex justify-center">
        Document Viewer
      </h3>

      <Select value={currentDoc} onValueChange={setCurrentDoc}>
        <SelectTrigger className="max-w-[200px] mb-2 font-semibold">
          <SelectValue placeholder="Select a document" />
        </SelectTrigger>
        <SelectContent>
          {docList.map((docName) => (
            <SelectItem key={docName} value={docName}>
              {docName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div style={viewerStyle}>
        <TransformWrapper>
          <TransformComponent>
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <img
                src={`data:image/png;base64,${base64Src}`}
                alt="doc"
                style={imageStyle}
              />
              {boundingBoxes.map((box, idx) => {
                const [x1, y1, x2, y2] = box.coords;
                const highlight = highlightedItemId === box.itemKey;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: `${x1 * 100}%`,
                      top: `${y1 * 100}%`,
                      width: `${(x2 - x1) * 100}%`,
                      height: `${(y2 - y1) * 100}%`,
                      border: `2px solid ${highlight ? "red" : "blue"}`,
                      boxSizing: "border-box",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: highlight ? "red" : "blue",
                        color: "#fff",
                        fontSize: "12px",
                        padding: "2px",
                        position: "absolute",
                        top: "-1.5em",
                        left: 0,
                      }}
                    >
                      {box.unique_id}
                    </div>
                  </div>
                );
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default DataAnalysis;
