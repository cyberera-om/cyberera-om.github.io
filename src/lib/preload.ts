export type PreloadOptions = {
  /**
   * Max time to wait before resolving (prevents the loader from getting stuck).
   * If omitted, waits for all images to load/error.
   */
  timeoutMs?: number
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()

    const done = () => {
      img.onload = null
      img.onerror = null
      resolve()
    }

    img.onload = done
    img.onerror = done
    img.decoding = 'async'
    img.src = src

    // If the image is already cached, onload may not fire reliably in some browsers.
    // `complete` is a pragmatic extra signal.
    if (img.complete) {
      done()
    }
  })
}

export async function preloadImages(sources: readonly string[], options?: PreloadOptions): Promise<void> {
  const unique = Array.from(new Set(sources)).filter(Boolean)
  if (unique.length === 0) return

  const all = Promise.allSettled(unique.map(preloadImage)).then(() => undefined)

  const timeoutMs = options?.timeoutMs
  if (!timeoutMs || timeoutMs <= 0) {
    await all
    return
  }

  await Promise.race([
    all,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, timeoutMs)
    }),
  ])
}
