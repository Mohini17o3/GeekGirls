import React from "react";
import { Link } from "react-router-dom";
function Landing() {
    return (
        <div className="h-screen flex items-center justify-center ">
         <div className="grid grid-col gap-8">
         <Link to = "/upload">
          <button className="px-6 hover:bg-gray-600"> 
          Create  Outfit</button> 
           </Link>

         <button className="px-6 hover:bg-gray-600"> View  Outfit</button>
         </div>
      
        </div>


    );
}

export default Landing ;