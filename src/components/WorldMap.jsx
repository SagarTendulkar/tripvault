import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function WorldMap() {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-full max-w-6xl mx-auto mt-8 z-10 relative">
      {/* <h2 className="text-white text-xl font-semibold mb-4 text-center">
        Visited Countries
      </h2> */}
      <ComposableMap projectionConfig={{ scale: 150 }} width={900} height={400}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#a3d5ff", outline: "none" },
                  hover: { fill: "#4dabf7", outline: "none" },
                  pressed: { fill: "#1c7ed6", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default WorldMap;
