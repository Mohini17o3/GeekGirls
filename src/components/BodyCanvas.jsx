import React, { useRef, useEffect, useState } from "react";
import { useDrop } from "react-dnd";

function BodyCanvas({ imgSrc, poses, clothItems }) {
  const [droppedClothes, setDroppedClothes] = useState([]);
  const canvasRef = useRef();

  const [, drop] = useDrop({
    accept: "clothing",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const x = offset.x - canvasRef.current.offsetLeft;
      const y = offset.y - canvasRef.current.offsetTop;
      setDroppedClothes((prev) => [...prev, { id: item.id, x, y }]);
    },
  });

 // Define the scaling factor based on keypoints retrieved from output of posenet
const calculateScaleFactor = () => {
  if (poses.length === 0) return { scaleX: 1, scaleY: 1 };

  const keypoints = poses[0].keypoints;
  // console.log(keypoints); // Output keypoints to console for debugging

  // Find keypoints and get x values
  let leftShoulder = keypoints.find(kp => kp.part === "leftShoulder");
  let rightShoulder = keypoints.find(kp => kp.part === "rightShoulder");
  let leftAnkle = keypoints.find(kp => kp.part === "leftAnkle");
  let rightHip = keypoints.find(kp => kp.part === "rightHip");

  // Checking if all keypoints are found, if not, just scale by default values
  if (!leftShoulder || !rightShoulder || !leftAnkle || !rightHip) return { scaleX: 1, scaleY: 1 };

  // Calculate shoulder width and torso height
  const shoulderWidth = Math.abs(leftShoulder.position.x - rightShoulder.position.x);
  const torsoHeight = Math.abs(leftShoulder.position.y - leftAnkle.position.y);

  // Adjust these factors based on your clothing image's natural dimensions
  const scaleX = shoulderWidth; // Adjust based on your clothing image's natural width
  const scaleY = torsoHeight; // Adjust based on your clothing image's natural height

  return { scaleX, scaleY };
};


  const scaleClothing = (clothId, position) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const clothItem = clothItems.find((item) => item.id === clothId);
    img.src = clothItem.src;

    const { scaleX, scaleY } = calculateScaleFactor();

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
      ctx.drawImage(img, position.x, position.y, img.width * scaleX, img.height * scaleY);
    };
  };

  useEffect(() => {
    if (droppedClothes.length > 0) {
      const lastDropped = droppedClothes[droppedClothes.length - 1];
      scaleClothing(lastDropped.id, { x: lastDropped.x, y: lastDropped.y });
    }
  }, [droppedClothes]);

  return (
    <div ref={drop} className="relative">
    <canvas ref={canvasRef} width="300" height="400" />
    {imgSrc && (
      <img
        src={imgSrc}
        alt="User"
        className="absolute top-0 left-0 w-full h-full"
        style={{ opacity: 0.7, zIndex:1}}
      />
    )}
    {droppedClothes.map((cloth, index) => {
      const clothItem = clothItems.find((item) => item.id === cloth.id);
      const { scaleX, scaleY } = calculateScaleFactor();

      return (
        <img
          key={index}
          src={clothItem.src}
          alt="Cloth Item"
          className="absolute top-0 left-0 w-full h-full"
          style={{
            width: `${clothItem.width * scaleX}px`, // Ensure width has units (e.g., pixels)
            height: `${clothItem.height * scaleY}px`, // Ensure height has units (e.g., pixels)
            zIndex: 2,
          }}
        />
      );
    })}
  </div>
);

}

export default BodyCanvas;
