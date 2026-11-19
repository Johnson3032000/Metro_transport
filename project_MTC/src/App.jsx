import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import { DataProvider } from "./components/Fetchdatad";
import Map from "./pages/Map";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <>

 <ThemeProvider>
  <div style={{position:"sticky", width:"100%", top:"0px"}}>
      <Navbar />
  
  </div>

   
    <DataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/dataset" element={<Datasets />} />
      </Routes>
    </DataProvider>
    </ThemeProvider>
     
   
    </>
       
  );
}

export default App;