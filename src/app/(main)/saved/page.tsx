"use client"

import { useAppContext } from "@/contexts/AppContext"
import { properties as allProperties } from "@/lib/data"
import { PropertyCard } from "@/components/PropertyCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Trash2 } from "lucide-react"

export default function SavedPropertiesPage() {
  const { savedProperties, clearSavedProperties } = useAppContext()

  const savedList = allProperties.filter(p => savedProperties.includes(p.id))

  const handleClearAll = () => {
    // A confirmation dialog would be good here in a real app
    clearSavedProperties()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-headline">Your Saved Properties</h1>
          <p className="text-muted-foreground mt-1">
            {savedList.length > 0
              ? `You have ${savedList.length} saved propert${savedList.length > 1 ? 'ies' : ''}.`
              : "You have no saved properties yet."}
          </p>
        </div>
        {savedList.length > 0 && (
          <Button variant="destructive" onClick={handleClearAll}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        )}
      </div>

      {savedList.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedList.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-2xl font-semibold">No saved properties yet.</h3>
          <p className="mt-2 text-muted-foreground">
            Browse properties to save your favorites!
          </p>
          <Button asChild className="mt-6">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
