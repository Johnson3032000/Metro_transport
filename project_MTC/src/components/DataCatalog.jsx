import React from "react";
import "./DataCatalog.css";
import dataCatalog from '../assets/multimodeltransport.jpg'
import { useTheme } from "./ThemeContext";


const DataCatalog = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <section style={{backgroundColor: theme === "light" ? "white" : "#363636",
        color: theme === "light" ? "black" : "white"}} className="catalog py-5">
      <div className="container-xxl">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Text */}
          <div  className="col-12 col-lg-7">
            <h2 style={{fontSize:"50px"}} className="catalog__title fw-bold mb-3">Data Catalog</h2>
            <p style={{fontSize:"22px"}} className="catalog__text mb-0">
              Download Chennai's public transit data in standardized GTFS
              formats. All datasets are provided under the Open Data License for
              public use.
            </p>
          </div>

          <div className="col-12 col-lg-5">
            <div className="catalog__strip d-flex">
           
                <img style={{width:"100%"}}
                  src={dataCatalog}
                />
         
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataCatalog;