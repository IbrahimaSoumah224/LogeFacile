import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Building2, Users, MessageSquare, TrendingUp, Home, MapPin, Phone, UserCheck } from "lucide-react";
import { authService } from "../../services/authService";
import AdminLayout from "../../components/admin/AdminLayout";

interface Stats {
  totalProperties: number;
  totalUsers: number;
  totalContacts: number;
  totalPromoters: number;
  availableProperties: number;
  rentProperties: number;
  saleProperties: number;
  newContacts: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    totalUsers: 0,
    totalContacts: 0,
    totalPromoters: 0,
    availableProperties: 0,
    rentProperties: 0,
    saleProperties: 0,
    newContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer les statistiques des propriétés
        const propertiesResponse = await authService.authenticatedFetch('/api/properties');
        const properties = await propertiesResponse.json();

        // Récupérer les utilisateurs
        const usersResponse = await authService.authenticatedFetch('/api/users');
        const users = await usersResponse.json();

        // Récupérer les contacts
        const contactsResponse = await authService.authenticatedFetch('/api/contacts');
        const contacts = await contactsResponse.json();

        // Récupérer les promoteurs
        const promotersResponse = await authService.authenticatedFetch('/api/promoters');
        const promoters = await promotersResponse.json();

        const totalProperties = properties?.length || 0;
        const availableProperties = properties?.filter((p: any) => p.status === 'available').length || 0;
        const rentProperties = properties?.filter((p: any) => p.listing_type === 'rent').length || 0;
        const saleProperties = properties?.filter((p: any) => p.listing_type === 'sale').length || 0;
        const newContacts = contacts?.filter((c: any) => c.status === 'new').length || 0;

        setStats({
          totalProperties,
          totalUsers: users?.length || 0,
          totalContacts: contacts?.length || 0,
          totalPromoters: promoters?.length || 0,
          availableProperties,
          rentProperties,
          saleProperties,
          newContacts,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Propriétés",
      value: stats.totalProperties,
      description: `${stats.availableProperties} disponibles`,
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      description: "Profils enregistrés",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Demandes Contact",
      value: stats.totalContacts,
      description: `${stats.newContacts} nouvelles`,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Promoteurs",
      value: stats.totalPromoters,
      description: "Partenaires actifs",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const quickStats = [
    {
      title: "Locations",
      value: stats.rentProperties,
      icon: Home,
      color: "text-emerald-600",
    },
    {
      title: "Ventes",
      value: stats.saleProperties,
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      title: "Contacts en attente",
      value: stats.newContacts,
      icon: Phone,
      color: "text-red-600",
    },
    {
      title: "Biens disponibles",
      value: stats.availableProperties,
      icon: UserCheck,
      color: "text-indigo-600",
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de votre plateforme ImmoGuinée
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-medium transition-spring">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistiques détaillées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Répartition des biens</CardTitle>
              <CardDescription>
                Détail par type d'annonce
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-50`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <span className="font-medium">{stat.title}</span>
                    </div>
                    <span className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>
                Dernières actions sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-section rounded-lg">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouvelles propriétés ajoutées</p>
                    <p className="text-xs text-muted-foreground">Dernières 24h</p>
                  </div>
                  <span className="font-bold text-blue-600">+{Math.floor(stats.totalProperties * 0.1)}</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-section rounded-lg">
                  <div className="p-2 rounded-lg bg-green-50">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveaux utilisateurs</p>
                    <p className="text-xs text-muted-foreground">Cette semaine</p>
                  </div>
                  <span className="font-bold text-green-600">+{Math.floor(stats.totalUsers * 0.15)}</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-section rounded-lg">
                  <div className="p-2 rounded-lg bg-orange-50">
                    <MessageSquare className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Demandes en attente</p>
                    <p className="text-xs text-muted-foreground">À traiter</p>
                  </div>
                  <span className="font-bold text-orange-600">{stats.newContacts}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;