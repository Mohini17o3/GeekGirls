import React from "react";
import {useDrag } from "react-dnd" ;

function ClothItem ({id , src}) {
const [ { isDragging }, drag] = useDrag({
    type: "clothing",
    item: { id, src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

return (  
    <div
    ref={drag}
    className="cursor-pointer"
    style={{ opacity: isDragging ? 0.5 : 1, 
    cusor : 'move',
    pointerEvents: isDragging ? "none" : "auto" }}
  >
    <img src={src} alt={`Clothing ${id}`} className="w-20 h-20 object-contain" />
  </div>);

}

export default ClothItem ; 