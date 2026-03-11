import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Faq from "./pages/faq";
import Biodata from "./pages/biodata";
import Home from "./pages/home";
import Motion from "./pages/motion";
import usestate from "./pages/useState";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/home" element={<Home />} />
      <Route path="/biodata" element={<Biodata />} />
      <Route path="/motion" element={<Motion />} />
    </Routes>
  );
}

export default App;
