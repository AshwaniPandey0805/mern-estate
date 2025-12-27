  import './App.css'
  import { BrowserRouter, Route, Routes } from "react-router-dom"
  import { ToastContainer } from "react-toastify"
  import Home from './pages/Home.jsx'
  import SignIn from './pages/SignIn.jsx'
  import SignUp from './pages/SignUp.jsx'
  import About from './pages/About.jsx'
  import Profile from './pages/Profile.jsx' 
  import Header from "./components/Header.jsx"
  import { Private, Public } from './components/AuthGaurd.jsx'
  
  function App() {

    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<Public />}>
            <Route path='/sign-in' element={<SignIn />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route element={<Private />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
        {/* Toster Container */}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme='colored' 
        />
      </BrowserRouter>
    )
  }

  export default App