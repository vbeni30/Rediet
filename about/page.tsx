"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon } from "lucide-react"

export default function AboutPage() {
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
              <Link href="/about" className={`${isDark ? "text-white" : "text-black"} font-medium`}>
                About
              </Link>
              <Link
                href="/work"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
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

      {/* About Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <h1
                className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
              >
                About
              </h1>
              <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mb-8`}></div>
              <p className={`text-xl leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                Multidisciplinary visual artist exploring the intersections of memory, trade, and material culture.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Rediet Haddis portrait"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className={`text-xl leading-relaxed space-y-8 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                <p>
                  Rediet Haddis is a multidisciplinary visual artist whose work spans textiles, film, and cultural
                  storytelling. Her practice explores the complex relationships between memory, trade, and material
                  culture, investigating how objects carry stories across time and space.
                </p>
                <p>
                  Through her art, she examines the ways in which cultural narratives are woven into the very fabric of
                  our material world. Her work creates dialogues between traditional craft practices and contemporary
                  artistic expression, bridging past and present through innovative storytelling techniques.
                </p>
                <p>
                  Born in Ethiopia and educated internationally, Haddis brings a unique perspective to her artistic
                  practice, drawing from her multicultural background to explore themes of displacement, identity, and
                  cultural preservation. Her installations and films have been exhibited in galleries and film festivals
                  worldwide.
                </p>
                <p>
                  Her approach to art-making is deeply collaborative, often working with communities to uncover hidden
                  histories and amplify marginalized voices. She believes in the power of art to create social change
                  and foster cross-cultural understanding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={`py-20 px-6 lg:px-12 ${isDark ? "bg-neutral-800" : "bg-neutral-50"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className={`text-3xl md:text-4xl font-light ${isDark ? "text-white" : "text-black"} mb-4`}>
                Philosophy
              </h2>
              <div className={`w-20 h-px ${isDark ? "bg-neutral-600" : "bg-neutral-400"}`}></div>
            </div>
            <div className="lg:col-span-8">
              <div className={`text-lg leading-relaxed space-y-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                <p>
                  "Art is a bridge between worlds—connecting the tangible with the intangible, the past with the
                  present, the individual with the collective. My work seeks to make visible the invisible threads that
                  bind us to our histories and to each other."
                </p>
                <p>
                  "I believe that every material holds memory, every thread carries a story. Through my practice, I aim
                  to honor these stories while creating new narratives that speak to our contemporary moment."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Exhibitions */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-6">
              <h3 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-8`}>Education</h3>
              <div className={`space-y-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                <div>
                  <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                    MFA Visual Arts
                  </h4>
                  <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    Yale School of Art, New Haven, CT
                  </p>
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>2018-2020</p>
                </div>
                <div>
                  <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                    BA Cultural Studies
                  </h4>
                  <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    Columbia University, New York, NY
                  </p>
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>2014-2018</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <h3 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-8`}>Recent Exhibitions</h3>
              <div className={`space-y-6 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                <div>
                  <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                    "Woven Histories"
                  </h4>
                  <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>MoMA PS1, New York</p>
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>2024</p>
                </div>
                <div>
                  <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                    "Material Memories"
                  </h4>
                  <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Whitney Biennial, New York</p>
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>2023</p>
                </div>
                <div>
                  <h4 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>"Trade Winds"</h4>
                  <p className={`${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Venice Biennale, Italy</p>
                  <p className={`text-sm ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>2022</p>
                </div>
              </div>
            </div>
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
