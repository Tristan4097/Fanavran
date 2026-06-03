export default function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,155,140,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#009B8C" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Large concentric arc - top right */}
      <svg
        className="absolute -top-20 -right-20 w-[500px] md:w-[600px] h-[500px] md:h-[600px] opacity-[0.12] animate-spin-slow"
        viewBox="0 0 600 600"
        fill="none"
      >
        <path
          d="M 300 50 A 250 250 0 1 1 50 300"
          stroke="#009B8C"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 300 100 A 200 200 0 1 1 100 300"
          stroke="#009B8C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Medium full circle - bottom left */}
      <svg
        className="absolute -bottom-10 -left-10 w-[250px] md:w-[300px] h-[250px] md:h-[300px] opacity-[0.08] animate-spin-slower"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="130" stroke="#00B8A8" strokeWidth="1" />
        <circle cx="150" cy="150" r="100" stroke="#00B8A8" strokeWidth="1" />
        <circle cx="150" cy="150" r="70" stroke="#00B8A8" strokeWidth="1" />
      </svg>

      {/* Small dotted arc - mid right */}
      <svg
        className="absolute top-1/2 right-[10%] w-[120px] md:w-[150px] h-[120px] md:h-[150px] opacity-[0.15]"
        viewBox="0 0 150 150"
        fill="none"
        style={{ animation: 'spin 60s linear infinite' }}
      >
        <path
          d="M 75 10 A 65 65 0 0 1 140 75"
          stroke="#009B8C"
          strokeWidth="1"
          fill="none"
          strokeDasharray="8 6"
        />
        <path
          d="M 75 30 A 45 45 0 0 1 120 75"
          stroke="#009B8C"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Horizontal tech line with traveling dot */}
      <div className="absolute top-[60%] left-[5%] w-[250px] md:w-[400px] opacity-[0.06]">
        <div className="relative h-[1px] bg-[#009B8C]">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#009B8C] animate-travel-dot"
          />
        </div>
      </div>

      {/* Additional floating circles for depth */}
      <div
        className="absolute top-[20%] left-[15%] w-3 h-3 rounded-full bg-[#009B8C] opacity-[0.08] animate-pulse-subtle"
      />
      <div
        className="absolute top-[70%] right-[20%] w-2 h-2 rounded-full bg-[#00B8A8] opacity-[0.1] animate-pulse-subtle"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute bottom-[25%] left-[40%] w-4 h-4 rounded-full border border-[#009B8C] opacity-[0.06] animate-pulse-subtle"
        style={{ animationDelay: '6s' }}
      />
    </div>
  );
}
