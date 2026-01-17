# Urban Intelligence Platform - Ahmedabad

A comprehensive urban intelligence platform for Ahmedabad city featuring real-time data visualization, predictive analytics, and citizen engagement tools.

## 🏗️ Project Structure

```
Ingenium/
├── Frontend/          # React TypeScript frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── context/      # React context providers
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript type definitions
│   └── ...
└── ai/               # AI/ML backend services
    └── model_ai1/    # Forecasting and analytics models
```

## 🚀 Features

### Frontend (React + TypeScript)
- **Authentication**: OTP-based login with role-based access
- **Interactive Dashboard**: Real-time KPI monitoring for citizens and government
- **Data Visualization**: Historical and predictive analytics with interactive charts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Maps**: Leaflet-based mapping with multiple data layers

### Key Metrics Tracked
- Air Quality Index (AQI)
- Traffic Congestion
- Healthcare Load
- School Performance
- Urban Development

### AI/ML Backend
- Time-series forecasting using Prophet
- Spatial interpolation for data analysis
- Confidence scoring for predictions
- What-if scenario analysis

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet
- **Icons**: Lucide React
- **Routing**: React Router

### Backend/AI
- **Language**: Python
- **Forecasting**: Prophet
- **Data Processing**: Pandas, NumPy
- **Scientific Computing**: SciPy
- **Visualization**: Matplotlib, Plotly

## 📦 Installation & Setup

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### AI/ML Setup
```bash
cd ai/model_ai1
pip install -r requirements.txt
python run_model.py
```

## 🎨 Design System

- **Color Scheme**: Warm beige tones (#BDE8F5) for sustainable, calm feel
- **Typography**: Clean, modern fonts with proper hierarchy
- **Components**: Modular, reusable component architecture
- **Responsive**: Mobile-first design approach

## 🔐 Authentication

- OTP-based authentication system
- Role-based access control (Citizen/Government)
- Demo OTP: `1234` for testing

## 📊 Data Visualization

- **Historical Data**: Blue solid lines showing past trends
- **Predicted Data**: Red dashed lines showing forecasts
- **Time Ranges**: 1, 3, and 5-month analysis periods
- **Interactive Charts**: Hover tooltips and responsive design

## 🗺️ Geographic Coverage

Currently focused on **Ahmedabad, Gujarat, India** with plans for expansion to other smart cities.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for urban planning and citizen engagement
- Designed with sustainability and accessibility in mind
- Powered by modern web technologies and AI/ML