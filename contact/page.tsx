"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sun, Moon, Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
        <OrganicPattern className="absolute top-0 right-0 w-96 h-96 text-amber-200 dark:text-amber-900" opacity={0.1} />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <h1
                className={`text-6xl md:text-7xl lg:text-8xl font-light leading-none mb-8 ${isDark ? "text-white" : "text-black"}`}
              >
                Contact
              </h1>
              <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mb-8`}></div>
              <p className={`text-xl leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                Let's start a conversation about art, collaboration, or commission work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${isDark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-black"} rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-500`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${isDark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-black"} rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-500`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border ${isDark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-black"} rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-500`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium ${isDark ? "text-white" : "text-black"} mb-2`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border ${isDark ? "border-neutral-700 bg-neutral-800 text-white" : "border-neutral-300 bg-white text-black"} rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 resize-none`}
                  />
                </div>

                <Button
                  type="submit"
                  className={`px-8 py-3 text-base rounded-full ${
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  } transition-all duration-300`}
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <div>
                  <h3 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-6`}>Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                      <span className={`${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                        hello@rediethaddis.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                      <span className={`${isDark ? "text-neutral-300" : "text-neutral-700"}`}>+251 911 123 456</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                      <span className={`${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                        Addis Ababa, Ethiopia
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-6`}>Studio Hours</h3>
                  <div className={`space-y-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: By appointment only</p>
                  </div>
                </div>

                <div>
                  <h3 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-6`}>Follow</h3>
                  <div className="space-y-2">
                    <Link
                      href="https://instagram.com/rediethaddis"
                      className={`block ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black"} transition-colors`}
                    >
                      Instagram
                    </Link>
                    <Link
                      href="https://linkedin.com/in/rediethaddis"
                      className={`block ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black"} transition-colors`}
                    >
                      LinkedIn
                    </Link>
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
