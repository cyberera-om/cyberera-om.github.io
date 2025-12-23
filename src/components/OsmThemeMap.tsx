import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import {
  Copy,
  Crosshair,
  ExternalLink,
  Navigation,
  Route,
  X,
} from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useTheme } from '../lib/theme'
import { cn } from '../lib/utils'

const DEFAULT_DESTINATION: [number, number] = [23.587068, 58.362969]

type RouteSummary = {
  distanceMeters: number
  durationSeconds: number
}

function formatDistance(meters: number) {
  if (!Number.isFinite(meters)) return ''
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) return ''
  const mins = Math.round(seconds / 60)
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

export function OsmThemeMap({
  className,
  center = DEFAULT_DESTINATION,
  zoom = 15,
}: {
  className?: string
  center?: [number, number]
  zoom?: number
}) {
  const { theme } = useTheme()
  const { t, dir } = useI18n()
  const isLightTheme = theme === 'light'

  const [status, setStatus] = useState<string | null>(null)
  const [route, setRoute] = useState<RouteSummary | null>(null)
  const [busy, setBusy] = useState(false)

  const hostRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const tileRef = useRef<L.TileLayer | null>(null)
  const markerRef = useRef<L.CircleMarker | null>(null)
  const haloRef = useRef<L.Circle | null>(null)
  const userRef = useRef<L.CircleMarker | null>(null)
  const routeRef = useRef<L.Polyline | null>(null)
  const userPosRef = useRef<L.LatLngLiteral | null>(null)

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

      // Controls
      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map)

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

    if (haloRef.current) {
      haloRef.current.remove()
      haloRef.current = null
    }

    const color = theme === 'light' ? '#f97316' : '#fb923c'

    // Soft halo around destination
    haloRef.current = L.circle(center, {
      radius: 160,
      color,
      weight: 1,
      opacity: 0.35,
      fillColor: color,
      fillOpacity: 0.08,
    }).addTo(map)

    markerRef.current = L.circleMarker(center, {
      radius: 8,
      color,
      weight: 2,
      fillColor: color,
      fillOpacity: 0.9,
    })
      .addTo(map)

    markerRef.current.bindPopup(
      `<strong>CYRA</strong><br/>${center[0].toFixed(6)}, ${center[1].toFixed(6)}`,
    )

    // Update existing route color on theme change
    if (routeRef.current) {
      routeRef.current.setStyle({
        color: isLightTheme ? '#0f172a' : '#fb923c',
        opacity: isLightTheme ? 0.85 : 0.9,
      })
    }

    // Update user marker stroke for theme
    if (userRef.current) {
      userRef.current.setStyle({
        color: isLightTheme ? '#0f172a' : '#e2e8f0',
        fillColor: isLightTheme ? '#38bdf8' : '#38bdf8',
      })
    }
  }, [center, theme, tiles.attribution, tiles.url, zoom])

  const destination = useMemo<L.LatLngLiteral>(() => ({ lat: center[0], lng: center[1] }), [center])

  const setTransientStatus = useCallback((msg: string) => {
    setStatus(msg)
    window.setTimeout(() => setStatus(null), 1600)
  }, [])

  const ensureUserLocation = useCallback(async (): Promise<L.LatLngLiteral | null> => {
    if (userPosRef.current) return userPosRef.current
    if (!('geolocation' in navigator)) {
      setTransientStatus(t('map.geoUnsupported'))
      return null
    }

    setBusy(true)
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 15_000,
        })
      })

      const user: L.LatLngLiteral = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      userPosRef.current = user

      const map = mapRef.current
      if (map) {
        if (userRef.current) {
          userRef.current.remove()
          userRef.current = null
        }

        userRef.current = L.circleMarker(user, {
          radius: 7,
          weight: 2,
          color: isLightTheme ? '#0f172a' : '#e2e8f0',
          fillColor: '#38bdf8',
          fillOpacity: 0.95,
        })
          .addTo(map)
          .bindPopup(`<strong>${t('map.you')}</strong>`) // safe (no user input)

        const bounds = L.latLngBounds([user, destination])
        map.fitBounds(bounds.pad(0.2))
      }

      return user
    } catch {
      setTransientStatus(t('map.geoDenied'))
      return null
    } finally {
      setBusy(false)
    }
  }, [destination, isLightTheme, setTransientStatus, t])

  const onLocate = useCallback(async () => {
    await ensureUserLocation()
  }, [ensureUserLocation])

  const clearRoute = useCallback(() => {
    const map = mapRef.current
    if (map && routeRef.current) {
      routeRef.current.remove()
      routeRef.current = null
    }
    setRoute(null)
  }, [])

  const onCopy = useCallback(async () => {
    const text = `${destination.lat.toFixed(6)}, ${destination.lng.toFixed(6)}`
    try {
      await navigator.clipboard.writeText(text)
      setTransientStatus(t('map.copied'))
    } catch {
      // Fallback: no clipboard permission
      setTransientStatus(text)
    }
  }, [destination.lat, destination.lng, setTransientStatus, t])

  const openExternalDirections = useCallback(async () => {
    const user = userPosRef.current
    const params = new URLSearchParams({
      api: '1',
      destination: `${destination.lat},${destination.lng}`,
    })
    if (user) params.set('origin', `${user.lat},${user.lng}`)
    window.open(`https://www.google.com/maps/dir/?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }, [destination.lat, destination.lng])

  const onRoute = useCallback(async () => {
    const user = await ensureUserLocation()
    if (!user) return

    setBusy(true)
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${user.lng},${user.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&steps=false`
      const res = await fetch(url)
      if (!res.ok) throw new Error('route failed')
      const data = (await res.json()) as any
      const r = data?.routes?.[0]
      if (!r?.geometry?.coordinates?.length) throw new Error('no route')

      const coords: [number, number][] = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]])

      const map = mapRef.current
      if (map) {
        if (routeRef.current) {
          routeRef.current.remove()
          routeRef.current = null
        }

        routeRef.current = L.polyline(coords, {
          color: isLightTheme ? '#0f172a' : '#fb923c',
          weight: 4,
          opacity: isLightTheme ? 0.85 : 0.9,
        }).addTo(map)

        const bounds = L.latLngBounds([user, destination])
        map.fitBounds(bounds.pad(0.18))
      }

      setRoute({ distanceMeters: r.distance, durationSeconds: r.duration })
    } catch {
      setTransientStatus(t('map.routeFailed'))
    } finally {
      setBusy(false)
    }
  }, [destination, ensureUserLocation, isLightTheme, setTransientStatus, t])

  const onReset = useCallback(() => {
    const map = mapRef.current
    if (!map) return
    clearRoute()
    map.setView(center, zoom)
  }, [center, clearRoute, zoom])

  return (
    <div className={cn('relative', className)}>
      <div ref={hostRef} className="absolute inset-0" />

      {/* Floating controls */}
      <div
        className={cn(
          'pointer-events-none absolute top-3 z-[500] flex w-full px-3',
          dir === 'rtl' ? 'justify-start' : 'justify-end',
        )}
      >
        <div className="pointer-events-auto glass rounded-2xl border border-white/10 bg-ink-950/60 backdrop-blur-xl px-2 py-2 shadow-glow">
          <div className={cn('flex items-center gap-1', dir === 'rtl' ? 'flex-row-reverse' : undefined)}>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ink-50"
              aria-label={t('map.locateMe')}
              onClick={onLocate}
              disabled={busy}
            >
              <Crosshair className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ink-50"
              aria-label={t('map.directions')}
              onClick={onRoute}
              disabled={busy}
            >
              <Route className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ink-50"
              aria-label={t('map.openExternal')}
              onClick={openExternalDirections}
            >
              <Navigation className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ink-50"
              aria-label={t('map.copyCoords')}
              onClick={onCopy}
            >
              <Copy className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ink-50"
              aria-label={t('map.reset')}
              onClick={onReset}
            >
              <ExternalLink className="h-4 w-4" />
            </button>

            {route ? (
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-ink-50"
                aria-label={t('map.clearRoute')}
                onClick={clearRoute}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {(route || status) ? (
            <div className={cn('mt-2 px-1 text-[11px] text-ink-200', dir === 'rtl' ? 'text-right' : undefined)}>
              {status ? (
                <div>{status}</div>
              ) : route ? (
                <div>
                  {t('map.routeSummary')}: {formatDistance(route.distanceMeters)} • {formatDuration(route.durationSeconds)}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
