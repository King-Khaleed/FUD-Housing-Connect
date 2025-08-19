

"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, BedDouble, Home, CheckCircle, XCircle, BarChart2, PlusCircle, Edit, Trash2, ArrowUpRight } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { getAgentById } from "@/lib/data";


const agentId = 1; // Simulate logged-in agent
const agent = getAgentById(agentId);


const StatCard = ({ icon: Icon, title, value, change, description }: { icon: React.ElementType, title: string, value: string | number, change?: string, description: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
);

export default function AgentDashboardPage() {
    const { getPropertiesByAgent } = useAppContext();
    const agentProperties = getPropertiesByAgent(agentId);

    const totalViews = agentProperties.reduce((acc, p) => acc + p.views, 0);
    const totalInquiries = agentProperties.reduce((acc, p) => acc + p.inquiries, 0);
    const availableProperties = agentProperties.filter(p => p.available).length;

    const chartData = agentProperties.slice(0, 5).map(p => ({
        name: p.title.split(' ').slice(0,2).join(' '),
        views: p.views,
    }));

    const chartConfig = {
      views: {
        label: "Views",
        color: "hsl(var(--primary))",
      },
    } satisfies ChartConfig


    if (!agent) {
        return <div>Agent not found.</div>
    }

    return (
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button>Download Report</Button>
                <Button asChild>
                    <Link href="/agent/add-property"><PlusCircle className="mr-2 h-4 w-4" /> Add New Property</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Home} title="Total Properties" value={agentProperties.length} description="Properties you manage" />
                <StatCard icon={Eye} title="Total Views" value={totalViews.toLocaleString()} description="+20.1% from last month" />
                <StatCard icon={BedDouble} title="Total Inquiries" value={totalInquiries.toLocaleString()} description="+180.1% from last month" />
                <StatCard icon={CheckCircle} title="Available Properties" value={`${availableProperties} / ${agentProperties.length}`} description="Currently listed as available" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Property Views Overview</CardTitle>
                        <CardDescription>Views on your top 5 properties.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                         <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 10) + '...'}
                                />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Recent inquiries and views on your properties.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-6">
                            <div className="flex items-center">
                                <Eye className="h-6 w-6 mr-4 text-primary" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">New views on "Modern 2-Bedroom"</p>
                                    <p className="text-sm text-muted-foreground">25 new views today.</p>
                                </div>
                                <div className="ml-auto font-medium">+245</div>
                            </div>
                             <div className="flex items-center">
                                <BedDouble className="h-6 w-6 mr-4 text-primary" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">New inquiry for "Cozy Self-Contain"</p>
                                    <p className="text-sm text-muted-foreground">From a student named Alex.</p>
                                </div>
                            </div>
                             <div className="flex items-center">
                                <Eye className="h-6 w-6 mr-4 text-primary" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">New views on "Premium 1-Bedroom"</p>
                                    <p className="text-sm text-muted-foreground">150 new views this week.</p>
                                </div>
                                <div className="ml-auto font-medium">+350</div>
                            </div>
                       </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Properties</CardTitle>
                    <CardDescription>Manage your property listings and view their performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Property</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="hidden md:table-cell text-right">Views</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {agentProperties.map(prop => (
                                <TableRow key={prop.id}>
                                    <TableCell>
                                        <div className="font-medium">{prop.title}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">{prop.location.area}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">₦{prop.price.toLocaleString()}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={prop.available ? "secondary" : "destructive"}>
                                            {prop.available ? "Available" : "Occupied"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-right">{prop.views}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/agent/edit-property/${prop.id}`}><Edit className="h-4 w-4" /></Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    )
}
