import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, AlertCircle, MapPin, Newspaper, LogIn, UserPlus } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-6 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(264,80%,50%),hsl(212,100%,60%),hsl(327,80%,50%))] opacity-20 animate-gradient-rotate"></div>

      {/* Floating shapes */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl top-1/2 -right-64 animate-float delay-1000"></div>
        <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl bottom-0 left-1/4 animate-float delay-2000"></div>
      </div>

      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-text-pulse">
            Travel Safe Beacon
          </h1>
          <p className="text-slate-300/80 text-lg font-light">Your centralized safety management platform</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            to="/sos"
            icon={<AlertCircle className="w-8 h-8" />}
            title="Emergency SOS"
            description="Immediate crisis response system"
            color="from-red-500/20 to-red-600/40"
          />

          <DashboardCard
            to="/nearby"
            icon={<MapPin className="w-8 h-8" />}
            title="Nearby Services"
            description="Locate emergency services"
            color="from-blue-500/20 to-blue-600/40"
          />

          <DashboardCard
            to="/news"
            icon={<Newspaper className="w-8 h-8" />}
            title="Safety News"
            description="Local updates & alerts"
            color="from-emerald-500/20 to-emerald-600/40"
          />

          <DashboardCard
            to="/login"
            icon={<LogIn className="w-8 h-8" />}
            title="Account Login"
            description="Access your secure portal"
            color="from-purple-500/20 to-purple-600/40"
          />

          <DashboardCard
            to="/register"
            icon={<UserPlus className="w-8 h-8" />}
            title="New Registration"
            description="Create your account"
            color="from-amber-500/20 to-amber-600/40"
          />



<DashboardCard
  to="/location"
  icon={<MapPin className="w-8 h-8" />}
  title="Live Location Tracking"
  description="Real-time GPS positioning system"
  color="from-cyan-500/20 to-cyan-600/40"
/>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes text-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-gradient-rotate {
          animation: gradient-rotate 20s linear infinite;
        }

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-text-pulse {
          animation: text-pulse 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

const DashboardCard = ({ to, icon, title, description, color }) => (
  <Link
    to={to}
    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${color} backdrop-blur-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-white/20`}
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
      </div>
      <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white/80 mt-1 transition-colors" />
    </div>
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(200px_circle_at_var(--x)_var(--y),hsl(0_0%_100%/0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
  </Link>
);

export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import { ChevronRight, AlertCircle, MapPin, Newspaper, LogIn, UserPlus } from "lucide-react";

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-slate-900 relative overflow-hidden isolate">
//       {/* Particle background */}
//       <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+')] animate-gradient-pan"></div>
//       </div>

//       {/* Floating grid */}
//       <div className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,0.8))]">
//         <div className="h-[200vh] w-[200vw] absolute -top-1/2 -left-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [animation:gridMove_20s_linear_infinite]"></div>
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 mx-auto max-w-7xl p-6">
//         <header className="mb-20 text-center space-y-6">
//           <h1 className="text-6xl font-bold bg-[linear-gradient(120deg,hsl(196,88%,70%),hsl(276,73%,70%)] bg-clip-text text-transparent mb-4 animate-title-float">
//             Community <span className="bg-[linear-gradient(120deg,hsl(339,89%,60%),hsl(28,85%,60%)] bg-clip-text">Guardian</span>
//           </h1>
//           <p className="text-slate-300/80 text-xl font-light max-w-2xl mx-auto">
//             Next-generation community safety platform with AI-powered threat detection and real-time response systems
//           </p>
//         </header>

//         {/* Holographic cards grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cards.map((card, index) => (
//             <DashboardCard
//               key={card.title}
//               {...card}
//               index={index}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Global styles */}
//       <style jsx global>{`
//         @keyframes gridMove {
//           from { transform: translate(0,0); }
//           to { transform: translate(-40px,40px); }
//         }

//         @keyframes gradient-pan {
//           from { background-position: 0% 0%; }
//           to { background-position: 200% 200%; }
//         }

//         @keyframes title-float {
//           0%, 100% { transform: translateY(0) rotate(0deg); text-shadow: 0 0 20px rgba(255,255,255,0.1); }
//           50% { transform: translateY(-8px) rotate(2deg); text-shadow: 0 8px 30px rgba(255,255,255,0.3); }
//         }

//         @keyframes card-entrance {
//           from { opacity: 0; transform: translateY(20px) scale(0.95); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .animate-title-float {
//           animation: title-float 8s ease-in-out infinite;
//         }

//         .animate-card-entrance {
//           animation: card-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// const cards = [
//   {
//     to: "/sos",
//     icon: <AlertCircle className="w-8 h-8" />,
//     title: "Emergency Response",
//     description: "Instant crisis management system with biometric authentication",
//     color: "from-red-500/10 via-rose-900/30 to-red-900/10",
//     delay: 0.1
//   },
//   {
//     to: "/nearby",
//     icon: <MapPin className="w-8 h-8" />,
//     title: "Safety Network",
//     description: "Real-time emergency service mapping with AI routing",
//     color: "from-blue-500/10 via-indigo-900/30 to-blue-900/10",
//     delay: 0.2
//   },
//   {
//     to: "/news",
//     icon: <Newspaper className="w-8 h-8" />,
//     title: "Threat Intelligence",
//     description: "Live security updates and predictive analytics",
//     color: "from-emerald-500/10 via-teal-900/30 to-emerald-900/10",
//     delay: 0.3
//   },
//   {
//     to: "/login",
//     icon: <LogIn className="w-8 h-8" />,
//     title: "Secure Access",
//     description: "Multi-factor authenticated portal with activity monitoring",
//     color: "from-purple-500/10 via-violet-900/30 to-purple-900/10",
//     delay: 0.4
//   },
//   {
//     to: "/register",
//     icon: <UserPlus className="w-8 h-8" />,
//     title: "Identity Vault",
//     description: "Blockchain-based citizen registration system",
//     color: "from-amber-500/10 via-orange-900/30 to-amber-900/10",
//     delay: 0.5
//   },
//   {
//     to: "/location",
//     icon: <MapPin className="w-8 h-8" />,
//     title: "Geo Tracking",
//     description: "Military-grade location tracking with privacy shields",
//     color: "from-cyan-500/10 via-sky-900/30 to-cyan-900/10",
//     delay: 0.6
//   }
// ];

// const DashboardCard = ({ to, icon, title, description, color, index }) => (
//   <Link
//     to={to}
//     className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b ${color} backdrop-blur-2xl p-8 transition-all duration-500 hover:border-white/20 hover:-translate-y-2`}
//     style={{
//       opacity: 0,
//       animation: `card-entrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards`
//     }}
//   >
//     <div className="relative z-10 space-y-6">
//       <div className="flex items-center gap-4">
//         <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors">
//           {React.cloneElement(icon, { className: "w-8 h-8 text-white/80 group-hover:text-white" })}
//         </div>
//         <h3 className="text-2xl font-bold bg-[linear-gradient(120deg,#fff,#aaa)] bg-clip-text text-transparent">{title}</h3>
//       </div>
//       <p className="text-slate-300/80 text-sm leading-relaxed font-light">{description}</p>
//       <div className="flex items-center justify-between mt-6">
//         <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
//           Access System →
//         </span>
//       </div>
//     </div>
    
//     {/* Holographic effect */}
//     <div className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-30 transition-opacity">
//       <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#fff0_0deg,#fff_30deg,#fff0_180deg)] animate-holo-spin mix-blend-plus-lighter" />
//     </div>
//   </Link>
// );

// export default Home;