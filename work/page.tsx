"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon } from "lucide-react"

export default function WorkPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  const allWorks = [
    {
      title: "Memory Threads",
      year: "2024",
      medium: "Textile Installation",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Trade Winds",
      year: "2023",
      medium: "Documentary Film",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Material Stories",
      year: "2023",
      medium: "Mixed Media",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Ancestral Echoes",
      year: "2022",
      medium: "Video Installation",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Woven Histories",
      year: "2022",
      medium: "Textile Series",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Cultural Cartography",
      year: "2021",
      medium: "Interactive Installation",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Diaspora Dialogues",
      year: "2021",
      medium: "Film Series",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Textile Memories",
      year: "2020",
      medium: "Mixed Media",
      image: "/placeholder.svg?height=600&width=480",
    },
    {
      title: "Heritage Threads",
      year: "2020",
      medium: "Textile Installation",
      image: "/placeholder.svg?height=600&width=480",
    },
  ]

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
                href="/#contact"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                Contact
              </Link>
            </div>

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
      <section className="pt-32 pb-20 px-6 lg:px-12">
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
              A comprehensive collection of works exploring textiles, film, and cultural storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* All Works Grid */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {allWorks.map((work, index) => (
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
