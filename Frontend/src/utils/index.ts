export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getAQIStatus = (aqi: number): { status: string; color: string } => {
  if (aqi <= 50) return { status: 'Good', color: 'green' };
  if (aqi <= 100) return { status: 'Moderate', color: 'yellow' };
  if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'orange' };
  if (aqi <= 200) return { status: 'Unhealthy', color: 'red' };
  if (aqi <= 300) return { status: 'Very Unhealthy', color: 'purple' };
  return { status: 'Hazardous', color: 'maroon' };
};

export const getTrafficStatus = (traffic: number): { status: string; color: string } => {
  if (traffic <= 30) return { status: 'Light', color: 'green' };
  if (traffic <= 60) return { status: 'Moderate', color: 'yellow' };
  if (traffic <= 80) return { status: 'Heavy', color: 'orange' };
  return { status: 'Severe', color: 'red' };
};

export const calculateTrend = (current: number, previous: number): 'up' | 'down' | 'stable' => {
  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 2) return 'stable';
  return change > 0 ? 'up' : 'down';
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};