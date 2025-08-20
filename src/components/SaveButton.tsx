
"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface SaveButtonProps {
  propertyId: number;
  className?: string;
}

export function SaveButton({ propertyId, className }: SaveButtonProps) {
  const { isPropertySaved, toggleSavedProperty } = useAppContext();
  const [isMounted, setIsMounted] = useState(false);
  const saved = isPropertySaved(propertyId);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedProperty(propertyId);
    toast({
        title: saved ? "Property Unsaved" : "Property Saved",
        description: saved ? "Removed from your saved list." : "Added to your saved list.",
    })
  };
  
  if (!isMounted) {
      return (
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-full", className)}
            disabled
          >
              <Heart className="h-5 w-5 text-gray-500" />
          </Button>
      )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("rounded-full hover:bg-red-100 dark:hover:bg-red-900/50", className)}
      onClick={handleToggle}
      aria-label={saved ? "Unsave property" : "Save property"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all",
          saved ? "text-red-500 fill-current" : "text-gray-500"
        )}
      />
    </Button>
  );
}
