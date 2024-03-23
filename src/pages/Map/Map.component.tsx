import React, { useState } from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { Main } from "./Map.styles";
import { LatLngTuple } from "leaflet";

export const Map: React.FC = () => {
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  const success = ({ coords }: any) => {
    const { latitude, longitude } = coords;
    const pos: LatLngTuple = [latitude, longitude];
    if (!position || (position[0] !== latitude && position[1] !== longitude))
      setPosition(pos);
  };

  const error = ({ message }: any) => {
    if (!position || (position[0] !== 51.5 && position[1] !== -0.09))
      setPosition([51.5, -0.09]);
  };

  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
  });

  return (
    position && (
      <Main center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Main>
    )
  );
};
