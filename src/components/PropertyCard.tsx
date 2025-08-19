import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, Bath, Heart, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { SaveButton } from '@/components/SaveButton';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow duration-300 group", className)}>
      <Link href={`/property/${property.id}`} className="block">
        <CardHeader className="p-0 relative">
          <Image
            src={property.images[0]}
            alt={property.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="apartment exterior"
          />
          <div className="absolute top-2 right-2">
            <SaveButton propertyId={property.id} />
          </div>
          {property.featured && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Featured</Badge>
          )}
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <p className="text-sm text-muted-foreground">{property.location.area}</p>
          <h3 className="text-lg font-headline font-semibold truncate">{property.title}</h3>
          <p className="text-xl font-bold text-primary">{formatPrice(property.price)} <span className="text-sm font-normal text-muted-foreground">/{property.priceType}</span></p>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <MapPin className="h-4 w-4" />
            <span>{property.location.distanceFromCampus}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <BedDouble className="h-4 w-4" />
            <span>{property.roomType}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 2).map(amenity => (
                    <Badge key={amenity} variant="secondary" className="text-xs">{amenity}</Badge>
                ))}
            </div>
          {property.verified && (
            <div className="flex items-center text-xs text-green-600 gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Verified</span>
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
