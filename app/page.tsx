"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ArrowUpRight, ShoppingCart, Instagram, Mail, Youtube, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function HomePage() {
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
                Projects
              </Link>
              <Link
                href="/contact"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                Archive
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1
                className={`text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-stardom leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
              >
                Visual
                <br />
                Artist
              </h1>

              {/* Text elements positioned beneath the heading */}
              <div className="space-y-6 mb-8">
                <div
                  className={`text-lg md:text-xl leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                >
                  <p className="text-sm md:text-base mb-4">Specialized in Textiles, Film, and Cultural Storytelling.</p>
                  <p className="text-sm md:text-base mb-4">Explores the intersections of memory, trade, and material culture.</p>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <Link href="/shop">
              <Button
                variant="outline"
                className={`px-8 py-3 text-base rounded-full border-2 ${
                  isDark
                    ? "border-neutral-600 text-white hover:bg-white hover:text-black"
                    : "border-neutral-300 text-black hover:bg-black hover:text-white"
                } transition-all duration-300`}
              >
                Explore Shop
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Image placeholder */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="aspect-[3/4] w-full max-w-md bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=450&text=Featured+Artwork"
                    alt="Featured artwork"
                    width={450}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-px h-16 ${isDark ? "bg-neutral-700" : "bg-neutral-300"} animate-pulse`}></div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section id="work" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"} mb-4`}>
              Selected Works
            </h2>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"}`}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            {[
              {
                title: "Memory Threads",
                year: "2024",
                medium: "Textile Installation",
                image: "/placeholder.svg?height=600&width=480&text=Memory+Threads",
              },
              {
                title: "Trade Winds",
                year: "2023",
                medium: "Documentary Film",
                image: "/placeholder.svg?height=600&width=480&text=Trade+Winds",
              },
              {
                title: "Material Stories",
                year: "2023",
                medium: "Mixed Media",
                image: "/placeholder.svg?height=600&width=480&text=Material+Stories",
              },
            ].map((work, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden mb-6">
                  <Image
                    src={work.image || "/placeholder.svg"}
                    alt={work.title}
                    width={480}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h3
                    className={`text-xl font-medium ${isDark ? "text-white group-hover:text-neutral-300" : "text-black group-hover:text-neutral-600"} transition-colors`}
                  >
                    {work.title}
                  </h3>
                  <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                    {work.medium}, {work.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/work">
              <Button
                variant="outline"
                className={`px-8 py-3 text-base rounded-full border-2 ${
                  isDark
                    ? "border-neutral-600 text-white hover:bg-white hover:text-black"
                    : "border-neutral-300 text-black hover:bg-black hover:text-white"
                } transition-all duration-300`}
              >
                View All Projects
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-8">
              <h2
                className={`text-5xl md:text-6xl lg:text-7xl font-light ${isDark ? "text-white" : "text-black"} mb-8 leading-tight`}
              >
                Let's create
                <br />
                something together
              </h2>
              <p className={`text-xl mb-8 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                Interested in collaborating or learning more about my work?
              </p>

              {/* CTA to contact page */}
              <Link href="/contact">
                <Button
                  className={`px-8 py-4 text-lg rounded-full ${
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  } transition-all duration-300`}
                >
                  Get In Touch
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-4">
              <div className="space-y-6">
                <Link
                  href="mailto:hello@rediethaddis.com"
                  className={`flex items-center space-x-4 text-lg ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors group`}
                >
                  <span>rediethaddis@gmail.com</span>
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>

                <Link
                  href="https://www.instagram.com/rediethaddis/"
                  className={`flex items-center space-x-4 text-lg ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors group`}
                >
                  <span>@rediethaddis</span>
                  <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 lg:px-12 border-t ${isDark ? "border-neutral-800" : "border-neutral-200"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              © 2024 Rediet Haddis. All rights reserved - Multidisciplinary Visual Artist
            </p>

            {/* Social media icons centered */}
            <div className="flex items-center space-x-6">
              <a
                href="https://instagram.com/rediethaddis"
                className={`p-2 rounded-full ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/rediethaddis"
                className={`p-2 rounded-full ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@rediethaddis"
                className={`p-2 rounded-full ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@rediethaddis.com"
                className={`p-2 rounded-full ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
