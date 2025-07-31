"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"

export default function WorkPage() {
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

  const works = [
    {
      title: "Memory Threads",
      year: "2024",
      medium: "Textile Installation",
      dimensions: "Variable dimensions",
      image: "/placeholder.svg?height=600&width=800&text=Memory+Threads",
      description: "An immersive installation exploring the tactile memories embedded in traditional textiles.",
    },
    {
      title: "Trade Winds",
      year: "2023",
      medium: "Documentary Film",
      dimensions: "45 minutes",
      image: "/placeholder.svg?height=600&width=800&text=Trade+Winds",
      description: "A documentary examining the cultural exchange along ancient trade routes.",
    },
    {
      title: "Material Stories",
      year: "2023",
      medium: "Mixed Media",
      dimensions: "120 x 180 cm",
      image: "/placeholder.svg?height=600&width=800&text=Material+Stories",
      description: "Mixed media works that investigate the narratives held within everyday objects.",
    },
    {
      title: "Ancestral Echoes",
      year: "2022",
      medium: "Video Installation",
      dimensions: "3-channel video, 12 minutes",
      image: "/placeholder.svg?height=600&width=800&text=Ancestral+Echoes",
      description: "A multi-channel video installation exploring generational memory and cultural transmission.",
    },
    {
      title: "Woven Histories",
      year: "2022",
      medium: "Textile Series",
      dimensions: "Series of 12, 60 x 80 cm each",
      image: "/placeholder.svg?height=600&width=800&text=Woven+Histories",
      description: "A series of textile works that map historical trade connections through material culture.",
    },
    {
      title: "Cultural Cartography",
      year: "2021",
      medium: "Interactive Installation",
      dimensions: "Room-sized installation",
      image: "/placeholder.svg?height=600&width=800&text=Cultural+Cartography",
      description:
        "An interactive installation that allows visitors to explore cultural connections through touch and movement.",
    },
  ]

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
              <Link href="/work" className={`${isDark ? "text-white" : "text-black"} font-medium`}>
                Work
              </Link>
              <Link
                href="/shop"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
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

      {/* Work Hero Section */}
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
              Work
            </h1>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto mb-8`}></div>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
            >
              A selection of works exploring memory, trade, and material culture through multidisciplinary practice.
            </p>
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {works.map((work, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden">
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={work.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div>
                    <h2
                      className={`text-3xl md:text-4xl font-light leading-tight mb-4 ${isDark ? "text-white" : "text-black"}`}
                    >
                      {work.title}
                    </h2>
                    <div className="space-y-2 mb-6">
                      <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                        {work.medium}, {work.year}
                      </p>
                      <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>{work.dimensions}</p>
                    </div>
                  </div>

                  <p className={`text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                    {work.description}
                  </p>
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
