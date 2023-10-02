import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage"
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp"

function App() {
  return (
     <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<p>route doesn't exists 404</p>}/>
      </Routes>
  )
}

export default App
