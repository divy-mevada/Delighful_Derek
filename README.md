# CityView

**tutorial - https://www.youtube.com/watch?v=F5UPAlmxP3Y**

**Integrated Urban Intelligence Orchestrator** for Ahmedabad city - Real-time analytics, AI-powered insights, and comprehensive urban management dashboard.

## 📋 Project Overview

The Ahmedabad Smart City Platform is a comprehensive urban management solution designed to provide real-time insights into city operations, infrastructure utilization, and environmental conditions. Built specifically for Ahmedabad, Gujarat, this platform serves as a centralized hub for monitoring and analyzing critical urban metrics across multiple domains.

**Key Objectives:**
- Enable data-driven decision making for city administrators
- Provide transparent access to city metrics for citizens.
- Facilitate predictive analysis and scenario planning.
- Integrate multiple data sources into a unified dashboard.
- Support both real-time monitoring and historical trend analysis.

**Target Users:**
- **Government Officials**: City planners, administrators, and policy makers requiring comprehensive analytics
- **Citizens**: Residents seeking transparency in city operations and infrastructure status
- **Researchers**: Urban planning professionals and academics studying smart city implementations

## 🌟 Features

### 📊 **Real-time Analytics Dashboard**
- **Air Quality Index (AQI)**: Live monitoring across 5+ city zones with PM2.5, PM10, NO2 levels
- **Traffic Flow Analysis**: Real-time congestion mapping, speed analytics, and peak hour identification
- **Infrastructure Capacity**: Hospital bed utilization, school enrollment rates, and resource allocation
- **Urban Development Scoring**: Multi-factor assessment of city development across transport, housing, utilities

### 🤖 **AI-Powered Insights**
- **What-If Scenario Analysis**: GPT OSS 20B model for predictive modeling and policy impact assessment
- **Intelligent Forecasting**: Machine learning-based predictions for traffic, pollution, and resource demand
- **Natural Language Queries**: Chat interface for complex data analysis and report generation
- **Automated Alerts**: Smart notifications for threshold breaches and anomaly detection

### 🗺️ **Interactive Mapping**
- **TomTom Integration**: High-resolution maps with real-time traffic overlays
- **Multi-layer Visualization**: AQI heatmaps, traffic congestion zones, and infrastructure locations
- **Geospatial Analytics**: Location-based insights and zone-wise comparative analysis
- **Mobile-responsive**: Optimized for both desktop and mobile viewing

### 🔐 **Role-based Access Control**
- **Citizen Portal**: Read-only access to public metrics, basic forecasts, and transparency reports
- **Government Dashboard**: Full administrative access with advanced analytics and scenario planning
- **Audit Trails**: Complete logging of user actions and data access for compliance
- **Secure Authentication**: JWT-based authentication with role-specific permissions

### 📈 **Advanced Analytics**
- **Multi-domain Insights**: Healthcare, Education, Environment, Transportation, and Urban Development
- **Trend Analysis**: Historical data visualization with customizable time ranges
- **Comparative Metrics**: Zone-wise and time-based comparisons with statistical significance
- **Export Capabilities**: Data export in multiple formats (CSV, PDF, JSON) for further analysis

## 🏗️ Tech Stack

- **Backend**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL 15+
- **Frontend**: React 18 + TypeScript + TailwindCSS + Recharts
- **Maps**: TomTom Web SDK
- **AI**: GPT OSS 20B Model
- **APIs**: OpenAQ, CPCB, TomTom Traffic

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL 15+
- TomTom API key
- GPT OSS API key

### Backend Setup

```bash
# Clone and navigate
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Start server
python manage.py runserver
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Database Setup (PostgreSQL)

```bash
# Create database
psql -U postgres
CREATE DATABASE ahmedabad_cityview;
CREATE USER cityview_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ahmedabad_cityview TO cityview_user;
\q
```

## 📁 Project Structure

```
.
├── backend/              # Django backend
│   ├── cityview/         # Main Django project
│   ├── api/              # API endpoints
│   │   ├── aqi/          # Air quality data
│   │   ├── traffic/      # Traffic analytics
│   │   ├── infrastructure/ # Healthcare/Education
│   │   └── city/         # City overview
│   ├── authentication/   # Auth & JWT verification
│   └── core/             # Core utilities
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── analytics/ # Chart components
│   │   ├── pages/        # Dashboard, Login
│   │   ├── services/     # API calls
│   │   └── stores/       # State management
│   └── public/
└── README.md
```

## 🔐 Authentication

**Test Login Credentials:**

**Citizen User:**
- Email: `tirthpatel1356@gmail.com`
- Password: `1234`
- Role: Citizen (read-only access)

**Government User:**
- Email: `tirthpatel3129@gmail.com`
- Password: `1234`
- Role: Government (full access)

## 📝 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://cityview_user:your_password@localhost:5432/ahmedabad_cityview

# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# External APIs
GPT_OSS_API_KEY=your-gpt-oss-api-key
TOMTOM_API_KEY=your-tomtom-api-key
OPENAQ_API_KEY=your-openaq-api-key
CPCB_API_KEY=your-cpcb-api-key
```

### Frontend (.env)

```env
VITE_DJANGO_API_URL=http://localhost:8000/api
VITE_TOMTOM_API_KEY=your-tomtom-api-key
```

## 🚦 How to Run Locally

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

## 🛠️ Error Handling

- **API Failures**: Fallback to mock data for development
- **Authentication**: Clear error messages for invalid credentials
- **Network Issues**: Retry logic with exponential backoff
- **Database Errors**: Graceful degradation with cached data
- **Frontend Errors**: Error boundaries prevent app crashes

## 🔒 Security Notice

✅ **No secrets committed to repository**
- All API keys use environment variables
- Database credentials externalized
- JWT secrets not hardcoded
- Test credentials are non-production only

## 👥 Roles & Permissions

- **Citizen**: Dashboard analytics, map viewing, basic forecasts
- **Government**: Full access + What-If scenarios + advanced analytics

## 🌐 API Endpoints

- `GET /api/city/overview` - City metrics dashboard
- `GET /api/aqi/current` - Real-time air quality
- `GET /api/traffic/current` - Traffic flow data
- `GET /api/infrastructure/healthcare` - Hospital capacity
- `GET /api/infrastructure/education` - School enrollment
- `POST /api/auth/verify` - Token verification
