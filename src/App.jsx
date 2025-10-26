import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar';
import Home from './component/Home';
import Paste from './Paste';
import ViewPaste from './component/ViewPaste';
const router=createBrowserRouter(
 [
  {
    path :"/",
    element :
    <div>
    <Navbar/>
     <Home/>
    </div>
  },
   {
    path :"/Paste",
    element :
    <div>
      <Navbar/>
      <Paste/>
    </div>
  },
   {
    path :"/pastes :id",
    element :
    <div>
      <Navbar/>
      <ViewPaste/>

    </div>
  },
 ]
);

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
