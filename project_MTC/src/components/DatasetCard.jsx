import "bootstrap/dist/css/bootstrap.min.css";
import { FiFileText, FiCalendar, FiHardDrive, FiDownload } from "react-icons/fi";
import "./DatasetCard.css";
import { useData } from "./Fetchdatad";
import { useTheme } from "./ThemeContext";

const defaultDataset = {
  title: "Chennai Metro (CMRL)",
  description:
    "Chennai Metro Rail Limited official schedules, station coordinates, and fare rules for Blue and Green lines.",
  updated: "FEB 02, 2026",
  size: "147 KB",
  files: [
    "agency.txt",
    "calendar.txt",
    "calendar_dates.txt",
    "fare_attributes.txt",
    "fare_rules.txt",
    "frequencies.txt",
    "routes.txt",
    "shapes.txt",
    "stop_times.txt",
    "stops.txt",
    "transfers.txt",
    "trips.txt",
  ],
  downloadUrl: "#",
};

const DatasetCard = ({ dataset = defaultDataset }) => {
   const data = useData();
   const { theme, toggleTheme } = useTheme();
   
  const { title, description, updated, size, files, downloadUrl } = dataset;

  return (

    <div style={{backgroundColor: theme === "light" ? "white" : "#363636",
        color: theme === "light" ? "black" : "white", borderRadius:"10px"}}>

      {
        data.map((item,index)=> (

      <article  key={index} style={{ backgroundColor: theme === "light" ? "white" : "#363636",
        color: theme === "light" ? "black" : "white", borderRadius:"10px", border: `5px solid ${item.color}`}} className="dcard my-3 row g-0 mx-0">
      {/* Left: details */}
      <div className="col-12 col-lg-8 dcard__main">
        <h3 className="dcard__title">{item.name}</h3>
        <p className="dcard__desc">{item.description}</p>

        <div className="dcard__meta d-flex flex-wrap">
          <span className="dcard__meta-item">
            <FiCalendar aria-hidden="true" /> UPDATED: {item.updated_date}
          </span>
          <span className="dcard__meta-item">
            <FiHardDrive aria-hidden="true" /> SIZE: {item.size}
          </span>
        </div>
      </div>

      {/* Right: included files */}
      <div style={{backgroundColor: item.background}} className="col-12 col-lg-4 dcard__side">
        <h4 className="dcard__side-title">
          <FiFileText aria-hidden="true" /> INCLUDED FILES
        </h4>

        <div className="dcard__chips d-flex flex-wrap">
          {files.map((f) => (
            <span key={f} className="dcard__chip">
              {f}
            </span>
          ))}
        </div>

        <a href={item.download_url} style={{backgroundColor:item.color}} className="dcard__btn" download>
          <FiDownload aria-hidden="true" /> DOWNLOAD ZIP
        </a>
      </div>
    </article>

        ))
      }
      </div>

     
  );
};

export default DatasetCard;