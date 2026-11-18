import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Datasets from "./pages/Datasets";
import { DataProvider } from "./components/Fetchdatad";
import Map from "./pages/Map";

function App() {
  return (
    <>

      <Navbar />

    <DataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Map />} />
        <Route path="/dataset" element={<Datasets />} />
      </Routes>
    </DataProvider>
     
   
    </>
       
  );
}

export default App;