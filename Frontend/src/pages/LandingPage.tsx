import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate(user.role === "government" ? "/government" : "/citizen");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
            <span className="text-xl">🏙️</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden md:block">
            City Urban Intel
          </h1>
          <h1 className="text-xl font-bold tracking-tight md:hidden">AUI</h1>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-bold transition-all"
          >
            <span className="text-lg">🔐</span>
            <span>Sign In</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <section className="relative h-screen flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Live: City Systems Operational
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-gray-900">
              Empowering Cities with{" "}
              <span className="text-blue-600">Real-Time</span> Intelligence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              A smart city planning platform that shows current living conditions, allows what-ifs simulations 
                  and predicts future city health, helping citizens and planners make informed descisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/login/citizen")}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
              >
                Explore Live Map
              </button>
              <button
                onClick={() => navigate("/login/government")}
                className="px-8 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                View Analytics
              </button>
            </div>
          </div>
        </section>

        {/* Main Portals */}
        <section className="px-6 lg:px-20 py-24" id="features">
          <div className="flex flex-col mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Access Your Portal
            </h2>
            <p className="text-gray-600 mt-2">
              Select the platform tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Citizen Portal */}
            <div className="group relative overflow-hidden rounded-3xl bg-blue-100 shadow-lg p-8 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 p-8 text-gray-100">
                <span className="text-8xl">👥</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl  flex items-center justify-center text-white mb-6">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Citizen Portal</h3>
                <p className="text-gray-600 mb-8 max-w-sm">
                  Check real-time air quality, track public transport, locate
                  available hospital beds, and report civic issues directly to
                  authorities.
                </p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Public Service Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-blue-600">✓</span>
                    <span>Real-time Health Monitoring</span>
                  </div>
                  <button 
                    onClick={() => navigate('/login/citizen')}
                    className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 border border-gray-200 text-white rounded-xl font-bold transition-all"
                  >
                    Enter Citizen Dashboard
                  </button>
                </div>
              </div>
            </div>

            {/* Government Portal */}
            <div className="group relative overflow-hidden rounded-3xl bg-blue-100 shadow-lg p-8 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 p-8 text-gray-100">
                <span className="text-8xl">🛡️</span>
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700 mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">Employee Portal</h3>
                <p className="text-gray-600 mb-8 max-w-sm">
                  Advanced analytics and command tools for city officials. Monitor resource deployment, departmental KPIs, and emergency response.
                </p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-blue-600">🔒</span>
                    <span>Secure Data Analytics</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-blue-600">🔒</span>
                    <span>Official Resource Deployment</span>
                  </div>
                  <button 
                    onClick={() => navigate('/login/government')}
                    className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg transition-all hover:bg-blue-700"
                  >
                    Admin Secure Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 px-6 lg:px-20 py-16">
        <div className="text-center">
          <p className="text-gray-600">Built for smart urban development and healthier cities.</p>
        </div>
      </footer>
    </div>
  );
};