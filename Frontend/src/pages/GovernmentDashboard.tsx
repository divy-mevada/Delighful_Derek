import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { KPICard } from '../components/KPICard';
import { TimelineSelector } from '../components/TimelineSelector';
import { MapComponent } from '../components/MapComponent';
import { Chatbot } from '../components/Chatbot';
import { apiService, timelineOptions } from '../services/api';
import type { KPIData } from '../types';
import { LogOut, BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { month: 'Jan', aqi: 145, traffic: 68 },
  { month: 'Feb', aqi: 152, traffic: 72 },
  { month: 'Mar', aqi: 148, traffic: 75 },
  { month: 'Apr', aqi: 156, traffic: 72 },
  { month: 'May', aqi: 162, traffic: 78 },
  { month: 'Jun', aqi: 158, traffic: 74 }
];

export const GovernmentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState('current');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiService.getCityKPIs(selectedTimeline);
        setKpiData(data);
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTimeline]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Government Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
              City-wide Analytics
            </h2>
            <TimelineSelector
              options={timelineOptions}
              selected={selectedTimeline}
              onChange={setSelectedTimeline}
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : kpiData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <KPICard
                title="Air Quality Index"
                value={kpiData.aqi}
                color={kpiData.aqi > 150 ? 'red' : 'yellow'}
                trend="up"
                icon={<AlertTriangle size={20} />}
              />
              <KPICard
                title="Traffic Congestion"
                value={kpiData.traffic}
                unit="%"
                color={kpiData.traffic > 70 ? 'red' : 'yellow'}
                trend="up"
                icon={<TrendingUp size={20} />}
              />
              <KPICard
                title="Healthcare Load"
                value={kpiData.healthcare}
                unit="%"
                color="blue"
                icon={<BarChart3 size={20} />}
              />
              <KPICard
                title="School Performance"
                value={kpiData.schools}
                unit="%"
                color="green"
                trend="down"
                icon={<Users size={20} />}
              />
              <KPICard
                title="Urban Development"
                value={kpiData.urbanDevelopment}
                unit="%"
                color="blue"
                icon={<BarChart3 size={20} />}
              />
            </div>
          ) : null}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="aqi" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">City Map with Layers</h3>
              <MapComponent layers={['traffic', 'aqi', 'healthcare']} />
            </div>
          </div>

          <div>
            <Chatbot />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-red-600">
                <AlertTriangle size={16} />
                <span className="text-sm">High AQI in East Zone</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-600">
                <AlertTriangle size={16} />
                <span className="text-sm">Traffic congestion on SG Highway</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Forecasting</h3>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Next Week AQI:</span>
                <span className="font-semibold ml-2">165 ↑</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Traffic Trend:</span>
                <span className="font-semibold ml-2">+5% ↑</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Scenarios</h3>
            <div className="space-y-2">
              <button className="w-full btn-secondary text-left text-sm">
                Scenario A: Traffic Reduction
              </button>
              <button className="w-full btn-secondary text-left text-sm">
                Scenario B: Green Initiatives
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary text-sm">
                Generate Report
              </button>
              <button className="w-full btn-secondary text-sm">
                Export Data
              </button>
              <button className="w-full btn-secondary text-sm">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};