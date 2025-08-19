
"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Home,
  LayoutGrid,
  Settings,
  User,
  LogOut,
  Building,
  MessageSquare,
  BarChart,
  PlusCircle
} from "lucide-react"
import { Logo } from "@/components/Logo"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAgentById } from "@/lib/data"
import { Button } from "@/components/ui/button"

const agent = getAgentById(1); // Simulate logged-in agent

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/agent/dashboard"
                isActive={isActive("/agent/dashboard")}
                tooltip="Dashboard"
              >
                <LayoutGrid />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/agent/properties"
                isActive={isActive("/agent/properties")}
                tooltip="Properties"
              >
                <Building />
                <span>Properties</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                href="/agent/add-property"
                isActive={isActive("/agent/add-property")}
                tooltip="Add Property"
              >
                <PlusCircle />
                <span>Add Property</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/agent/inquiries"
                isActive={isActive("/agent/inquiries")}
                tooltip="Inquiries"
              >
                <MessageSquare />
                <span>Inquiries</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                href="/agent/analytics"
                isActive={isActive("/agent/analytics")}
                tooltip="Analytics"
              >
                <BarChart />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton
                href="/agent/settings"
                isActive={isActive("/agent/settings")}
                tooltip="Settings"
               >
                 <Settings />
                 <span>Settings</span>
               </SidebarMenuButton>
             </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton href="/">
                 <LogOut />
                 <span>Back to Student View</span>
               </SidebarMenuButton>
             </SidebarMenuItem>
           </SidebarMenu>
            {agent && (
                <div className="flex items-center gap-2 p-2 border-t mt-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={agent.profileImage} />
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.email}</p>
                    </div>
                </div>
            )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold capitalize">{pathname.split('/').pop()?.replace(/-/g, ' ')}</h1>
            <Button variant="outline" asChild>
                <a href="/" target="_blank">View Site</a>
            </Button>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
