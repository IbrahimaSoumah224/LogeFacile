import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  Home,
  TrendingUp
} from "lucide-react";
import authService, { User } from "../../services/authService";
import { useToast } from "../../hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      if (!authService.isAuthenticated()) {
        navigate("/admin/login");
        return;
      }

      // Vérifier le token avec l'API
      const { data, error } = await authService.verifyToken();
      
      if (error || !data) {
        navigate("/admin/login");
        return;
      }

      // Vérifier le rôle admin
      if (!authService.isAdmin()) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les permissions administrateur.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setUser(data);
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await authService.logout();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/admin/login");
  };

  const menuItems = [
    {
      title: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      title: "Propriétés",
      icon: Building2,
      href: "/admin/properties",
    },
    {
      title: "Utilisateurs",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Contacts",
      icon: MessageSquare,
      href: "/admin/contacts",
    },
    {
      title: "Promoteurs",
      icon: TrendingUp,
      href: "/admin/promoters",
    },
  ];

  const Sidebar = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Home className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-lg font-bold text-foreground">ImmoGuinée</h2>
            <p className="text-sm text-muted-foreground">Administration</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={location.pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => {
                navigate(item.href);
                if (isMobile) setIsMobileMenuOpen(false);
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.email || "Admin"}
            </p>
            <p className="text-xs text-muted-foreground">Administrateur</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto bg-card border-r border-border">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar isMobile={true} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;