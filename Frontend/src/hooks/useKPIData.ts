import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { KPIData } from '../types';

export const useKPIData = (timeline: string = 'current') => {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const kpiData = await apiService.getCityKPIs(timeline);
        setData(kpiData);
      } catch (err) {
        setError('Failed to fetch KPI data');
        console.error('Error fetching KPI data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeline]);

  return { data, loading, error };
};