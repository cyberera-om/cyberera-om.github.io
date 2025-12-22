import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import { useTheme } from '../lib/theme'

export function OsmThemeMap({
  className,
  center = [23.588, 58.3829],
  zoom = 12,
}: {
  className?: string
  center?: [number, number]
  zoom?: number
}) {
  const { theme } = useTheme()

  const hostRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const tileRef = useRef<L.TileLayer | null>(null)
  const markerRef = useRef<L.CircleMarker | null>(null)

  // Light: OpenStreetMap Standard
  // Dark: CartoDB Dark Matter (OSM-based)
  const tiles = useMemo(() => {
    return theme === 'light'
      ? {
          url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      : {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
  }, [theme])

  useEffect(() => {
    if (!hostRef.current) return

    // Create once.
    if (!mapRef.current) {
      const map = L.map(hostRef.current, {
        center,
        zoom,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })

      mapRef.current = map
    }

    return () => {
      // Full cleanup on unmount
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        tileRef.current = null
        markerRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    map.setView(center, zoom)

    // Swap tiles on theme change.
    if (tileRef.current) {
      tileRef.current.remove()
      tileRef.current = null
    }

    tileRef.current = L.tileLayer(tiles.url, {
      attribution: tiles.attribution,
      // Enable subdomains for CARTO tiles, harmless for OSM standard.
      subdomains: ['a', 'b', 'c', 'd'],
      maxZoom: 19,
    }).addTo(map)

    // Marker (no external icon assets).
    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }

    const color = theme === 'light' ? '#f97316' : '#fb923c'
    markerRef.current = L.circleMarker(center, {
      radius: 8,
      color,
      weight: 2,
      fillColor: color,
      fillOpacity: 0.9,
    })
      .addTo(map)
      .bindPopup('<strong>Muscat, Oman</strong>')
  }, [center, theme, tiles.attribution, tiles.url, zoom])

  return <div ref={hostRef} className={className} />
}
