"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { CheckCircle, XCircle, MapPin, User, Palette, Ruler } from "lucide-react"

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

interface PanelModalProps {
  panel: Panel | null
  isOpen: boolean
  onClose: () => void
}

export function PanelModal({ panel, isOpen, onClose }: PanelModalProps) {
  if (!panel) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-neutral-200 dark:border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-black dark:text-white flex items-center gap-3">
            {panel.name}
            <Badge variant={panel.available ? "default" : "destructive"} className="text-xs">
              {panel.available ? "Available" : "Out of Stock"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Panel Image */}
            <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image
                src={panel.image || "/placeholder.svg"}
                alt={panel.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Additional Detail Images */}
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=Detail+1`}
                  alt="Panel detail 1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=Detail+2`}
                  alt="Panel detail 2"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-neutral-100 dark:bg-neutral-800 rounded overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=Detail+3`}
                  alt="Panel detail 3"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Availability Section */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              {panel.available ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              )}
              <div>
                <p className="font-medium text-black dark:text-white">
                  {panel.available ? "In Stock" : "Currently Unavailable"}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {panel.available ? "Ready to ship within 2-3 business days" : "Expected back in stock in 2-4 weeks"}
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-lg font-semibold text-black dark:text-white">{panel.price}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-medium text-black dark:text-white mb-3">Description</h4>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">{panel.description}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {panel.detailedDescription}
              </p>
            </div>

            <Separator className="dark:bg-neutral-700" />

            {/* Specifications */}
            <div>
              <h4 className="text-lg font-medium text-black dark:text-white mb-4">Specifications</h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Palette className="h-4 w-4 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">Material</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{panel.material}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Ruler className="h-4 w-4 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">Dimensions</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{panel.dimensions}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">Origin</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{panel.origin}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">Artisan</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{panel.artisan}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="dark:bg-neutral-700" />

            {/* Cultural Significance */}
            <div>
              <h4 className="text-lg font-medium text-black dark:text-white mb-3">Cultural Significance</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {panel.culturalSignificance}
              </p>
            </div>

            {/* Additional Information */}
            <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <h5 className="text-sm font-medium text-black dark:text-white mb-2">Care Instructions</h5>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                <li>• Hand wash in cold water with mild detergent</li>
                <li>• Lay flat to dry away from direct sunlight</li>
                <li>• Iron on low heat if needed</li>
                <li>• Store in a cool, dry place</li>
              </ul>
            </div>

            {/* Panel ID */}
            <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
              <span>Panel ID: #{panel.id.toString().padStart(3, "0")}</span>
              <span>Handcrafted • Limited Edition</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
