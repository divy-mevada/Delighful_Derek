import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { KPICard } from '../components/KPICard';
import { TimelineSelector } from '../components/TimelineSelector';
import { AreaSelector } from '../components/AreaSelector';
import { MapComponent } from '../components/MapComponent';
import { apiService, timelineOptions } from '../services/api';
import type { KPIData } from '../types';
import { LogOut, Activity, Car, Stethoscope, GraduationCap, Building2 } from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleAreaChange = (zone: string, ward: string, locality: string) => {
    console.log('Area selected:', { zone, ward, locality });
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    return 'red';
  };

  const getTrafficColor = (traffic: number) => {
    if (traffic <= 40) return 'green';
    if (traffic <= 70) return 'yellow';
    return 'red';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Citizen Dashboard</h1>
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
        {/* Area Selection */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold mb-4">Area Selection</h3>
          <AreaSelector onSelectionChange={handleAreaChange} />
        </div>

        {/* Interactive Map */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Interactive Map</h3>
          <MapComponent layers={['traffic', 'aqi']} />
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
              Ahmedabad City Overview
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
                color={getAQIColor(kpiData.aqi)}
                icon={<Activity size={20} />}
                onClick={() => navigate('/air-quality')}
              />
              <KPICard
                title="Traffic Congestion"
                value={kpiData.traffic}
                unit="%"
                color={getTrafficColor(kpiData.traffic)}
                icon={<Car size={20} />}
                onClick={() => navigate('/traffic-congestion')}
              />
              <KPICard
                title="Healthcare Load"
                value={kpiData.healthcare}
                unit="%"
                color="blue"
                icon={<Stethoscope size={20} />}
                onClick={() => navigate('/healthcare-load')}
              />
              <KPICard
                title="School Performance"
                value={kpiData.schools}
                unit="%"
                color="green"
                icon={<GraduationCap size={20} />}
                onClick={() => navigate('/school-performance')}
              />
              <KPICard
                title="Urban Development"
                value={kpiData.urbanDevelopment}
                unit="%"
                color="blue"
                icon={<Building2 size={20} />}
                onClick={() => navigate('/urban-development')}
              />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};
