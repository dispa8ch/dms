import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./styles/style.module.css";
import Dispa8chDropDown from "@/lib/inputs/Dispa8chDropDown";
import Dispa8chCheckbox from "@/lib/inputs/Dispa8chCheckbox";
import { renderToStaticMarkup } from "react-dom/server";
import MapMarker from "./components/MapMarker";

// Fix default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

function Map() {
  return (
    <section className={styles.map}>
      <MapContainer
        center={[0, 0]}
        zoom={25}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <MapMarker />
      </MapContainer>
      <div className={styles.bottom_filter}>
        <Dispa8chDropDown
          options={[
            {
              label: "All Riders",
              value: "all",
              //   extra: <Dispa8chCheckbox id="urur" onChange={(checked) => {}} />,
            },
            {
              label: "All Riders",
              value: "all",
            },
            {
              label: "All Riders",
              value: "all",
            },
            {
              label: "All Riders",
              value: "all",
            },
          ]}
          value="all"
          onChange={() => {}}
          placeholder="Date"
          direction="up-right"
          dropStyles={{ background: "var(--card-bg)" }}
        />
      </div>
    </section>
  );
}

export default Map;
