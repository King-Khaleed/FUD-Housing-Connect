
"use client"

import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/contexts/AppContext";
import { properties as allProperties } from "@/lib/data";
import { Button } from "./ui/button";
import { X, Scale, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";

export function CompareBar() {
  const { compareProperties, toggleCompareProperty, clearCompare } = useAppContext();
  const { toast } = useToast();
  
  const propertiesToCompare = allProperties.filter(p => compareProperties.includes(p.id));

  if (propertiesToCompare.length === 0) {
    return null;
  }

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompareProperty(id);
    toast({
      title: "Property Removed",
      description: "Removed from your comparison list.",
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center">
        <Card className="w-full max-w-4xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Scale className="h-6 w-6 text-primary hidden sm:block" />
                    <div className="flex items-center gap-2">
                        {propertiesToCompare.map(p => (
                            <div key={p.id} className="relative">
                                <Link href={`/property/${p.id}`}>
                                    <Image 
                                        src={p.images[0]} 
                                        alt={p.title} 
                                        width={64} 
                                        height={64} 
                                        className="h-16 w-16 rounded-md object-cover border-2 border-primary/50"
                                        data-ai-hint="apartment exterior"
                                    />
                                </Link>
                                <Button 
                                    variant="destructive"
                                    size="icon" 
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                    onClick={(e) => handleRemove(e, p.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         {Array.from({ length: 3 - propertiesToCompare.length }).map((_, i) => (
                            <div key={`placeholder-${i}`} className="h-16 w-16 rounded-md bg-muted border-2 border-dashed flex items-center justify-center">
                                <Scale className="h-6 w-6 text-muted-foreground" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Button asChild>
                        <Link href="/compare">Compare Now ({propertiesToCompare.length}/3)</Link>
                    </Button>
                    <Button variant="outline" onClick={clearCompare}>
                        <Trash2 className="h-4 w-4 mr-0 md:mr-2" />
                        <span className="hidden md:inline">Clear</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
