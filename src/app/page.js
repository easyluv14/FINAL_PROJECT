import Image from "next/image";
import HeroSection from "../../components/hero";
import ProductCarousel from "../../components/productCarousel";
import ProductGrid from "../../components/productGrid";
import Banner from "../../components/banner";
import ProductList from "../../components/productList";




export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
     <div className="container mx-auto px-4 ">
      <ProductCarousel />
      <ProductGrid />
      <ProductCarousel />
      <Banner />
      <ProductList />
    </div>
    </div>
  );
}
