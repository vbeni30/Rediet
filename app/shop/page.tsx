"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ShoppingCart, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"

export default function ShopPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { state, dispatch } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const categories = ["all", "pants", "kimono", "shirts", "hoodies"]

  const items = [
    {
      id: 1,
      title: "Ethereal Kimono",
      category: "kimono",
      price: "$280",
      image: "/placeholder.svg?height=600&width=480&text=Ethereal+Kimono",
      available: true,
      description:
        "A flowing kimono featuring interchangeable panels that tell stories of ancient traditions and modern interpretations. Each panel represents a different cultural narrative.",
    },
    {
      id: 2,
      title: "Memory Threads Pants",
      category: "pants",
      price: "$180",
      image: "/placeholder.svg?height=600&width=480&text=Memory+Threads+Pants",
      available: true,
      description:
        "Contemporary pants with removable panel sections that showcase textile heritage. Mix and match panels to create your own cultural story.",
    },
    {
      id: 3,
      title: "Cultural Stories Shirt",
      category: "shirts",
      price: "$120",
      image: "/placeholder.svg?height=600&width=480&text=Cultural+Stories+Shirt",
      available: true,
      description:
        "A versatile shirt design featuring detachable panels inspired by global textile traditions. Each panel carries the essence of different cultural expressions.",
    },
    {
      id: 4,
      title: "Trade Winds Hoodie",
      category: "hoodies",
      price: "$160",
      image: "/placeholder.svg?height=600&width=480&text=Trade+Winds+Hoodie",
      available: false,
      description:
        "Comfort meets culture in this hoodie with interchangeable panel system. Currently sold out due to high demand for its unique storytelling approach.",
    },
    {
      id: 5,
      title: "Ancestral Echoes Kimono",
      category: "kimono",
      price: "$320",
      image: "/placeholder.svg?height=600&width=480&text=Ancestral+Echoes+Kimono",
      available: true,
      description:
        "An elevated kimono design featuring premium panels that echo ancestral wisdom through contemporary textile art. A masterpiece of cultural fusion.",
    },
    {
      id: 6,
      title: "Woven Histories Pants",
      category: "pants",
      price: "$200",
      image: "/placeholder.svg?height=600&width=480&text=Woven+Histories+Pants",
      available: true,
      description:
        "Structured pants with modular panel system that celebrates the art of weaving across cultures. Each panel tells a story of craftsmanship and heritage.",
    },
    {
      id: 7,
      title: "Material Culture Shirt",
      category: "shirts",
      price: "$140",
      image: "/placeholder.svg?height=600&width=480&text=Material+Culture+Shirt",
      available: true,
      description:
        "A thoughtfully designed shirt exploring material culture through interchangeable panels. Perfect for those who appreciate cultural depth in fashion.",
    },
    {
      id: 8,
      title: "Border Stories Hoodie",
      category: "hoodies",
      price: "$180",
      image: "/placeholder.svg?height=600&width=480&text=Border+Stories+Hoodie",
      available: true,
      description:
        "A contemporary hoodie that challenges boundaries through its panel system. Each configuration tells a different story about cultural connections.",
    },
  ]

  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory)

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${isDark ? "bg-neutral-900/80" : "bg-white/80"} backdrop-blur-md border-b ${isDark ? "border-neutral-800" : "border-neutral-200"}`
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <Link
            href="/"
            className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} hover:opacity-70 transition-opacity`}
          >
            Rediet Haddis
          </Link>

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <Link
                href="/about"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                About
              </Link>
              <Link
                href="/work"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                Work
              </Link>
              <Link href="/shop" className={`${isDark ? "text-white" : "text-black"} font-medium`}>
                Shop
              </Link>
              <Link
                href="/contact"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                Contact
              </Link>
            </div>

            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className={`relative p-2 rounded-full ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Shop Hero Section */}
      <section className="pt-32 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <OrganicPattern
          className="absolute bottom-0 left-0 w-96 h-96 text-amber-200 dark:text-amber-900"
          opacity={0.08}
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
            >
              Shop
            </h1>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto mb-8`}></div>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
            >
              Wearable art pieces that transform with interchangeable panels, each telling a unique story.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Filter className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
              <span className={`text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                Filter by category:
              </span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger
                className={`w-48 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-300"}`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Items" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {filteredItems.map((item) => (
              <Link key={item.id} href={`/shop/${item.id}`} className="group">
                <div className="space-y-4">
                  <div className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={480}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 ${isDark ? "bg-black/80" : "bg-white/90"} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-center justify-center p-6`}
                    >
                      <div className="text-center space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                          {item.title}
                        </h4>
                        <p
                          className={`text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"} line-clamp-4`}
                        >
                          {item.description}
                        </p>
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            item.available
                              ? `${isDark ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"}`
                              : `${isDark ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"}`
                          }`}
                        >
                          {item.available ? "Available" : "Sold Out"}
                        </div>
                      </div>
                    </div>

                    {/* Sold Out Overlay (always visible when not available) */}
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                        <span className="text-white text-lg font-medium">Sold Out</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3
                      className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} group-hover:opacity-70 transition-opacity`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"} capitalize`}>
                      {item.category}
                    </p>
                    <p className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>{item.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className={`text-lg ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 lg:px-12 border-t ${isDark ? "border-neutral-800" : "border-neutral-200"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>© 2024 Rediet Haddis</p>
          <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            Multidisciplinary Visual Artist
          </p>
        </div>
      </footer>
    </div>
  )
}
