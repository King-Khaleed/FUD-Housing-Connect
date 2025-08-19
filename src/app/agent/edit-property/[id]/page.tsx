
"use client"

import { PropertyForm } from "../../_components/PropertyForm";
import { useAppContext } from "@/contexts/AppContext";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPropertyPage() {
    const { getPropertyById } = useAppContext();
    const params = useParams();
    const id = Number(params.id);
    const property = getPropertyById(id);

    if (!property) {
        return (
             <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-96 w-full" />
             </div>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
            <PropertyForm property={property} />
        </div>
    )
}
