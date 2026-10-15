const LoginBackground = () => {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1024 576"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gradient for left wide diagonal ribbon */}
                    <linearGradient
                        id="login-bg-band"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--theme-brand-active)"
                            stopOpacity="0.08"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--theme-brand-active)"
                            stopOpacity="0.17"
                        />
                    </linearGradient>

                    {/* Gradient for left large circle */}
                    <linearGradient
                        id="login-bg-circle"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--theme-brand-active)"
                            stopOpacity="0.16"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--theme-brand-active)"
                            stopOpacity="0.06"
                        />
                    </linearGradient>
                </defs>

                {/* 1. TOP LEFT: 4x4 DOT GRID */}
                <g fill="var(--theme-brand-active)" fillOpacity="0.65">
                    {[24, 45, 66, 87].map((y) =>
                        [74, 93, 111, 130].map((x) => (
                            <circle key={`tl-${x}-${y}`} cx={x} cy={y} r="2.5" />
                        ))
                    )}
                </g>

                {/* 2. TOP LEFT: LONG DIAGONAL LINE */}
                <line
                    x1="0"
                    y1="56"
                    x2="172"
                    y2="228"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                />

                {/* 3. LEFT: ACCENT DIAGONAL LINE */}
                <line
                    x1="52"
                    y1="250"
                    x2="115"
                    y2="313"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="2"
                    strokeOpacity="0.8"
                    strokeLinecap="round"
                />

                {/* 4. LEFT: LARGE TRANSLUCENT CIRCLE */}
                <circle
                    cx="296"
                    cy="212"
                    r="169"
                    fill="url(#login-bg-circle)"
                />

                {/* 5. LEFT: WIDE DIAGONAL CAPSULE RIBBON */}
                <line
                    x1="-50"
                    y1="114"
                    x2="258"
                    y2="422"
                    stroke="url(#login-bg-band)"
                    strokeWidth="85"
                    strokeLinecap="round"
                />

                {/* 6. BOTTOM LEFT: SMALL SOLID SQUARE */}
                <rect
                    x="151"
                    y="406"
                    width="16"
                    height="17"
                    rx="1"
                    fill="var(--theme-brand-active)"
                    fillOpacity="0.35"
                />

                {/* 7. BOTTOM LEFT: CONCENTRIC CIRCLE SECTOR & ARCS */}
                {/* Filled circle disk */}
                <circle
                    cx="89"
                    cy="576"
                    r="147"
                    fill="var(--theme-brand-active)"
                    fillOpacity="0.10"
                />
                {/* Soft border arc */}
                <circle
                    cx="89"
                    cy="576"
                    r="135"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="24"
                    strokeOpacity="0.10"
                />
                {/* Outer thin arc */}
                <circle
                    cx="89"
                    cy="576"
                    r="168"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.2"
                    strokeOpacity="0.3"
                />

                {/* 8. BOTTOM LEFT: ACCENT DIAGONAL LINE */}
                <line
                    x1="277"
                    y1="527"
                    x2="324"
                    y2="575"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.5"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                />

                {/* 9. TOP RIGHT: DIAGONAL LINE */}
                <line
                    x1="734"
                    y1="155"
                    x2="845"
                    y2="48"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    strokeLinecap="round"
                />

                {/* 10. TOP RIGHT: CONCENTRIC RINGS / ARCS */}
                {/* Wide translucent ring */}
                <circle
                    cx="981"
                    cy="90"
                    r="188"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="44"
                    strokeOpacity="0.10"
                />
                {/* Outer thin stroke */}
                <circle
                    cx="981"
                    cy="90"
                    r="210"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.2"
                    strokeOpacity="0.35"
                />
                {/* Inner thin stroke */}
                <circle
                    cx="981"
                    cy="90"
                    r="166"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.2"
                    strokeOpacity="0.35"
                />

                {/* 11. RIGHT: OUTLINED DIAMOND */}
                <polygon
                    points="863,194 876,207 863,220 850,207"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.8"
                    strokeOpacity="0.75"
                    fill="none"
                />

                {/* 12. RIGHT: SWEEPING CURVED ORBITS */}
                <path
                    d="M 1084 94 A 201 201 0 0 0 1084 496"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                    fill="none"
                />
                <path
                    d="M 1084 65 A 230 230 0 0 0 1084 525"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                    fill="none"
                />

                {/* 13. RIGHT: SMALL SOLID SQUARE */}
                <rect
                    x="980"
                    y="368"
                    width="17"
                    height="16"
                    rx="1"
                    fill="var(--theme-brand-active)"
                    fillOpacity="0.35"
                />

                {/* 14. BOTTOM RIGHT: ACCENT DIAGONAL LINE */}
                <line
                    x1="676"
                    y1="406"
                    x2="748"
                    y2="478"
                    stroke="var(--theme-brand-active)"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    strokeLinecap="round"
                />

                {/* 15. BOTTOM RIGHT: 4x4 DOT GRID */}
                <g fill="var(--theme-brand-active)" fillOpacity="0.65">
                    {[472, 494, 516, 538].map((y) =>
                        [875, 895, 915, 935].map((x) => (
                            <circle key={`br-${x}-${y}`} cx={x} cy={y} r="2.5" />
                        ))
                    )}
                </g>
            </svg>
        </div>
    );
};

export default LoginBackground;
