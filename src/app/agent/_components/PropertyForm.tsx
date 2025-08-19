
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import type { Property } from "@/lib/types";

const agentId = 1; // Simulate logged-in agent

const allAmenities = ["Water", "Electricity", "Security", "WiFi", "Parking", "Kitchen", "Furnished"];
const roomTypes = ['Self-contain', '1-Bedroom', '2-Bedroom', 'Shared Apartment', '3-Bedroom', '4-Bedroom'];
const areas = ['Main Gate Area', 'Dutse Township', 'Gida Dubu', 'New Site', 'Takur'];
const distances = ['Walking distance', '5-10 mins drive', '10+ mins drive'];

const propertyFormSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  price: z.coerce.number().min(1000, { message: "Price must be at least ₦1,000" }),
  priceType: z.enum(["annual", "monthly"]),
  roomType: z.string({ required_error: "Please select a room type." }),
  size: z.string().min(1, { message: "Please enter a size." }),
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  verified: z.boolean().default(true),
  location: z.object({
    area: z.string({ required_error: "Please select an area." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    distanceFromCampus: z.string({ required_error: "Please select a distance." }),
  }),
  amenities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one amenity.",
  }),
  images: z.string().min(1, {message: "Please add at least one image URL"}),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
    property?: Property;
}

export function PropertyForm({ property }: PropertyFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addProperty, updateProperty } = useAppContext();

  const isEditMode = !!property;

  const defaultValues: Partial<PropertyFormValues> = property ? {
      ...property,
      images: property.images.join(", "),
  } : {
    priceType: "annual",
    available: true,
    amenities: [],
  };

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: PropertyFormValues) {
    const propertyData = {
        ...data,
        agentId: agentId,
        dateAdded: property?.dateAdded || new Date().toISOString().split('T')[0],
        views: property?.views || 0,
        inquiries: property?.inquiries || 0,
        location: {
            ...data.location,
            coordinates: { lat: 11.74, lng: 9.33 } // Placeholder
        },
        images: data.images.split(",").map(url => url.trim()).filter(url => url),
    };

    if (isEditMode && property) {
        updateProperty({ ...propertyData, id: property.id });
        toast({
            title: "Property Updated",
            description: "Your property has been successfully updated.",
        });
        router.push("/agent/properties");
    } else {
        addProperty(propertyData);
        toast({
            title: "Property Added",
            description: "Your new property has been successfully listed.",
        });
        router.push("/agent/properties");
    }
  }

  return (
     <Card>
        <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Property' : 'Add a New Property'}</CardTitle>
            <CardDescription>{isEditMode ? 'Update the details of your property.' : 'Fill out the form below to list a new property.'}</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Modern 2-Bedroom Near FUD Main Gate" {...field} />
                    </FormControl>
                    <FormDescription>A catchy and descriptive title for your property.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Describe the property in detail..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                
                <Separator />
                <h3 className="text-lg font-medium">Pricing & Type</h3>

                <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Price (NGN)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 180000" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="priceType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price Type</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select price type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="annual">Annual</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="roomType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Type</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a room type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roomTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Property Size</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Standard, 25sqm" {...field} />
                        </FormControl>
                        <FormDescription>Enter the size of the property (e.g., "Spacious", "25sqm").</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />
                <h3 className="text-lg font-medium">Location</h3>

                 <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="location.area"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an area" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {areas.map(area => <SelectItem key={area} value={area}>{area}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="location.distanceFromCampus"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Distance From Campus</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select distance" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {distances.map(dist => <SelectItem key={dist} value={dist}>{dist}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                 </div>
                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter the full property address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Separator />
                <h3 className="text-lg font-medium">Amenities & Images</h3>

                <FormField
                    control={form.control}
                    name="amenities"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Amenities</FormLabel>
                            <FormDescription>
                            Select the amenities available at the property.
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {allAmenities.map((item) => (
                            <FormField
                            key={item}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, item])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                    {item}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image URLs</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter image URLs, separated by commas" {...field} />
                        </FormControl>
                        <FormDescription>
                            Add URLs for property images. For multiple images, separate them with a comma.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />
                <h3 className="text-lg font-medium">Status</h3>

                 <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Availability Status</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={ (value) => field.onChange(value === 'true')}
                            defaultValue={String(field.value)}
                            className="flex flex-col space-y-1"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="true" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Available
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="false" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                Occupied
                                </FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />


                <div className="flex justify-end">
                    <Button type="submit">{isEditMode ? 'Update Property' : 'Add Property'}</Button>
                </div>
            </form>
            </Form>
        </CardContent>
     </Card>
  );
}

