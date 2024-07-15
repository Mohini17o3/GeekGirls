import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ParentUpload from './components/ParentUpload.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
 
  },
  {
    path: "/upload",
    element: <ParentUpload />,
 
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>,
)
