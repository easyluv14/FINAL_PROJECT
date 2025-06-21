
import Image from 'next/image';

export default function SpringSummer2021() {
  return (
    <section className="bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">SPRING/SUMMER 2021</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Product 1 */}
        <div className="bg-white shadow rounded overflow-hidden">
          <Image
            src="/clothing/children6.jpg"
            alt="Shoe 1"
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs mb-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">NEW</span>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">SPECIAL TYPE</span>
            </div>
            <h3 className="text-sm text-gray-700 font-semibold">Plain Male t-shirt</h3>
            <p className="text-gray-500 text-xs mt-1">Nike</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="text-xs text-gray-500 ml-1">+6 MORE</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800">74,95€</span>
              <span className="text-xs text-gray-500 line-through">120,00€</span>
            </div>
            <div className="text-yellow-500 mt-2 text-xs">★★★★★ <span className="text-gray-500">(441)</span></div>
          </div>
        </div>

        {/* Product 2 */}
        <div className="bg-white shadow rounded overflow-hidden">
          <Image
            src="/sneaker8.jpg"
            alt="Shoe 2"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-sm text-gray-700 font-semibold">Female Nike sneaker</h3>
            <p className="text-gray-500 text-xs mt-1">Nike</p>
            <span className="text-sm font-bold text-gray-800">74,95€</span>
            <div className="text-yellow-500 mt-2 text-xs">★★★★★ <span className="text-gray-500">(423)</span></div>
          </div>
        </div>

        {/* Product 3 */}
        <div className="bg-white shadow rounded overflow-hidden">
          <Image
            src="/clothing/women6.jpg"
            alt="Shoe 3"
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-sm text-gray-700 font-semibold">Armless bodycon gown</h3>
            <p className="text-gray-500 text-xs mt-1">Amiri</p>
            <span className="text-sm font-bold text-gray-800">74,95€</span>
            <span className="text-xs text-gray-500 line-through ml-2">120,00€</span>
            <div className="text-yellow-500 mt-2 text-xs">★★★★☆ <span className="text-gray-500">(65)</span></div>
          </div>
        </div>

        {/* Product 4 */}
        <div className="bg-white shadow rounded overflow-hidden">
          <Image
            src="/sneaker1.jpg"
            alt="Shoe 4"
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-sm text-gray-700 font-semibold">Name and Characteristics</h3>
            <p className="text-gray-500 text-xs mt-1">Brand Type</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="w-3 h-3 rounded-full bg-pink-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="text-xs text-gray-500 ml-1">+6 MORE</span>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800">74,95€</span>
              <span className="text-xs text-gray-500 line-through">120,00€</span>
            </div>
            <div className="text-yellow-500 mt-2 text-xs">★★★★★ <span className="text-gray-500">(412)</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
