import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import style from "./maps.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/gps.png";

const positionIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const position = [51.505, -0.09];

function Maps() {
  return (
    <MapContainer className={style.mapContainer} center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=kkQgkyPmxq3ZkwAZICOv"
      />
      <Marker position={position} icon={positionIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Maps;
