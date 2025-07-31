import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { TrendingUp, BarChart3, Users, Workflow, FileText, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'User Risk', href: '/risk', icon: Users },
  { name: 'Workflow Builder', href: '/workflow', icon: Workflow },
  { name: 'Reminder Ledger', href: '/ledger', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { signOut, user } = useAuth();

  return (
    <Sidebar className="border-r border-accent/20 bg-background/95 backdrop-blur">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-gold-muted shadow-[var(--shadow-gold)]">
            <TrendingUp className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Black Swan</h2>
            <p className="text-xs text-muted-foreground">Risk Analytics</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent text-accent-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-accent/20">
        <div className="space-y-3">
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email}
            </p>
            <p className="text-xs text-muted-foreground">Risk Analyst</p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="w-full justify-start gap-2 border-accent/30 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}