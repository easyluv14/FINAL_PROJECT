import Link from "next/link";
import {
  SiNike,
  SiAdidas,
  SiPuma,
  SiUnderarmour,
  SiNewbalance,
  SiReebok,
  SiConverse,
  SiVans,
  SiFila,
  SiChampion,
  SiJordan,
  SiNorthface,
  SiColumbia,
  SiLevis,
  SiWrangler,
  SiDiesel,
  SiSupreme,
  SiZara,
  SiGucci,
  SiChanel,
  SiHugo,
  SiLacoste,
  SiPrada,
  SiTommyhilfiger,
  SiHermes,
  SiBurberry,
  SiAmazon,
  SiWalmart,
  SiTarget,
  SiApple,
  SiSamsung,
  SiMicrosoft,
  SiSony,
} from "react-icons/si";


const brands = [
  SiNike,
  SiAdidas,
  SiPuma,
  SiUnderarmour,
  SiNewbalance,
  SiReebok,
  SiFila,
  SiJordan,
  SiZara,
  SiHugo,
  SiHermes,
  SiAmazon,
  SiWalmart,
  SiTarget,
  SiApple,
  SiSamsung,
  SiSony,
];

export default function BrandGrid() {
  return (
    <>{/* Breadcrumb */}
          <nav className="text-sm text-gray-700 mb-4 pl-8 pt-4">
            <ol className="list-reset flex">
              <li>
                <Link href="/" className="text-[#4263EB] hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">›</span>
              </li>
              <li className="text-gray-500">Brands</li>
            </ol>
          </nav>
    <div className="min-h-screen bg-white py-12 px-4">
      <h1 className="text-center text-3xl font-bold mb-10 text-blue-[#1b1833]">
        Our Brands
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8 place-items-center">
        {brands.map((Icon, index) => (
          <div key={index} className="text-blue-[#1b1833] hover:scale-110 transition-transform duration-300">
            <Icon size={50} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
