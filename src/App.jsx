import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Faq from "./pages/faq";
import Biodata from "./pages/biodata";
import Home from "./pages/home";



function App() {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/home" element={<Home />} />
            <Route path="/biodata" element={<Biodata />} />
    </Routes>
  )
}

export default App;