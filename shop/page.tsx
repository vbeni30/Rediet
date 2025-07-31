"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ShoppingCart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"

export default function ShopPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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

  const artworks = [
    {
      id: 1,
      title: "Memory Threads",
      year: "2024",
      medium: "Textile Installation",
      price: "$2,500",
      image: "/placeholder.svg?height=600&width=480",
      available: true,
    },
    {
      id: 2,
      title: "Trade Winds",
      year: "2023",
      medium: "Documentary Film (Digital)",
      price: "$150",
      image: "/placeholder.svg?height=600&width=480",
      available: true,
    },
    {
      id: 3,
      title: "Material Stories",
      year: "2023",
      medium: "Mixed Media",
      price: "$1,800",
      image: "/placeholder.svg?height=600&width=480",
      available: true,
    },
    {
      id: 4,
      title: "Ancestral Echoes",
      year: "2022",
      medium: "Video Installation",
      price: "$3,200",
      image: "/placeholder.svg?height=600&width=480",
      available: false,
    },
    {
      id: 5,
      title: "Woven Histories",
      year: "2022",
      medium: "Textile Series",
      price: "$1,200",
      image: "/placeholder.svg?height=600&width=480",
      available: true,
    },
    {
      id: 6,
      title: "Cultural Cartography",
      year: "2021",
      medium: "Interactive Installation",
      price: "$4,500",
      image: "/placeholder.svg?height=600&width=480",
      available: true,
    },
  ]

  const addToCart = (artwork: (typeof artworks)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: artwork.id,
        title: artwork.title,
        price: artwork.price,
        image: artwork.image,
        medium: artwork.medium,
        year: artwork.year,
      },
    })
  }

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
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <OrganicPattern
          className="absolute bottom-0 left-0 w-96 h-96 text-amber-200 dark:text-amber-900"
          opacity={0.08}
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
            >
              Shop
            </h1>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto mb-8`}></div>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
            >
              Acquire original works and limited editions that explore the intersections of memory, trade, and material
              culture.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <div className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden mb-6 relative">
                  <Image
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    width={480}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {!artwork.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">Sold</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className={`text-xl font-medium ${isDark ? "text-white" : "text-black"} mb-1`}>
                      {artwork.title}
                    </h3>
                    <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                      {artwork.medium}, {artwork.year}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>
                      {artwork.price}
                    </span>

                    {artwork.available ? (
                      <Button
                        onClick={() => addToCart(artwork)}
                        variant="outline"
                        size="sm"
                        className={`rounded-full ${
                          isDark
                            ? "border-neutral-600 text-white hover:bg-white hover:text-black"
                            : "border-neutral-300 text-black hover:bg-black hover:text-white"
                        } transition-all duration-300`}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="rounded-full opacity-50 cursor-not-allowed bg-transparent"
                      >
                        Sold Out
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
