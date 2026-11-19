
import { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";


const center = [13.0427, 80.2307];


function FitRoute({ route }) {

  const map = useMap();

  useEffect(() => {

    if (route) {
      map.fitBounds(
        [route.from.position, route.to.position],
        { padding: [120, 120] }
      );
    }

  }, [route, map]);

  return null;
}


function LayersPanel({ show, setShow }) {

  const [open, setOpen] = useState(true);

  return (
    <div className="panel layers-panel">

      <div className="panel-header" onClick={() => setOpen(!open)}>
        <span>LAYERS</span>
        <span>{open ? "‹" : "›"}</span>
      </div>

      {open && (
        <div className="panel-body">

          {["routes", "stops", "labels"].map((key) => (

            <label key={key} className="check-row">

              <span>{key.toUpperCase()}</span>

              <input
                type="checkbox"
                checked={show[key]}
                onChange={() =>
                  setShow({ ...show, [key]: !show[key] })
                }
              />

            </label>

          ))}

        </div>
      )}

    </div>
  );
}


function RouteFinder({ allStations, onFind, onReset }) {

  const [open, setOpen] = useState(true);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const stationNames = [
    ...new Set(allStations.map((s) => s.name))
  ].sort();

  const find = () => {

    const a = allStations.find((s) => s.name === from);
    const b = allStations.find((s) => s.name === to);

    if (a && b) {
      onFind({ from: a, to: b });
    }

  };

  const reset = () => {

    setFrom("");
    setTo("");

    onReset();

  };

  return (

    <div className="panel route-panel">

      <div className="panel-header" onClick={() => setOpen(!open)}>
        <span>ROUTE FINDER</span>
        <span>{open ? "›" : "‹"}</span>
      </div>

      {open && (

        <div className="panel-body">

          <label className="field-label">ORIGIN STOP</label>

          <select value={from} onChange={(e) => setFrom(e.target.value)}>

            <option value="">Select Origin...</option>

            {stationNames.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}

          </select>


          <label className="field-label">DESTINATION STOP</label>

          <select value={to} onChange={(e) => setTo(e.target.value)}>

            <option value="">Select Destination...</option>

            {stationNames.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}

          </select>


          <div className="btn-row">

            <button className="btn-primary" onClick={find}>
              Find Route
            </button>

            <button className="btn-secondary" onClick={reset}>
              Reset
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


function Legend({ lines }) {

  const [open, setOpen] = useState(true);

  return (

    <div className="panel legend-panel">

      <div className="panel-header" onClick={() => setOpen(!open)}>
        <span>MAP LEGEND</span>
        <span>{open ? "⌄" : "⌃"}</span>
      </div>

      {open && (

        <div className="panel-body">

          {lines.map((l) => (

            <div key={l.id} className="legend-row">

              <span
                className="legend-dash"
                style={{ background: l.color }}
              />

              {l.name}

            </div>

          ))}

          <div className="legend-row">
            <span className="legend-dot" />
            Station / Stop
          </div>

        </div>

      )}

    </div>
  );
}


export default function Map() {

  // Fetch API data inside the component

  const [datas, setDatas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:8001/api/lines")

      .then((res) => {

        if (!res.ok) {
          throw new Error("Failed to fetch metro data");
        }

        return res.json();

      })

      .then((data) => {

        setDatas(data);

      })

      .catch((error) => {

        console.error(error);
        setError(error.message);

      })

      .finally(() => {

        setLoading(false);

      });

  }, []);


  const allStations = datas.flatMap((line) => line.stations);


  const [show, setShow] = useState({
    routes: true,
    stops: true,
    labels: true
  });

  const [route, setRoute] = useState(null);


  const routeKey = useMemo(
    () => route ? route.from.name + route.to.name : "none",
    [route]
  );


  if (loading) {
    return <h3>Loading Metro Map...</h3>;
  }

  if (error) {
    return <h3>API Error: {error}</h3>;
  }


  return (

    <div className="map-wrapper">

      <MapContainer
        center={center}
        zoom={15}
        zoomControl={false}
        className="map"
      >

<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

        <ZoomControl position="topright" />

        <FitRoute route={route} />


        {datas.map((line) => (

          <div key={line.id}>

            {show.routes && (

              <Polyline
                positions={line.stations.map((s) => s.position)}
                pathOptions={{
                  color: line.color,
                  weight: 4
                }}
              />

            )}


            {show.stops && line.stations.map((s) => (

              <CircleMarker
                key={`${line.id}-${s.name}`}
                center={s.position}
                radius={7}
                pathOptions={{
                  color: line.color,
                  fillColor: "#fff",
                  fillOpacity: 1,
                  weight: 3
                }}
              >

                {show.labels && (

                  <Tooltip
                    permanent
                    direction="bottom"
                    offset={[0, 8]}
                    className="station-label"
                  >
                    {s.name}
                  </Tooltip>

                )}

              </CircleMarker>

            ))}

          </div>

        ))}


        {route && (

          <Polyline
            key={routeKey}
            positions={[
              route.from.position,
              route.to.position
            ]}
            pathOptions={{
              color: "#ff8a00",
              weight: 5,
              dashArray: "8 8"
            }}
          />

        )}

      </MapContainer>


      <LayersPanel show={show} setShow={setShow} />

      <RouteFinder
        allStations={allStations}
        onFind={setRoute}
        onReset={() => setRoute(null)}
      />

      <Legend lines={datas} />

    </div>

  );

}
