import {BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/homePage'
import {ToastContainer} from 'react-toastify'
function App() {

  return (
    <>
    <BrowserRouter>
    <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
