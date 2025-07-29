import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Clock, 
  Settings,
  LogOut,
  TrendingUp,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "User Risk", href: "/risk", icon: Users },
  { name: "Workflow Builder", href: "/workflow", icon: MessageSquare },
  { name: "Reminder Ledger", href: "/ledger", icon: Clock },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 glass-elevated border-r border-accent/20">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-gold-muted">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Black Swan</h1>
              <p className="text-xs text-muted-foreground">AI Risk Analytics</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-[var(--shadow-gold)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-accent-foreground" : "group-hover:text-accent"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-accent/20 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <Shield className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Goldman Analyst</p>
                <p className="text-xs text-muted-foreground truncate">Level 3 Access</p>
              </div>
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/40">
                Elite
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="min-h-screen p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}