
"use client"

import Link from 'next/link';
import { properties as allProperties } from '@/lib/data';
import { PropertyCard } from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, ArrowRight, History } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const { recentlyViewed } = useAppContext();
  const featuredProperties = allProperties.filter(p => p.featured).slice(0, 5);
  const recentProperties = [...allProperties].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 6);
  const categories = [...new Set(allProperties.map(p => p.roomType))];
  
  const recentlyViewedProperties = allProperties.filter(p => recentlyViewed.includes(p.id)).sort((a, b) => recentlyViewed.indexOf(a.id) - recentlyViewed.indexOf(b.id));

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Find Your Perfect Home Near FUD Campus
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with trusted agents and landlords for the best off-campus housing deals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    type="search"
                    placeholder="Search by area, room type..."
                    className="max-w-lg flex-1"
                  />
                  <Button type="submit" size="icon" aria-label="Search">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Filters">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-full rounded-xl bg-muted overflow-hidden">
                <img
                  src="https://placehold.co/600x400.png"
                  alt="Hero"
                  width="600"
                  height="400"
                  data-ai-hint="modern student apartment"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {recentlyViewedProperties.length > 0 && (
        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl flex items-center gap-2"><History className="w-8 h-8"/> Recently Viewed</h2>
                </div>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {recentlyViewedProperties.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
            </div>
        </section>
      )}


      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Browse by Category</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">Quickly find the type of room you're looking for.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                    <Link href={`/properties?roomType=${encodeURIComponent(category)}`} key={category}>
                       <Badge variant="outline" className="text-base px-4 py-2 hover:bg-accent hover:border-accent-foreground transition-colors">{category}</Badge>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Featured Properties</h2>
            <Link href="/properties?featured=true">
                <Button variant="link" className="text-primary">
                    View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProperties.map((prop) => (
                <CarouselItem key={prop.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <PropertyCard property={prop} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Recent Listings</h2>
            <Link href="/properties">
                <Button variant="link" className="text-primary">
                    View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
