import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HyderabadMap = ({ routeData }) => {
  const center = [17.4399, 78.4983];

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={12} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routeData && (
          <>
            <Polyline
              positions={routeData.points.map((p) => [p.lat, p.lon])}
              color="blue"
              weight={6}
            />

            <Marker position={[routeData.points[0].lat, routeData.points[0].lon]}>
              <Popup>Start</Popup>
            </Marker>

            <Marker
              position={[
                routeData.points[routeData.points.length - 1].lat,
                routeData.points[routeData.points.length - 1].lon,
              ]}
            >
              <Popup>Destination</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default HyderabadMap;
