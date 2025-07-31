"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon, ShoppingCart, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"

export default function ContactPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
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
              <Link
                href="/shop"
                className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                Shop
              </Link>
              <Link href="/contact" className={`${isDark ? "text-white" : "text-black"} font-medium`}>
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

      {/* Contact Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <OrganicPattern
          className="absolute top-20 right-0 w-96 h-96 text-amber-200 dark:text-amber-900"
          opacity={0.08}
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
            >
              Contact
            </h1>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto mb-8`}></div>
            <p
              className={`text-xl leading-relaxed max-w-2xl mx-auto ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
            >
              Let's discuss collaborations, exhibitions, or any questions about my work.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-3xl font-light leading-tight mb-6 ${isDark ? "text-white" : "text-black"}`}>
                  Send a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-sm border ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-black"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-sm border ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors resize-vertical`}
                    placeholder="Tell me more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className={`w-full py-6 text-lg rounded-full ${
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  } transition-all duration-300`}
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-3xl font-light leading-tight mb-6 ${isDark ? "text-white" : "text-black"}`}>
                  Get in Touch
                </h2>
                <p className={`text-lg leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                  I'm always interested in new collaborations, exhibition opportunities, and meaningful conversations
                  about art and culture.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <Mail className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>Email</h3>
                    <a
                      href="mailto:hello@rediethaddis.com"
                      className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                    >
                      hello@rediethaddis.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <Phone className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className={`${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
                    <MapPin className={`h-5 w-5 ${isDark ? "text-white" : "text-black"}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-black"}`}>Studio</h3>
                    <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                      Brooklyn, NY
                      <br />
                      London, UK
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <h3 className={`font-medium mb-4 ${isDark ? "text-white" : "text-black"}`}>Studio Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Monday - Friday</span>
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Saturday</span>
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Sunday</span>
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>By appointment</span>
                  </div>
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
