import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function HyderabadMap({ routeData }) {
  const polyline =
    routeData?.polyline || routeData?.routePolyline || null;

  const start = routeData?.start_point || null;
  const end = routeData?.end_point || null;

  return (
    <div style={{ width: "100%", height: "450px" }}>
      <MapContainer
        center={[17.385, 78.486]}
        zoom={12}
        style={{ height: "450px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Start marker */}
        {start && (
          <Marker position={[start.lat, start.lon]}>
            <Popup>Start Point</Popup>
          </Marker>
        )}

        {/* End marker */}
        {end && (
          <Marker position={[end.lat, end.lon]}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Polyline */}
        {polyline && polyline.length > 0 && (
          <Polyline
            positions={polyline}
            pathOptions={{ color: "blue", weight: 5 }}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default HyderabadMap;
