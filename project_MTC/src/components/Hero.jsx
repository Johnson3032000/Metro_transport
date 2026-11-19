import React from "react";
import "./Hero.css";
import { useTheme } from "./ThemeContext";


const CityIllustration = () => (
  <svg
    className="hero__svg"
    viewBox="0 0 420 250"
    role="img"
    aria-label="City skyline with an elevated metro line"
  >
    {/* dashed connectors */}
    <g className="ln-dash">
      <path d="M52 28 V22 H168 V52" />
      <path d="M262 48 V36 H348 V52" />
      <path d="M294 18 V80" />
    </g>

    {/* wifi */}
    <g className="ln">
      <path d="M110 12 a9 9 0 0 1 14 0" />
      <path d="M113 16 a5 5 0 0 1 8 0" />
    </g>

    {/* location pins */}
    <g className="fill-blue">
      <path d="M106 58 a7 7 0 0 1 7 7 c0 6 -7 12 -7 12 s-7 -6 -7 -12 a7 7 0 0 1 7 -7z" />
      <path d="M294 0 a7 7 0 0 1 7 7 c0 6 -7 12 -7 12 s-7 -6 -7 -12 a7 7 0 0 1 7 -7z" />
    </g>
    <g fill="#fff">
      <circle cx="106" cy="65" r="2.5" />
      <circle cx="294" cy="7" r="2.5" />
    </g>

    {/* chat bubble */}
    <rect x="322" y="20" width="22" height="16" rx="2" className="fill-blue" />
    <path d="M326 36 v5 l6 -5z" className="fill-blue" />
    <g className="ln-white">
      <path d="M326 26 h14 M326 30 h10" />
    </g>

    {/* curved glass tower */}
    <g className="ln">
      <path d="M43 60 q36 6 50 30 q16 20 17 63 H43 z" />
      <path d="M43 68 H88 M43 76 H98 M43 84 H104 M43 92 H106 M43 100 H108 M43 108 H110 M43 116 H110 M43 124 H110 M43 132 H110 M43 140 H110 M43 146 H110" />
    </g>
    <g className="fill-blue">
      <rect x="45" y="70" width="42" height="5" />
      <rect x="45" y="102" width="62" height="5" />
      <rect x="45" y="118" width="62" height="5" />
      <rect x="45" y="134" width="62" height="5" />
    </g>

    {/* windowed tower */}
    <rect x="148" y="48" width="64" height="105" className="ln-box" />
    <g className="ln">
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`a${r}${c}`}
            x={160 + c * 11}
            y={56 + r * 10}
            width="8"
            height="8"
          />
        ))
      )}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`b${r}${c}`}
            x={160 + c * 11}
            y={100 + r * 10}
            width="8"
            height="8"
          />
        ))
      )}
    </g>
    <g className="fill-blue">
      <rect x="160" y="56" width="8" height="8" />
      <rect x="182" y="66" width="8" height="8" />
      <rect x="171" y="100" width="8" height="8" />
      <rect x="193" y="110" width="8" height="8" />
      <rect x="160" y="120" width="8" height="8" />
    </g>

    {/* striped mid-rise */}
    <rect x="216" y="72" width="52" height="81" className="ln-box" />
    <g className="ln">
      {Array.from({ length: 12 }).map((_, i) => (
        <path key={i} d={`M220 ${78 + i * 6} H264`} />
      ))}
    </g>

    {/* slanted building */}
    <g className="ln">
      <path d="M290 153 V100 L322 72 V153" />
      <path d="M330 153 V60 H372 V153" />
      {Array.from({ length: 14 }).map((_, i) => (
        <path key={i} d={`M334 ${66 + i * 6} H368`} />
      ))}
    </g>

    {/* elevated deck */}
    <path d="M0 153 H414" className="ln-thick" />

    {/* train */}
    <g>
      <path
        d="M300 175 q6 -14 26 -14 H414 V190 H300 z"
        className="ln-box"
      />
      <rect x="318" y="168" width="48" height="8" rx="4" className="fill-blue" />
      <rect x="372" y="168" width="22" height="8" rx="4" className="fill-blue" />
      <rect x="402" y="168" width="12" height="8" rx="4" className="fill-blue" />
    </g>

    {/* lower deck + pillars */}
    <path d="M0 198 H414" className="ln-thick" />
    <g className="ln">
      <path d="M17 198 V240 M22 198 V232" />
      <path d="M397 198 V240 M402 198 V232" />
      <rect x="45" y="202" width="62" height="12" />
      <rect x="45" y="216" width="62" height="10" />
      <rect x="136" y="200" width="162" height="30" />
      <rect x="150" y="212" width="40" height="8" />
      <path d="M200 206 H292 M200 212 H292 M200 218 H292 M200 224 H292" />
      <rect x="318" y="200" width="46" height="30" />
      <path d="M340 200 V230 M346 206 H360 M346 212 H360 M346 218 H360 M346 224 H360" />
    </g>
    <g className="ln-thick">
      <path d="M0 242 H60 M68 242 H300 M308 242 H370 M380 242 H414" />
    </g>
  </svg>
);

const Hero = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <section className="hero" style={{ backgroundColor: theme === "light" ? "white" : "#363636",
        color: theme === "light" ? "black" : "white",}}>
      <div className="hero__content">
        <h1 className="hero__title">
          The Open Data Backbone for Chennai’s Mobility.
        </h1>
        <p className="hero__text">
          A unified repository for static GTFS datasets, network visualizations
          for the Chennai Metropolitan Area.
        </p>
      </div>

      <div className="hero__art">
        <CityIllustration />
      </div>
    </section>
  );
};

export default Hero;