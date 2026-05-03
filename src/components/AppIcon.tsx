/**
 * PASTPORT App Icon Design
 * 
 * Concept: A stylized heritage dome (Taj Mahal inspired) enclosed within a location pin shape.
 * Style: Modern, minimal, slight 3D effect with gradients.
 * Colors: Deep Indigo/Violet base with Gold accents.
 * 
 * Usage: Can be used as a favicon, PWA icon, or exported to PNG.
 */

export function AppIcon({ size = 512 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      <defs>
        {/* Main Background Gradient */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo-600 */}
          <stop offset="100%" stopColor="#7C3AED" /> {/* Violet-600 */}
        </linearGradient>

        {/* Gold Accent Gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" /> {/* Amber-500 */}
          <stop offset="100%" stopColor="#D97706" /> {/* Amber-600 */}
        </linearGradient>

        {/* Dome Gradient */}
        <linearGradient id="domeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.8" />
        </linearGradient>

        {/* Subtle Inner Shadow/Depth */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset dx="2" dy="4" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>
      </defs>

      {/* Background Shape (Rounded Square for App Store) */}
      <rect width="512" height="512" rx="110" fill="url(#bgGradient)" />

      {/* Decorative Background Pattern (Subtle Geometric) */}
      <g opacity="0.1">
        <circle cx="256" cy="256" r="180" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="256" cy="256" r="140" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="256" cy="256" r="100" stroke="white" strokeWidth="2" fill="none" />
      </g>

      {/* Location Pin Outline Frame */}
      <path
        d="M256 80C179.7 80 117.5 142.2 117.5 218.5C117.5 321.5 256 440 256 440C256 440 394.5 321.5 394.5 218.5C394.5 142.2 332.3 80 256 80Z"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="12"
        opacity="0.3"
      />

      {/* Main Monument Silhouette (Stylized Dome) */}
      <g filter="url(#innerShadow)">
        {/* Main Dome */}
        <path
          d="M256 160C220 160 190 190 190 230V320H322V230C322 190 292 160 256 160Z"
          fill="url(#domeGradient)"
        />
        
        {/* Top Finial (The Crown) */}
        <circle cx="256" cy="155" r="12" fill="url(#goldGradient)" />
        <path d="M256 143L262 155H250L256 143Z" fill="url(#goldGradient)" />
        
        {/* Minarets (Side Towers) */}
        <rect x="165" y="260" width="20" height="60" rx="4" fill="url(#domeGradient)" />
        <rect x="327" y="260" width="20" height="60" rx="4" fill="url(#domeGradient)" />
        
        {/* Minaret Tops */}
        <path d="M165 260L175 240H185L175 260H165Z" fill="url(#domeGradient)" />
        <path d="M327 260L337 240H347L337 260H327Z" fill="url(#domeGradient)" />
      </g>

      {/* AR Scan Frame Elements (Futuristic Corners) */}
      <g stroke="url(#goldGradient)" strokeWidth="6" strokeLinecap="round">
        {/* Top Left */}
        <path d="M140 140V180H180" opacity="0.8" />
        {/* Top Right */}
        <path d="M372 140V180H332" opacity="0.8" />
        {/* Bottom Left */}
        <path d="M140 300V260H180" opacity="0.8" />
        {/* Bottom Right */}
        <path d="M372 300V260H332" opacity="0.8" />
      </g>

      {/* Central Scan Line (Animated feel) */}
      <rect x="180" y="220" width="152" height="4" rx="2" fill="url(#goldGradient)" opacity="0.6" />
      
      {/* Sparkle/Accent */}
      <path
        d="M380 120L385 130L395 135L385 140L380 150L375 140L365 135L375 130L380 120Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

/**
 * Alternative Icon Variation: Minimal Dome
 * Use this for smaller sizes (favicon, tab bar)
 */
export function AppIconMinimal({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="14" fill="#4F46E5" />
      <path
        d="M32 16C24 16 18 22 18 30V46H46V30C46 22 40 16 32 16Z"
        fill="white"
      />
      <circle cx="32" cy="14" r="3" fill="#F59E0B" />
      <rect x="12" y="46" width="40" height="6" rx="2" fill="#F59E0B" />
    </svg>
  );
}