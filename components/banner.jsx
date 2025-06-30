import Image from 'next/image';

export default function Banner() {
  return (
    <main>
      <div className="relative min-h-[400px] lg:min-h-[500px] w-full bg-[#4A4A4A] pb-4 mt-6 lg:mt-10 mb-8 lg:mb-16">
        <div className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-2 mt-6 lg:mt-10 lg:-mb-10">
          {/* Left content */}
          <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 text-white py-8 lg:py-0 order-2 lg:order-1">
            <h2 className="mb-3 lg:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              It's all about you
            </h2>
            <p className="mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
              Try now, pay later. We want that you're really confident and happy with your
              purchase - you have 30 days before we charge you! Learn more about our policy.
            </p>
            <button className="flex w-fit items-center space-x-2 border-2 border-white px-4 sm:px-6 py-2 sm:py-3 text-white transition-all hover:bg-white hover:text-[#4A4A4A] text-sm sm:text-base">
              <span>Learn More</span>
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
          <div className="relative h-48 sm:h-64 lg:h-full w-full order-1 lg:order-2">
            <Image
              src="/banner.jpg"
              alt="Runner on track"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </main>
  );
}