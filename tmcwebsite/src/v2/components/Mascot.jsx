import './Mascot.css'

// Simple flat-vector "character" built from CSS blobs — a droplet, a sprout
// and a sun, each with a friendly face. Stands in for illustrated portrait
// art without needing raster assets.

function Face() {
  return (
    <div className="mascot-face">
      <span className="mascot-eye" />
      <span className="mascot-eye" />
      <span className="mascot-blush mascot-blush-l" />
      <span className="mascot-blush mascot-blush-r" />
      <span className="mascot-mouth" />
    </div>
  )
}

export default function Mascot({ variant = 'drip', size = 120, bob = true, className = '' }) {
  return (
    <div
      className={`mascot mascot-${variant} ${bob ? 'v2-bob' : ''} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {variant === 'sprout' && (
        <>
          <span className="mascot-leaf mascot-leaf-l" />
          <span className="mascot-leaf mascot-leaf-r" />
        </>
      )}
      {variant === 'ray' && (
        <span className="mascot-rays">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mascot-sun-ray" style={{ transform: `rotate(${i * 45}deg)` }} />
          ))}
        </span>
      )}
      <div className="mascot-body">
        <Face />
      </div>
    </div>
  )
}
