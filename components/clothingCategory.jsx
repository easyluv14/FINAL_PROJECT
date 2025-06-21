"use client";
import { useEffect, useState } from "react";
import { clothingItems } from "./data/clothing";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from '../context/CartContext'; // ✅ Make sure this path is correct

const mainCategories = ["Men", "Women", "Children"];
const subCategories = ["Clothes", "Shoes", "Accessories"];

export default function ClothingPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openCategory, setOpenCategory] = useState(null);

  const { addToCart } = useCart(); // ✅ Must be declared here

  useEffect(() => {
    if (categoryParam && mainCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
      setOpenCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredItems =
    selectedCategory === "All"
      ? clothingItems
      : clothingItems.filter((item) => item.category === selectedCategory);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setOpenCategory(openCategory === category ? null : category);
    } else {
      setSelectedCategory(category);
      setOpenCategory(category);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-700 pt-4">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="list-reset flex">
            <li>
              <Link href="/" className="text-[#4263EB] hover:underline">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">›</span>
            </li>
            <li className="text-gray-500">Clothing</li>
          </ol>
        </div>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center py-6">Clothing Category</h1>

      {/* Main Layout */}
      <main className="bg-gray-100 py-6 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/5">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setOpenCategory(null);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded ${
                      selectedCategory === "All"
                        ? "bg-blue-900 text-white"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    All
                  </button>
                </li>

                {mainCategories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`block w-full text-left px-4 py-2 rounded ${
                        selectedCategory === category
                          ? "bg-blue-900 text-white"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                    >
                      {category}
                    </button>

                    {openCategory === category && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {subCategories.map((sub) => (
                          <li key={sub}>
                            <button
                              onClick={() => alert(`${category} > ${sub}`)}
                              className="text-sm text-gray-600 hover:text-blue-700"
                            >
                              • {sub}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const handleAdd = () => {
                addToCart(item);
                console.log("🛒 Product added:", item);
              };

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600 mb-1">₦{item.price}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Colors: {item.colors.join(", ")}
                  </p>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={handleAdd}
                      className="mt-3 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                    <button className="mt-3 px-4 flex-1 border border-blue-900 text-blue-900 py-2 rounded hover:bg-blue-50 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </>
  );
}
