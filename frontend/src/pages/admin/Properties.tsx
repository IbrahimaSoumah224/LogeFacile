import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Search, Plus, Edit, Trash2, Eye, MapPin, Bed, Bath, Square } from "lucide-react";
import { authService } from "../../services/authService";
import { useToast } from "../../hooks/use-toast";
import AdminLayout from "../../components/admin/AdminLayout";

interface Property {
  id: string;
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  price: number;
  currency: string;
  location: string;
  region: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  features: string[];
  images: string[];
  status: string;
  created_at: string;
}

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "villa",
    listing_type: "rent",
    price: "",
    location: "",
    region: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: "",
    status: "available",
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, statusFilter, typeFilter]);

  const fetchProperties = async () => {
    try {
      const response = await authService.authenticatedFetch('/api/properties');
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erreur lors du chargement');
      setProperties(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les propriétés",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(property => property.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(property => property.property_type === typeFilter);
    }

    setFilteredProperties(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        property_type: formData.property_type as "villa" | "appartement" | "studio" | "maison" | "parcelle",
        listing_type: formData.listing_type as "rent" | "sale",
        price: parseInt(formData.price),
        location: formData.location,
        region: formData.region,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseInt(formData.area) : null,
        features: formData.features.split(',').map(f => f.trim()).filter(f => f),
        status: formData.status as "available" | "rented" | "sold" | "pending",
        images: [], // Pour l'instant, on laisse vide
      };

      if (editingProperty) {
        const response = await authService.authenticatedFetch(`/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(propertyData),
        });

        if (!response.ok) throw new Error('Erreur lors de la mise à jour');
        toast({
          title: "Succès",
          description: "Propriété mise à jour avec succès",
        });
      } else {
        const response = await authService.authenticatedFetch('/api/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(propertyData),
        });

        if (!response.ok) throw new Error('Erreur lors de la création');
        toast({
          title: "Succès",
          description: "Propriété ajoutée avec succès",
        });
      }

      setIsDialogOpen(false);
      setEditingProperty(null);
      resetForm();
      fetchProperties();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      property_type: property.property_type,
      listing_type: property.listing_type,
      price: property.price.toString(),
      location: property.location,
      region: property.region,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area?.toString() || "",
      features: property.features.join(', '),
      status: property.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) return;

    try {
      const response = await authService.authenticatedFetch(`/api/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');
      
      toast({
        title: "Succès",
        description: "Propriété supprimée avec succès",
      });
      fetchProperties();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la propriété",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      property_type: "villa",
      listing_type: "rent",
      price: "",
      location: "",
      region: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      features: "",
      status: "available",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: "Disponible", variant: "default" as const },
      rented: { label: "Loué", variant: "secondary" as const },
      sold: { label: "Vendu", variant: "destructive" as const },
      pending: { label: "En attente", variant: "outline" as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const typeLabels = {
      villa: "Villa",
      appartement: "Appartement",
      studio: "Studio",
      maison: "Maison",
      parcelle: "Parcelle",
    };
    
    return <Badge variant="outline">{typeLabels[type as keyof typeof typeLabels] || type}</Badge>;
  };

  if (isLoading && properties.length === 0) {
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Propriétés</h1>
            <p className="text-muted-foreground">
              Gérez toutes les annonces immobilières
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setEditingProperty(null); }}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une propriété
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProperty ? "Modifier la propriété" : "Ajouter une propriété"}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations de la propriété
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Titre *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="property_type">Type de bien *</Label>
                    <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="parcelle">Parcelle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="listing_type">Type d'annonce *</Label>
                    <Select value={formData.listing_type} onValueChange={(value) => setFormData({...formData, listing_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">Location</SelectItem>
                        <SelectItem value="sale">Vente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Prix (GNF) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="rented">Loué</SelectItem>
                        <SelectItem value="sold">Vendu</SelectItem>
                        <SelectItem value="pending">En attente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Localisation *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="region">Région *</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bedrooms">Chambres</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bathrooms">Salles de bain</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="area">Surface (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
                    <Input
                      id="features"
                      value={formData.features}
                      onChange={(e) => setFormData({...formData, features: e.target.value})}
                      placeholder="Piscine, Jardin, Garage, Climatisé..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enregistrement..." : (editingProperty ? "Modifier" : "Ajouter")}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtres */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres et recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par titre, lieu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="rented">Loué</SelectItem>
                  <SelectItem value="sold">Vendu</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="maison">Maison</SelectItem>
                  <SelectItem value="parcelle">Parcelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des propriétés */}
        <Card>
          <CardHeader>
            <CardTitle>
              Propriétés ({filteredProperties.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{property.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {property.listing_type === 'rent' ? 'Location' : 'Vente'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(property.property_type)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {parseInt(property.price.toString()).toLocaleString()} {property.currency}
                          {property.listing_type === 'rent' && '/mois'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{property.region}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                          {property.bedrooms && (
                            <div className="flex items-center gap-1">
                              <Bed className="h-3 w-3" />
                              <span>{property.bedrooms}</span>
                            </div>
                          )}
                          {property.bathrooms && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-3 w-3" />
                              <span>{property.bathrooms}</span>
                            </div>
                          )}
                          {property.area && (
                            <div className="flex items-center gap-1">
                              <Square className="h-3 w-3" />
                              <span>{property.area}m²</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(property.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(property)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(property.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;