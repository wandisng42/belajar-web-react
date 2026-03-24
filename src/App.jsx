import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Faq from "./pages/faq";
import Biodata from "./pages/biodata";
import Home from "./pages/home";
import Motion from "./pages/motion";
import UseState from "./pages/useState";
import DataUser from "./pages/data-user";
import DetailCards from "./pages/detail-cards";
import StyleDataUser from "./pages/component/style-data-user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/home" element={<Home />} />
      <Route path="/biodata" element={<Biodata />} />
      <Route path="/motion" element={<Motion />} />
      <Route path="/useState" element={<UseState />} />
      <Route path="/data-user" element={<DataUser />} />
      <Route path="/detail-cards/:userid" element={<DetailCards />} />
      <Route path="/style-data-user" element={<StyleDataUser />} />
    </Routes>
  );
}

export default App;
