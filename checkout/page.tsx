"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ArrowLeft, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { OrganicPattern } from "@/components/organic-pattern"

export default function CheckoutPage() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
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

  const getTotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const bankDetails = {
    bankName: "Commercial Bank of Ethiopia",
    accountName: "Rediet Haddis Art Studio",
    accountNumber: "1000123456789",
    swiftCode: "CBETETAA",
  }

  const telebirrDetails = {
    phoneNumber: "+251911123456",
    accountName: "Rediet Haddis",
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
            <Link
              href="/shop"
              className={`flex items-center space-x-2 ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </Link>

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

      {/* Checkout Content */}
      <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <OrganicPattern
          className="absolute top-0 right-0 w-96 h-96 text-amber-200 dark:text-amber-900"
          opacity={0.05}
        />
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className={`text-4xl md:text-5xl font-light leading-none mb-4 ${isDark ? "text-white" : "text-black"}`}>
              Checkout
            </h1>
            <div className={`w-16 h-px ${isDark ? "bg-neutral-700" : "bg-neutral-300"}`}></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Order Summary */}
            <div className="lg:col-span-7">
              <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-8`}>Order Summary</h2>
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${isDark ? "text-white" : "text-black"} mb-1`}>{item.title}</h3>
                      <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"} mb-2`}>
                        {item.medium}, {item.year}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                          Quantity: {item.quantity}
                        </span>
                        <span className={`font-medium ${isDark ? "text-white" : "text-black"}`}>{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-6">
                  <div className="flex justify-between items-center text-xl font-medium">
                    <span className={isDark ? "text-white" : "text-black"}>Total</span>
                    <span className={isDark ? "text-white" : "text-black"}>${getTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="lg:col-span-5">
              <h2 className={`text-2xl font-light ${isDark ? "text-white" : "text-black"} mb-8`}>Payment Options</h2>

              {/* Bank Transfer */}
              <div className={`p-6 border ${isDark ? "border-neutral-800" : "border-neutral-200"} rounded-lg mb-6`}>
                <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-4`}>Bank Transfer</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Bank Name:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>{bankDetails.bankName}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.bankName, "bankName")}
                        className={`p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                      >
                        {copiedField === "bankName" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Account Name:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
                        {bankDetails.accountName}
                      </span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountName, "accountName")}
                        className={`p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                      >
                        {copiedField === "accountName" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                      Account Number:
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
                        {bankDetails.accountNumber}
                      </span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountNumber, "accountNumber")}
                        className={`p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                      >
                        {copiedField === "accountNumber" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>SWIFT Code:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>{bankDetails.swiftCode}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.swiftCode, "swiftCode")}
                        className={`p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                      >
                        {copiedField === "swiftCode" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telebirr */}
              <div className={`p-6 border ${isDark ? "border-neutral-800" : "border-neutral-200"} rounded-lg mb-6`}>
                <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-4`}>Telebirr</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Phone Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
                        {telebirrDetails.phoneNumber}
                      </span>
                      <button
                        onClick={() => copyToClipboard(telebirrDetails.phoneNumber, "telebirrPhone")}
                        className={`p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                      >
                        {copiedField === "telebirrPhone" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>Account Name:</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
                        {telebirrDetails.accountName}
                      </span>
                      <button
                        onClick={() => copyToClipboard(telebirrDetails.accountName, "telebirrName")}
                        className={`p-1 ${isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-black"}`}
                      >
                        {copiedField === "telebirrName" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className={`p-6 ${isDark ? "bg-neutral-800" : "bg-neutral-50"} rounded-lg`}>
                <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} mb-4`}>
                  Payment Instructions
                </h3>
                <div className={`text-sm space-y-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                  <p>1. Transfer the total amount using your preferred payment method</p>
                  <p>2. Include your order reference in the transfer description</p>
                  <p>3. Send payment confirmation to hello@rediethaddis.com</p>
                  <p>4. You will receive order confirmation within 24 hours</p>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button
                    className={`w-full py-3 text-base rounded-full ${
                      isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
                    } transition-all duration-300`}
                  >
                    Contact for Questions
                  </Button>
                </Link>
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
