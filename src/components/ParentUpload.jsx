import React, { useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Upload from "./Upload";
import ImageAnalyser from "./ImageAnalyser";
import BodyCanvas from "./BodyCanvas";
import ClothItem from "./ClothItem";

function ParentUpload() {
  const [imgSrc, setImgSrc] = useState(null);
  const [poses, setPoses] = useState([]);
  const clothingItems = [
    { id: 1, src: "dress1.png" },
    { id: 2, src: "dress2.png" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen items-center justify-center p-4">
        <Upload onImageUpload={setImgSrc} />
        {imgSrc && (
          <ImageAnalyser imgSrc={imgSrc} onPoseDetected={(pose) => setPoses([pose])} />
        )}

        {imgSrc && <BodyCanvas imgSrc={imgSrc} poses={poses} clothItems={clothingItems} />}

        <div className="flex flex-col md:space-x-4 space-y-4 mt-6 ">
          {clothingItems.map(item => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-md transform transition-transform hover:scale-110"
              style={{ width: "100px", height: "100px" }}
            >
              <ClothItem id={item.id} src={item.src} />
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default ParentUpload;
