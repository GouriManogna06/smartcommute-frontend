import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HyderabadMap = ({ routePolyline = [] }) => {

  // Convert backend [lat, lon] → Leaflet {lat, lng}
  const formattedPolyline = routePolyline.map(p => ({
    lat: p[0],
    lng: p[1]
  }));

  return (
    <MapContainer
      center={[17.3850, 78.4867]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {formattedPolyline.length > 0 && (
        <Polyline positions={formattedPolyline} color="blue" />
      )}
    </MapContainer>
  );
};

export default HyderabadMap;
