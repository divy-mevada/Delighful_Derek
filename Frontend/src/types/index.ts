export interface User {
  id: string;
  phone: string;
  role: 'citizen' | 'government';
  name?: string;
}

export interface KPIData {
  aqi: number;
  traffic: number;
  healthcare: number;
  schools: number;
  urbanDevelopment: number;
}

export interface AreaData {
  zone: string;
  ward: string;
  locality: string;
  kpis: KPIData;
  demand: number;
  footfall: number;
}

export interface TimelineOption {
  label: string;
  value: 'current' | '1month' | '3months' | '6months';
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  visualData?: KPIData;
}

export interface MapLayer {
  id: string;
  name: string;
  enabled: boolean;
  color: string;
}