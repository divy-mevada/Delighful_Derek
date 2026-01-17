import type { KPIData, AreaData, TimelineOption } from '../types';

// Mock data for Ahmedabad
const mockKPIData: KPIData = {
  aqi: 156,
  traffic: 72,
  healthcare: 85,
  schools: 91,
  urbanDevelopment: 68
};

const mockAreas: AreaData[] = [
  {
    zone: 'West Zone',
    ward: 'Vastrapur',
    locality: 'SG Highway',
    kpis: mockKPIData,
    demand: 78,
    footfall: 1250
  },
  {
    zone: 'East Zone',
    ward: 'Maninagar',
    locality: 'Kankaria',
    kpis: { ...mockKPIData, aqi: 180, traffic: 85 },
    demand: 65,
    footfall: 980
  }
];

export const timelineOptions: TimelineOption[] = [
  { label: 'Current', value: 'current' },
  { label: '1 Month', value: '1month' },
  { label: '3 Months', value: '3months' },
  { label: '6 Months', value: '6months' }
];

export const apiService = {
  getCityKPIs: async (timeline: string = 'current'): Promise<KPIData> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockKPIData;
  },

  getAreaData: async (zone?: string, ward?: string): Promise<AreaData[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAreas.filter(area =>
      (!zone || area.zone === zone) &&
      (!ward || area.ward === ward)
    );
  },

  getZones: async (): Promise<string[]> => {
    return ['West Zone', 'East Zone', 'North Zone', 'South Zone'];
  },

  getWards: async (zone: string): Promise<string[]> => {
    const wardMap: Record<string, string[]> = {
      'West Zone': ['Vastrapur', 'Bodakdev', 'Satellite'],
      'East Zone': ['Maninagar', 'Nikol', 'Vastral'],
      'North Zone': ['Sabarmati', 'Chandkheda', 'Motera'],
      'South Zone': ['Sarkhej', 'Juhapura', 'Bopal']
    };
    return wardMap[zone] || [];
  },

  getLocalities: async (ward: string): Promise<string[]> => {
    const localityMap: Record<string, string[]> = {
      'Vastrapur': ['SG Highway', 'Vastrapur Lake', 'Shilaj'],
      'Maninagar': ['Kankaria', 'Maninagar Station', 'Danilimda']
    };
    return localityMap[ward] || [];
  },

  getKPIHistoricalData: async (type: string, months: number): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const generateData = (baseValue: number) => {
      const data = [];
      for (let i = months; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        data.push({
          period: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          value: baseValue + Math.random() * 20 - 10
        });
      }
      return data;
    };

    const baseValues: Record<string, number> = {
      aqi: 156,
      traffic: 72,
      healthcare: 85,
      schools: 91,
      urban: 68
    };

    return generateData(baseValues[type] || 50);
  },

  getKPIPredictedData: async (type: string, months: number): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const generatePredictedData = (baseValue: number) => {
      const data = [];
      for (let i = 1; i <= months; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        data.push({
          period: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          value: baseValue + Math.random() * 15 - 7.5
        });
      }
      return data;
    };

    const baseValues: Record<string, number> = {
      aqi: 156,
      traffic: 72,
      healthcare: 85,
      schools: 91,
      urban: 68
    };

    return generatePredictedData(baseValues[type] || 50);
  }
};