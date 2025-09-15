import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { useApp } from '../contexts/AppContext';
import { Building2, Users, MessageSquare, TrendingUp, Eye, Calendar } from 'lucide-react';
import { mockChartData, mockDashboardStats } from '../data/mockData';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export default function dashboard() {
  const { state } = useApp();

  const propertyStatusData = [
    { name: 'Disponible', value: state.properties.filter(p => p.status === 'available').length },
    { name: 'En cours', value: state.properties.filter(p => p.status === 'pending').length },
    { name: 'Vendu', value: state.properties.filter(p => p.status === 'sold').length },
    { name: 'Loué', value: state.properties.filter(p => p.status === 'rented').length }
  ];

  const recentProperties = state.properties
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const recentContacts = state.contacts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité immobilière</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Annonces"
          value={state.properties.length}
          change="12 ce mois"
          changeType="positive"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Utilisateurs Actifs"
          value={state.users.filter(u => u.status === 'active').length}
          change="5.2%"
          changeType="positive"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Nouvelles Demandes"
          value={state.contacts.filter(c => c.status === 'new').length}
          change="3 aujourd'hui"
          changeType="positive"
          icon={MessageSquare}
          color="orange"
        />
        <StatCard
          title="Chiffre d'Affaires"
          value={`${(mockDashboardStats.monthlyRevenue / 1000).toFixed(0)}k€`}
          change={`${mockDashboardStats.revenueGrowth}%`}
          changeType="positive"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution du chiffre d'affaires</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Property Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des annonces</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {propertyStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="properties" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="contacts" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques rapides</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Vues cette semaine</span>
              </div>
              <span className="text-lg font-bold text-blue-600">2,847</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Visites programmées</span>
              </div>
              <span className="text-lg font-bold text-green-600">18</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Taux de conversion</span>
              </div>
              <span className="text-lg font-bold text-orange-600">12.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Annonces récentes</h3>
          <div className="space-y-3">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="h-12 w-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                  <p className="text-xs text-gray-500">{property.city} • {property.price.toLocaleString('fr-FR')} GNF</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  property.status === 'available' ? 'bg-green-100 text-green-800' :
                  property.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                  property.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {property.status === 'available' ? 'Disponible' :
                   property.status === 'pending' ? 'En cours' :
                   property.status === 'sold' ? 'Vendu' : 'Loué'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demandes récentes</h3>
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {contact.firstName[0]}{contact.lastName[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{contact.createdAt}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  contact.status === 'new' ? 'bg-red-100 text-red-800' :
                  contact.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                  contact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {contact.status === 'new' ? 'Nouveau' :
                   contact.status === 'in-progress' ? 'En cours' :
                   contact.status === 'resolved' ? 'Résolu' : 'Fermé'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}