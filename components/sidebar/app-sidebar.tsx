import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { link } from "@/types/links";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function AppSidebar({ links }: { links: link[] }) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((item) => (
              <SidebarMenuItem key={item.href} className="my-4">
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2  text-lg!"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div className="px-4 pb-2">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        © 2026 Stock Markets
      </SidebarFooter>
    </Sidebar>
  );
}
