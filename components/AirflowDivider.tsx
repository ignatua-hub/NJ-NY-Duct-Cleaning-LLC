export default function AirflowDivider() {
  return (
    <div className="airflow-divider mx-auto max-w-5xl px-4" aria-hidden="true">
      <svg viewBox="0 0 800 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 24 C 80 8, 160 40, 240 24 S 400 8, 480 24 S 640 40, 800 24"
          stroke="url(#waveGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M0 32 C 100 16, 180 44, 280 28 S 460 12, 560 30 S 700 44, 800 28"
          stroke="url(#waveGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="800" y2="0">
            <stop stopColor="#29B6FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#1E90FF" stopOpacity="1" />
            <stop offset="1" stopColor="#0A5BFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
