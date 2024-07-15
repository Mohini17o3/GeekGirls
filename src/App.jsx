import { Outlet } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import ParentUpload from './components/ImageAnalyser'

function App() {


  return (
    <>
  <Navbar />
  <Landing />
    </>
  )
}

export default App
