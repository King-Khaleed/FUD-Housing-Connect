
"use client"

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { properties as allProperties } from '@/lib/data';
import type { Property } from '@/lib/types';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, LayoutGrid, List, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

const allAmenities = [...new Set(allProperties.flatMap(p => p.amenities))];
const roomTypes = [...new Set(allProperties.map(p => p.roomType))];
const distances = ['Walking distance', '5-10 mins drive', '10+ mins drive'];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([50000, 500000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedDistances, setSelectedDistances] = useState<string[]>([]);
  const [furnishedStatus, setFurnishedStatus] = useState('any');
  const [sortBy, setSortBy] = useState('dateAdded-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleProperties, setVisibleProperties] = useState(9);

  useEffect(() => {
    const roomTypeFromQuery = searchParams.get('roomType');
    if (roomTypeFromQuery) {
      setSelectedRoomTypes([roomTypeFromQuery]);
    }
     const featured = searchParams.get('featured');
    if (featured === 'true') {
      setSortBy('views-desc');
    }
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    let filtered = allProperties
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => {
        if (selectedAmenities.length === 0) return true;
        return selectedAmenities.every(amenity => p.amenities.includes(amenity));
      })
      .filter(p => {
        if (selectedRoomTypes.length === 0) return true;
        return selectedRoomTypes.includes(p.roomType);
      })
      .filter(p => {
        if (selectedDistances.length === 0) return true;
        return selectedDistances.includes(p.location.distanceFromCampus);
      })
       .filter(p => {
        if (furnishedStatus === 'any') return true;
        const isFurnished = p.amenities.includes('Furnished');
        if (furnishedStatus === 'furnished') return isFurnished;
        if (furnishedStatus === 'unfurnished') return !isFurnished;
        return true;
      })
      .filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const [key, order] = sortBy.split('-');
    return filtered.sort((a, b) => {
        if (key === 'price') {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        }
        if (key === 'dateAdded') {
            return order === 'desc' ? new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime() : new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        }
        if (key === 'views') {
            return order === 'desc' ? b.views - a.views : a.views - b.views;
        }
        return 0;
    });
  }, [searchTerm, priceRange, selectedAmenities, selectedRoomTypes, selectedDistances, sortBy, furnishedStatus]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };
  
  const handleRoomTypeChange = (roomType: string) => {
    setSelectedRoomTypes(prev =>
      prev.includes(roomType) ? prev.filter(a => a !== roomType) : [...prev, roomType]
    );
  };

  const handleDistanceChange = (distance: string) => {
    setSelectedDistances(prev =>
      prev.includes(distance) ? prev.filter(a => a !== distance) : [...prev, distance]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([50000, 500000]);
    setSelectedAmenities([]);
    setSelectedRoomTypes([]);
    setSelectedDistances([]);
    setFurnishedStatus('any');
  };

  const loadMore = () => {
    setVisibleProperties(prev => prev + 9);
  };

  const formatPrice = (price: number) => `₦${(price / 1000)}k`;

  const FilterSidebar = () => (
    <div className="space-y-6">
        <div>
            <Button variant="ghost" onClick={clearFilters} className="w-full justify-start p-0 h-auto mb-4">
                <X className="w-4 h-4 mr-2"/> Clear All Filters
            </Button>
        </div>
        <div>
            <Label htmlFor="price-range" className="font-semibold text-lg">Price Range</Label>
            <Slider
                id="price-range"
                min={50000}
                max={500000}
                step={10000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mt-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
            </div>
        </div>

        <Separator />
        
        <div>
            <h3 className="font-semibold text-lg">Furnishing</h3>
             <RadioGroup defaultValue="any" value={furnishedStatus} onValueChange={setFurnishedStatus} className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any">Any</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="furnished" id="furnished" />
                    <Label htmlFor="furnished">Furnished</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unfurnished" id="unfurnished" />
                    <Label htmlFor="unfurnished">Unfurnished</Label>
                </div>
            </RadioGroup>
        </div>
        
        <Separator />

        <div>
            <h3 className="font-semibold text-lg">Room Type</h3>
            <div className="space-y-2 mt-2">
                {roomTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`type-${type}`} onCheckedChange={() => handleRoomTypeChange(type)} checked={selectedRoomTypes.includes(type)} />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                ))}
            </div>
        </div>
        
        <Separator />

        <div>
            <h3 className="font-semibold text-lg">Distance from Campus</h3>
            <div className="space-y-2 mt-2">
                {distances.map(distance => (
                    <div key={distance} className="flex items-center space-x-2">
                        <Checkbox id={`dist-${distance}`} onCheckedChange={() => handleDistanceChange(distance)} checked={selectedDistances.includes(distance)} />
                        <Label htmlFor={`dist-${distance}`}>{distance}</Label>
                    </div>
                ))}
            </div>
        </div>

        <Separator />

        <div>
            <h3 className="font-semibold text-lg">Amenities</h3>
            <div className="space-y-2 mt-2">
                {allAmenities.filter(a => a !== 'Furnished').map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={amenity} onCheckedChange={() => handleAmenityChange(amenity)} checked={selectedAmenities.includes(amenity)} />
                        <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Find Your Next Home</h1>
        <p className="text-muted-foreground">Browse all available listings</p>
      </div>
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by area, title..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="hidden lg:block">
            <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="dateAdded-desc">Recently Added</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="views-desc">Most Viewed</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div className="hidden lg:flex items-center gap-2 border rounded-md p-1">
          <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}><LayoutGrid className="h-5 w-5"/></Button>
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}><List className="h-5 w-5"/></Button>
        </div>
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">Filters</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                </SheetContent>
            </Sheet>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
                <FilterSidebar />
            </div>
        </aside>
        <main className="lg:col-span-3">
          <p className="mb-4 text-muted-foreground">{filteredProperties.length} properties found</p>
          {filteredProperties.length > 0 ? (
            <div className={`gap-6 ${viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3' : 'space-y-6'}`}>
              {filteredProperties.slice(0, visibleProperties).map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold">No Properties Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
          {visibleProperties < filteredProperties.length && (
            <div className="text-center mt-8">
              <Button onClick={loadMore} size="lg">Load More</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
