import * as React from "react"
import {
  List,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/layouts/sidebar/NavMain"
import { NavUser } from "@/components/layouts/sidebar/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

const sideMenus = [
  {
    title: "DashBoard",
    url: "/admin",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: List,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: List,
  },
]

export function AdminSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin">
                <div className="border flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    className="w-full"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Beauty Store</span>
                  <span className="truncate text-xs">Admin</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sideMenus} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
