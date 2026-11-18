import DataCatalog from "../components/DataCatalog";
import DatasetCard from "../components/DatasetCard";
import Footer from "../components/Footer";


export default function Datasets() {
  return (
    <div>


      {/* <div style={{display:"flex"}}>
        <div>
            <h1>Data Catalog</h1>
            <p>
                Download Chennai's public transit data in standardized GTFS formats. All datasets are provided under the Open Data License for public use.
            </p>
        </div>
        <div>
            
        <img style={{height:"100px", width:"300px"}} src={transport} alt="" />

        </div>


      </div> */}

      <DataCatalog/>

      <div style={{backgroundColor:"#E0F2FE", borderRadius:"10px"}} className="px-3 py-3 mx-5">
        Note: The data is licensed under the Government Open Data License – India (GODL).

      </div>

      {/* <div>
    
     <div>
      <div>
        <h1>Chennai Metro (CMRL)</h1>
        <p>Chennai Metro Rail Limited official schedules, station coordinates, and fare rules for Blue and Green lines.</p>
      </div>
      <div></div>
     </div>
     </div> */}

        <div style={{ borderRadius:"10px"}} className="px-1 py-3 mx-5">
       
     <DatasetCard/>


        </div>

<Footer/>

    </div>
  )
}
