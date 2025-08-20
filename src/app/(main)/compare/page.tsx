
"use client"

import { useAppContext } from "@/contexts/AppContext";
import { properties as allProperties, getAgentById } from "@/lib/data";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Scale, Trash2 } from "lucide-react";
import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CompareButton } from "@/components/CompareButton";
import { Separator } from "@/components/ui/separator";

export default function ComparePage() {
  const { compareProperties, clearCompare } = useAppContext();
  const propertiesToCompare = allProperties.filter(p => compareProperties.includes(p.id));

  const allAmenities = [...new Set(propertiesToCompare.flatMap(p => p.amenities))];
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
  };

  if (propertiesToCompare.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <Scale className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-2xl font-semibold">Nothing to compare.</h3>
          <p className="mt-2 text-muted-foreground">
            Add up to 3 properties to the comparison list to see them here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-headline">Compare Properties</h1>
          <p className="text-muted-foreground mt-1">
            Side-by-side comparison of your selected properties.
          </p>
        </div>
        <Button variant="destructive" onClick={clearCompare}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear Comparison
        </Button>
      </div>

      {/* Desktop View: Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table className="border min-w-[1024px]">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-lg w-[200px]">Feature</TableHead>
              {propertiesToCompare.map(p => (
                <TableHead key={p.id}>
                   <div className="relative h-48 w-full rounded-md overflow-hidden mb-2">
                     <Image src={p.images[0]} alt={p.title} fill objectFit="cover" data-ai-hint="apartment exterior" />
                   </div>
                   <h3 className="font-bold text-base text-foreground">{p.title}</h3>
                </TableHead>
              ))}
               {Array.from({ length: 3 - propertiesToCompare.length }).map((_, i) => (
                <TableHead key={`placeholder-${i}`}></TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
                <TableCell className="font-semibold">Price</TableCell>
                {propertiesToCompare.map(p => <TableCell key={p.id} className="text-primary font-bold text-lg">{formatPrice(p.price)}/{p.priceType}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Room Type</TableCell>
                {propertiesToCompare.map(p => <TableCell key={p.id}>{p.roomType}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Location</TableCell>
                {propertiesToCompare.map(p => <TableCell key={p.id}>{p.location.area}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Distance from Campus</TableCell>
                {propertiesToCompare.map(p => <TableCell key={p.id}>{p.location.distanceFromCampus}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell className="font-semibold">Agent</TableCell>
                {propertiesToCompare.map(p => {
                    const agent = getAgentById(p.agentId);
                    return <TableCell key={p.id}>{agent ? agent.name : 'N/A'}</TableCell>
                })}
            </TableRow>
             {allAmenities.length > 0 && 
                <TableRow>
                    <TableCell className="font-semibold pt-4" colSpan={propertiesToCompare.length + 1}>
                        <h4 className="text-lg font-bold text-foreground">Amenities</h4>
                        <Separator className="my-2" />
                    </TableCell>
                </TableRow>
            }
            {allAmenities.map(amenity => (
                 <TableRow key={amenity}>
                    <TableCell className="font-semibold">{amenity}</TableCell>
                    {propertiesToCompare.map(p => (
                        <TableCell key={p.id} className="text-center">
                            {p.amenities.includes(amenity) 
                                ? <Check className="h-6 w-6 text-green-500 mx-auto" /> 
                                : <X className="h-6 w-6 text-red-500 mx-auto" />}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
            <TableRow>
                <TableCell></TableCell>
                {propertiesToCompare.map(p => {
                     const agent = getAgentById(p.agentId);
                     return (
                        <TableCell key={p.id} className="space-y-2">
                             <Button asChild className="w-full">
                                <Link href={`/property/${p.id}`}>View Details</Link>
                            </Button>
                            {agent && <WhatsAppButton agent={agent} property={p} />}
                            <CompareButton propertyId={p.id} asChild>
                                <Button variant="outline" className="w-full">
                                    <Trash2 className="mr-2 h-4 w-4"/> Remove
                                </Button>
                            </CompareButton>
                        </TableCell>
                     )
                })}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Mobile View: Cards */}
      <div className="lg:hidden space-y-8">
        {propertiesToCompare.map(p => (
            <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}
