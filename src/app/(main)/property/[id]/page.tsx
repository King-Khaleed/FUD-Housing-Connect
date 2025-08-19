
import { getPropertyById, getAgentById, properties as allProperties } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, BedDouble, Bath, Wifi, Zap, Shield, Car, Utensils, Check, Calendar, Eye, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SaveButton } from '@/components/SaveButton';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { PropertyCard } from '@/components/PropertyCard';
import { CompareButton } from '@/components/CompareButton';

const amenityIcons: { [key: string]: React.ElementType } = {
  Water: Bath,
  Electricity: Zap,
  Security: Shield,
  WiFi: Wifi,
  Parking: Car,
  Kitchen: Utensils,
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(Number(params.id));

  if (!property) {
    notFound();
  }

  const agent = getAgentById(property.agentId);

  const similarProperties = allProperties.filter(
    p => p.roomType === property.roomType && p.id !== property.id
  ).slice(0, 3);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Image Gallery */}
          <Carousel className="w-full mb-4 rounded-lg overflow-hidden border">
            <CarouselContent>
              {property.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img}
                    alt={`${property.title} image ${index + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-[500px] object-cover"
                    data-ai-hint="apartment interior"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">{property.title}</h1>
                        <div className="flex items-center text-muted-foreground mt-2">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span>{property.location.address}</span>
                        </div>
                    </div>
                    <SaveButton propertyId={property.id} className="w-12 h-12" />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="text-sm">{property.roomType}</Badge>
                    <Badge variant="secondary" className="text-sm">{property.location.distanceFromCampus}</Badge>
                    {property.verified && <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Verified Listing</Badge>}
                </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-bold font-headline mb-4">Description</h2>
              <p className="text-muted-foreground">{property.description}</p>
              
              <Separator className="my-6" />

              <h2 className="text-2xl font-bold font-headline mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map(amenity => {
                  const Icon = amenityIcons[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-6" />

               <h2 className="text-2xl font-bold font-headline mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /><span>Added: {new Date(property.dateAdded).toLocaleDateString()}</span></div>
                    <div className="flex items-center gap-2"><Eye className="w-5 h-5 text-primary" /><span>Views: {property.views}</span></div>
                    <div className="flex items-center gap-2"><BedDouble className="w-5 h-5 text-primary" /><span>Size: {property.size}</span></div>
                    <div className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /><span>Inquiries: {property.inquiries}</span></div>
                </div>

            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-3xl text-primary font-bold">{formatPrice(property.price)}
                <span className="text-lg font-normal text-muted-foreground">/{property.priceType}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {agent && (
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={agent.profileImage} alt={agent.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.verificationLevel} Agent</p>
                  </div>
                </div>
              )}
               {agent && <WhatsAppButton agent={agent} property={property} />}
              <Button variant="outline" className="w-full">Schedule a Tour</Button>
              <CompareButton propertyId={property.id} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      <div>
        <h2 className="text-3xl font-bold font-headline mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProperties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
