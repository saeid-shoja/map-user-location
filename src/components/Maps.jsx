import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import style from "./styles/maps.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../assets/gps.png";

const positionIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

export const ResetLocationOnMap = ({ selectedLocation }) => {
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
  }, [map, selectedLocation]);

  return null;
};

function Maps({ selectedLocation }) {
  let selectedLocationCoordinates = [
    +selectedLocation?.lat,
    +selectedLocation?.lon,
  ];

  const markerRef = useRef();
  console.log("markerRef :>> ", markerRef.current?._latlng);

  const position = [51.505, -0.09];

  return (
    <MapContainer
      className={style.mapContainer}
      center={[51.505, -0.09]}
      zoom={100}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=kkQgkyPmxq3ZkwAZICOv"
      />
      <Marker
        ref={markerRef}
        position={selectedLocation.lat ? selectedLocationCoordinates : position}
        icon={positionIcon}
        data-testid="marker-position"
      >
        <Popup>Here is a beautiful place</Popup>
      </Marker>
      {selectedLocation.lat && (
        <ResetLocationOnMap selectedLocation={selectedLocation} />
      )}
    </MapContainer>
  );
}

export default Maps;
