
"use client";

import { Scales, Plus, Check } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CompareButtonProps extends ButtonProps {
  propertyId: number;
}

export function CompareButton({ propertyId, className, ...props }: CompareButtonProps) {
  const { isPropertyForCompare, toggleCompareProperty, compareProperties } = useAppContext();
  const selected = isPropertyForCompare(propertyId);
  const { toast } = useToast();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selected && compareProperties.length >= 3) {
      toast({
        variant: "destructive",
        title: "Comparison Limit Reached",
        description: "You can only compare up to 3 properties at a time.",
      });
      return;
    }

    toggleCompareProperty(propertyId);
    toast({
      title: selected ? "Removed from Compare" : "Added to Compare",
      description: selected ? "Property removed from your comparison list." : "Property added to your comparison list.",
    });
  };

  return (
    <Button
      variant={selected ? "secondary" : "outline"}
      className={cn("w-full", className)}
      onClick={handleToggle}
      aria-label={selected ? "Remove from comparison" : "Add to comparison"}
      {...props}
    >
      {selected ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Plus className="mr-2 h-4 w-4" />}
      {selected ? "In Compare" : "Add to Compare"}
    </Button>
  );
}
