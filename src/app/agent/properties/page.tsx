
"use client"

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoreHorizontal, PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { Property } from "@/lib/types";

const agentId = 1; // Simulate logged-in agent

export default function AgentPropertiesPage() {
  const { getPropertiesByAgent, deleteProperty, updateProperty } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const agentProperties = getPropertiesByAgent(agentId);

  const filteredProperties = useMemo(() => {
    return agentProperties.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, agentProperties]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
  };
  
  const toggleAvailability = (property: Property) => {
    updateProperty({ ...property, available: !property.available });
  };


  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Properties</CardTitle>
          <CardDescription>
            Here you can manage all your property listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by title or area..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link href="/agent/add-property">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Property
              </Link>
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-right">
                    Views
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((prop) => (
                    <TableRow key={prop.id}>
                      <TableCell>
                        <div className="font-medium">{prop.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {prop.location.area}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatPrice(prop.price)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={prop.available ? "secondary" : "destructive"}>
                          {prop.available ? "Available" : "Occupied"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-right">
                        {prop.views.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/agent/edit-property/${prop.id}`}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleAvailability(prop)}>
                               {prop.available ? "Mark as Occupied" : "Mark as Available"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        property listing.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteProperty(prop.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No properties found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
