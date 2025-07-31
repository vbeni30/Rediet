"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ShoppingCart, ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle checkout submission here
    console.log("Checkout submitted:", formData)
  }

  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const shipping = 25
  const tax = getSubtotal() * 0.08
  const total = getSubtotal() + shipping + tax

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

      {/* Back Button */}
      <div className="pt-32 pb-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/shop"
            className={`inline-flex items-center gap-2 ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Checkout Content */}
      <section className="pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-5xl font-light leading-tight mb-4 ${isDark ? "text-white" : "text-black"}`}
            >
              Checkout
            </h1>
            <div className={`w-20 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-auto`}></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Checkout Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className={`text-xl font-medium ${isDark ? "text-white" : "text-black"}`}>Contact Information</h2>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-sm border ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                    placeholder="Email address"
                  />
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h2 className={`text-xl font-medium ${isDark ? "text-white" : "text-black"}`}>Shipping Address</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="Last name"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-sm border ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                    placeholder="Address"
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="ZIP code"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4">
                  <h2 className={`text-xl font-medium ${isDark ? "text-white" : "text-black"}`}>Payment Information</h2>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-sm border ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                    placeholder="Card number"
                  />
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-sm border ${
                      isDark
                        ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                        : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                    } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                    placeholder="Name on card"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="MM/YY"
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-sm border ${
                        isDark
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-neutral-400"
                          : "bg-white border-neutral-300 text-black placeholder-neutral-500"
                      } focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-colors`}
                      placeholder="CVV"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className={`w-full py-6 text-lg rounded-full ${
                    isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                  } transition-all duration-300`}
                >
                  Complete Order
                </Button>
              </form>

              {/* Security Features */}
              <div className="flex items-center justify-center space-x-8 pt-8">
                <div className="flex items-center gap-2">
                  <Shield className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                  <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                  <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className={`h-5 w-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`} />
                  <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div
                className={`p-8 rounded-sm border ${isDark ? "border-neutral-800 bg-neutral-800/50" : "border-neutral-200 bg-neutral-50"}`}
              >
                <h2 className={`text-xl font-medium mb-6 ${isDark ? "text-white" : "text-black"}`}>Order Summary</h2>

                <div className="space-y-6 mb-8">
                  {state.items.map((item, index) => (
                    <div key={`${item.id}-${item.selectedPanel}-${index}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm ${isDark ? "text-white" : "text-black"}`}>{item.title}</h3>
                        <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"} mb-1`}>
                          {item.category}
                        </p>
                        {item.selectedPanel && (
                          <p className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"} mb-1`}>
                            Panel: {item.selectedPanel}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <span className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                            Qty: {item.quantity}
                          </span>
                          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-neutral-300 dark:border-neutral-700">
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Subtotal</span>
                    <span className={`${isDark ? "text-white" : "text-black"}`}>${getSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Shipping</span>
                    <span className={`${isDark ? "text-white" : "text-black"}`}>${shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Tax</span>
                    <span className={`${isDark ? "text-white" : "text-black"}`}>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-neutral-300 dark:border-neutral-700">
                    <span className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>Total</span>
                    <span className={`text-lg font-medium ${isDark ? "text-white" : "text-black"}`}>
                      ${total.toFixed(2)}
                    </span>
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
