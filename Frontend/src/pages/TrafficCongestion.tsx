import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiService } from "../services/api";
import { ArrowLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const timeRangeOptions = [
  { label: "1 Month", value: 1 },
  { label: "3 Months", value: 3 },
  { label: "5 Months", value: 5 },
];

export const TrafficCongestion: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedRange, setSelectedRange] = useState(1);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [predictedData, setPredictedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [historical, predicted] = await Promise.all([
          apiService.getKPIHistoricalData("traffic", selectedRange),
          apiService.getKPIPredictedData("traffic", selectedRange),
        ]);

        setHistoricalData(historical || []);
        setPredictedData(predicted || []);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="shadow-sm border-b bg-[#BDE8F5]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/citizen")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Traffic Congestion Analysis
            </h1>
          </div>
          <span className="text-gray-600">Welcome, {user?.name}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Time Range</h3>
          <div className="flex space-x-2">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedRange(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRange === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Historical Graph */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">
                Current / Historical Traffic Levels
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Predicted Graph */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">
                Predicted / Forecast Traffic Levels
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};