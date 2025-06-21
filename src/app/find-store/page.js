'use client';
import 'leaflet/dist/leaflet.css';


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const storeLocations = [
  {
    name: 'Abuja Store',
    coords: [9.0579, 7.4951],
  },
  {
    name: 'Lagos Store',
    coords: [6.5244, 3.3792],
  },
  {
    name: 'Kano Store',
    coords: [12.0022, 8.5919],
  },
  {
    name: 'Port Harcourt Store',
    coords: [4.8156, 7.0498],
  },
];

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function FindStorePage() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold pl-14 mb-6">Find Our Stores</h1>
      <MapContainer
        center={[8.9, 7.2]} // Central Nigeria
        zoom={6}
        scrollWheelZoom={false}
        className="w-full md:w-[40%] h-[70vh] rounded-lg shadow"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {storeLocations.map((store, i) => (
          <Marker key={i} position={store.coords}>
            <Popup>{store.name}</Popup>
          </Marker>
        ))}
      </MapContainer >
    </div>
  );
}
