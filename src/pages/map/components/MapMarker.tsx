import { GeneralIcons } from "@/lib/icons/general";
import React from "react";
import styles from "./styles/style.module.css";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const marker = <div className={styles.marker}>{GeneralIcons.marker}</div>;

const icon = L.divIcon({
  html: renderToStaticMarkup(marker),
  className: "custom-marker",
  iconSize: [40, 40],
  iconAnchor: [16, 16],
});

function MapMarker() {
  const [position, setPosition] = React.useState<[number, number] | null>(null);
  const map = useMap();
  const riders = [
    { id: 1, name: "Rider A", lat: 6.5244, lng: 3.3792 }, // Lagos
    { id: 2, name: "Rider B", lat: 9.082, lng: 8.6753 }, // Nigeria center
  ];

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setPosition(coords);
        map.setView(coords, 15); // Center map on user location
      },
      (err) => {
        console.error("Error getting location:", err);
      }
    );
  }, [map]);

  return position
    ? riders.map((rider) => (
        <Marker key={rider.id} position={[rider.lat, rider.lng]} icon={icon}>
          <Popup>
            {rider.name} <br /> Order #1234
          </Popup>
        </Marker>
      ))
    : null;
}

export default MapMarker;
