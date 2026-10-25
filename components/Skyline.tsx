type SkylineProps = {
  className?: string;
  opacity?: number;
};

/** Faint NJ / NYC skyline silhouette for hero and footer backgrounds. */
export default function Skyline({ className = "", opacity = 0.12 }: SkylineProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      style={{ opacity }}
    >
      <path
        fill="#1E90FF"
        d="M0 220V148h28v-36h18v36h22V96h14v24h12V72h20v76h18V120h16v28h10V88h22v60h14V110h18v38h12V64h10v24h8V48h16v100h20V92h14v56h18V128h22v20h16V84h12v64h10V100h20v48h14V76h18v72h22V112h16v36h28V68h14v80h20V120h18v28h24V96h16v52h20V140h14v20h40V88h18v60h16V104h22v44h14V72h20v76h18V128h16v20h28V96h14v52h20V110h18v38h24V84h16v64h20V120h14v28h32V64h18v84h22V100h16v48h20V128h14v20h40v22H0z"
      />
      <path
        fill="#29B6FF"
        opacity="0.35"
        d="M80 220V160h12v-20h8v20h16V140h10v40h14V150h8v30h20V132h12v48h18V156h10v24h22V128h14v52h16V148h12v32h24V136h10v44h18V152h14v28h20V140h12v40h16V160h10v20h30v40H80z"
      />
    </svg>
  );
}
