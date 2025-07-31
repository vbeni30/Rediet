"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sun, Moon, ShoppingCart, ArrowLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/lib/cart-context"
import { PanelModal } from "@/components/panel-modal"

interface Panel {
  id: number
  name: string
  image: string
  description: string
  detailedDescription: string
  available: boolean
  price: string
  material: string
  dimensions: string
  origin: string
  culturalSignificance: string
  artisan: string
}

export default function ItemPage({ params }: { params: { id: string } }) {
  const [isDark, setIsDark] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedPanel, setSelectedPanel] = useState<number>(1)
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0)
  const [selectedModalPanel, setSelectedModalPanel] = useState<Panel | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { state, dispatch } = useCart()

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  // Mock item data - in a real app, this would come from an API
  const item = {
    id: Number.parseInt(params.id),
    title: "Ethereal Kimono",
    category: "kimono",
    price: "$280",
    image: "/placeholder.svg?height=800&width=640&text=Ethereal+Kimono",
    description:
      "A flowing kimono that transforms with interchangeable panels, each representing different cultural narratives and memories. This piece explores the intersection of traditional Japanese garment construction with contemporary storytelling through textile art.",
    available: true,
    videoUrl: "https://drive.google.com/file/d/1234567890abcdef/preview", // Google Drive video embed URL
  }

  // Enhanced panels data with more detailed information
  const panels: Panel[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Panel ${i + 1}`,
    image: `/placeholder.svg?height=400&width=400&text=Panel+${i + 1}`,
    description: `Panel ${i + 1} represents a unique cultural narrative with intricate patterns.`,
    detailedDescription: `This exquisite panel showcases the masterful artistry of traditional textile work, featuring hand-woven patterns that tell stories of ancient trade routes and cultural exchange. Each thread is carefully selected and dyed using traditional methods passed down through generations. The intricate motifs represent elements of nature, spirituality, and human connection, creating a visual narrative that speaks to the universal human experience while honoring specific cultural traditions.`,
    available: Math.random() > 0.2, // 80% availability
    price: `$${(Math.random() * 50 + 25).toFixed(0)}`,
    material: ["Silk", "Cotton", "Linen", "Hemp"][Math.floor(Math.random() * 4)],
    dimensions: '24" x 36"',
    origin: ["Kyoto, Japan", "Varanasi, India", "Istanbul, Turkey", "Marrakech, Morocco"][
      Math.floor(Math.random() * 4)
    ],
    culturalSignificance: [
      "Represents the cycle of seasons and renewal",
      "Symbolizes protection and good fortune",
      "Depicts ancient trade route stories",
      "Celebrates harvest and abundance",
    ][Math.floor(Math.random() * 4)],
    artisan: ["Master Tanaka Hiroshi", "Artisan Priya Sharma", "Craftsman Mehmet Özkan", "Weaver Fatima Al-Zahra"][
      Math.floor(Math.random() * 4)
    ],
  }))

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        category: item.category,
        selectedPanel,
        quantity,
      },
    })
  }

  const nextPanel = () => {
    const maxStartIndex = Math.max(0, panels.length - 8)
    setCurrentPanelIndex((prev) => (prev + 8) % (maxStartIndex + 8))
  }

  const openPanelModal = (panel: Panel) => {
    setSelectedModalPanel(panel)
    setIsModalOpen(true)
  }

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-neutral-900" : "bg-white"}`}>
      {/* Navigation */}
      <nav
        className={`w-full z-50 ${isDark ? "bg-neutral-900" : "bg-white"} border-b ${isDark ? "border-neutral-800" : "border-neutral-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <Link
            href="/"
            className={`text-lg font-medium ${isDark ? "text-white" : "text-black"} hover:opacity-70 transition-opacity`}
          >
            Rediet Haddis
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>

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

      {/* Main Content */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Images and Video */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col gap-4">
          {/* Main Image */}
          <div className="h-96 lg:h-[600px] bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              width={640}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Demo */}
          <div className="h-64 lg:h-80 bg-neutral-100 dark:bg-neutral-800 rounded-sm overflow-hidden relative">
            <iframe
              src={item.videoUrl}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Panel Demo Video"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <p className="text-xs font-medium text-white">Panel Demo</p>
            </div>
          </div>

          {/* Additional Content Section */}
          <div className="space-y-6 mt-8">
            <div className={`p-6 rounded-lg ${isDark ? "bg-neutral-800" : "bg-neutral-50"}`}>
              <h3 className={`text-lg font-medium mb-4 ${isDark ? "text-white" : "text-black"}`}>
                Craftsmanship Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Construction</p>
                  <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                    Hand-sewn with traditional Japanese techniques
                  </p>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Materials</p>
                  <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                    Premium silk with cotton lining
                  </p>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Care Instructions</p>
                  <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Dry clean only, store flat</p>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? "text-white" : "text-black"}`}>Origin</p>
                  <p className={`${isDark ? "text-neutral-300" : "text-neutral-600"}`}>Handcrafted in Kyoto, Japan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Details and Panels */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col">
          {/* Item Details */}
          <div className="mb-6">
            <h1
              className={`text-3xl md:text-4xl font-light leading-tight mb-2 ${isDark ? "text-white" : "text-black"}`}
            >
              {item.title}
            </h1>
            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"} capitalize mb-4`}>
              {item.category}
            </p>
            <p className={`text-2xl font-medium ${isDark ? "text-white" : "text-black"} mb-4`}>{item.price}</p>
            <p className={`text-sm leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"} mb-6`}>
              {item.description}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-4 mb-6">
            {/* Panel Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                  Panel (1-20)
                </label>
                <Select
                  value={selectedPanel.toString()}
                  onValueChange={(value) => setSelectedPanel(Number.parseInt(value))}
                >
                  <SelectTrigger
                    className={`w-full h-10 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-300"}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {panels.map((panel) => (
                      <SelectItem key={panel.id} value={panel.id.toString()} disabled={!panel.available}>
                        {panel.name} {!panel.available && "(Out of Stock)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <label className={`block text-xs font-medium ${isDark ? "text-white" : "text-black"} mb-2`}>
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-8 h-8 rounded border ${isDark ? "border-neutral-700 text-white hover:bg-neutral-800" : "border-neutral-300 text-black hover:bg-neutral-100"} flex items-center justify-center transition-colors`}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className={`text-sm font-medium ${isDark ? "text-white" : "text-black"} w-8 text-center`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-8 h-8 rounded border ${isDark ? "border-neutral-700 text-white hover:bg-neutral-800" : "border-neutral-300 text-black hover:bg-neutral-100"} flex items-center justify-center transition-colors`}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={addToCart}
              disabled={!item.available || !panels[selectedPanel - 1]?.available}
              className={`w-full h-12 text-sm rounded-full ${
                isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
              } transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Add to Cart
            </Button>
          </div>

          {/* Panel Gallery */}
          <div className="flex-1 min-h-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>Available Panels</h3>
              <button
                onClick={nextPanel}
                className={`flex items-center gap-1 text-xs ${isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-black"} transition-colors`}
              >
                Next
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {panels.slice(currentPanelIndex, currentPanelIndex + 8).map((panel) => (
                <div key={panel.id} onClick={() => openPanelModal(panel)} className="group cursor-pointer">
                  <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden mb-1 relative">
                    <Image
                      src={panel.image || "/placeholder.svg"}
                      alt={panel.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!panel.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-[10px] font-medium">Out</span>
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-[10px] font-medium ${isDark ? "text-white" : "text-black"} group-hover:opacity-70 transition-opacity truncate`}
                  >
                    {panel.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className={`p-4 rounded-lg ${isDark ? "bg-neutral-800" : "bg-neutral-50"} space-y-3`}>
              <h4 className={`text-sm font-medium ${isDark ? "text-white" : "text-black"}`}>
                About Interchangeable Panels
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                Each panel tells a unique story through traditional textile art. The panels can be easily swapped to
                create different looks and meanings, making each kimono a personal narrative canvas.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
                  {panels.filter((p) => p.available).length} panels available
                </span>
                <span className={`${isDark ? "text-neutral-400" : "text-neutral-500"}`}>Easy attachment system</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Modal */}
      <PanelModal panel={selectedModalPanel} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
