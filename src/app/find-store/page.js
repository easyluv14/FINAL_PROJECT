'use client';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../../../components/mapComponent'), {
  ssr: false, // ⛔ disables server-side rendering for this component
});

export default function FindStorePage() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold pl-14 mb-6">Find Our Stores</h1>
      <MapComponent />
    </div>
  );
}
