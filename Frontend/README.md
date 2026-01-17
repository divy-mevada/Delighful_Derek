# Ahmedabad Urban Intelligence Platform - Frontend

A React-based web application for monitoring and analyzing urban metrics in Ahmedabad city.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Leaflet** for interactive maps
- **Recharts** for data visualization
- **Lucide React** for icons

## Features

### User Roles
- **Citizens**: View city-wide KPIs, area-specific data, and interactive maps
- **Government Employees**: Advanced analytics, forecasting, and what-if scenario analysis

### Key Functionality
- Real-time monitoring of AQI, traffic, healthcare, schools, and urban development
- Area-wise data filtering (Zone → Ward → Locality)
- Timeline-based analysis (Current, 1 month, 3 months, 6 months)
- Interactive maps with multiple layers
- What-if chatbot for scenario analysis (Government only)
- OTP-based authentication with role-based routing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── KPICard.tsx     # Metric display cards
│   ├── TimelineSelector.tsx
│   ├── AreaSelector.tsx
│   ├── MapComponent.tsx
│   ├── Chatbot.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Main application pages
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── CitizenDashboard.tsx
│   └── GovernmentDashboard.tsx
├── context/            # React context providers
│   └── AuthContext.tsx
├── services/           # API and data services
│   └── api.ts
├── hooks/              # Custom React hooks
│   └── useKPIData.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── index.ts
└── assets/             # Static assets
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

### Demo Login
- Use any 10-digit phone number
- OTP: `1234` (for demo purposes)

### Navigation Flow
1. **Landing Page**: Choose user role (Citizen/Government)
2. **Login**: OTP-based authentication
3. **Dashboard**: Role-specific interface with relevant features

### Key Components

#### KPI Cards
Display real-time metrics with color-coded status indicators:
- Green: Good/Normal
- Yellow: Moderate/Warning
- Red: Poor/Critical

#### Area Selector
Hierarchical location selection:
- Zone → Ward → Locality
- Dynamic loading based on selection

#### Timeline Selector
Filter data by time periods:
- Current, 1 month, 3 months, 6 months

#### Interactive Map
- Leaflet-based map centered on Ahmedabad
- Multiple data layers (AQI, Traffic, Healthcare)
- Landmark markers for key locations

#### What-If Chatbot (Government Only)
- Natural language scenario queries
- Visual output cards showing projected impacts
- Synchronized with map view

## Mock Data

The application uses mock data for demonstration:
- Ahmedabad-specific zones, wards, and localities
- Realistic KPI values for urban metrics
- Sample trend data for charts
- Predefined landmarks and map markers

## Customization

### Adding New KPIs
1. Update `KPIData` interface in `types/index.ts`
2. Modify `apiService` in `services/api.ts`
3. Add new KPI cards to dashboard components

### Extending Map Functionality
1. Add new layer types in `MapComponent.tsx`
2. Update layer toggle controls
3. Implement layer-specific data visualization

### Enhancing Chatbot
1. Extend `ChatMessage` interface for new data types
2. Add scenario processing logic
3. Implement visual output components

## Development Notes

- All components are fully typed with TypeScript
- Responsive design using Tailwind CSS
- Mock API calls with realistic delays
- Role-based access control throughout
- Clean, maintainable code structure

## Future Enhancements

- Real API integration
- Advanced charting and analytics
- Push notifications for alerts
- Offline capability
- Multi-language support
- Advanced map features (heat maps, clustering)