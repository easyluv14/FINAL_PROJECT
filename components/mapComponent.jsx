'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

const storeLocations = [
  { name: 'Abuja Store', coords: [9.0579, 7.4951] },
  { name: 'Lagos Store', coords: [6.5244, 3.3792] },
  { name: 'Kano Store', coords: [12.0022, 8.5919] },
  { name: 'Port Harcourt Store', coords: [4.8156, 7.0498] },
];

export default function MapComponent() {
  return (
    <MapContainer
      center={[8.9, 7.2]}
      zoom={6}
      scrollWheelZoom={false}
      className="w-full md:w-[40%] h-[70vh] rounded-lg shadow"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {storeLocations.map((store, i) => (
        <Marker key={i} position={store.coords}>
          <Popup>{store.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
