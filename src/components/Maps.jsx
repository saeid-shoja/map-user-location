import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import style from "./styles/maps.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/gps.png";

const positionIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const position = [51.505, -0.09];

const ResetMapCenter = ({ selectedLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.setView(
        L.latLng(selectedLocation?.lat, selectedLocation?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectedLocation, map]);

  return null;
};

function Maps({ selectedLocation }) {
  let selectedLocationCoordinates = [
    +selectedLocation?.lat,
    +selectedLocation?.lon,
  ];

  return (
    <MapContainer
      className={style.mapContainer}
      center={selectedLocation ? selectedLocationCoordinates : position}
      zoom={130}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=kkQgkyPmxq3ZkwAZICOv"
      />
      <Marker
        position={selectedLocation ? selectedLocationCoordinates : position}
        icon={positionIcon}
      >
        <Popup>Here is a beautiful place</Popup>
      </Marker>
      <ResetMapCenter selectedLocation={selectedLocation} />
    </MapContainer>
  );
}

export default Maps;
