
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-2xl font-semibold">Analytics Coming Soon</h3>
            <p className="mt-2 text-muted-foreground">
              Detailed performance metrics for your properties will be available here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
