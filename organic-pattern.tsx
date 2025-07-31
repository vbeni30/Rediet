export function OrganicPattern({ className = "", opacity = 0.1 }: { className?: string; opacity?: number }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <path
        d="M50 80C80 60 120 40 180 60C240 80 280 100 320 80C360 60 380 40 390 20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 120C60 100 100 80 160 100C220 120 260 140 300 120C340 100 370 80 390 60"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M10 160C50 140 90 120 150 140C210 160 250 180 290 160C330 140 360 120 380 100"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M30 200C70 180 110 160 170 180C230 200 270 220 310 200C350 180 380 160 400 140"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M5 240C45 220 85 200 145 220C205 240 245 260 285 240C325 220 355 200 375 180"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
