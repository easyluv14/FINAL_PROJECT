import Image from 'next/image';

export default function Banner() {
  return (
    <main>
      <div className="relative min-h-[500px] w-full bg-[#4A4A4A] pb-4 mt-10">
        <div className="absolute inset-0 grid grid-cols-2">
          {/* Left content */}
          <div className="flex flex-col justify-center px-12 text-white">
            <h2 className="mb-4 text-4xl font-bold">It's all about you</h2>
            <p className="mb-8 text-lg">
              Try now, pay later. We want that you're really confident and happy with your
              purchase - you have 30 days before we charge you! Learn more about our policy.
            </p>
            <button className="flex w-fit items-center space-x-2 border-2 border-white  px-6 py-3 text-white transition-all hover:bg-gray-100">
              
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Right content - Image */}
          <div className="relative h-full w-full">
            <Image
              src="/banner.jpg"
              alt="Runner on track"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}