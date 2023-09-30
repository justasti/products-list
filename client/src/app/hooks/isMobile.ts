import { useLayoutEffect, useState } from 'react'

const isMobileWidth = (): boolean => {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width
  return width < 600
}

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(isMobileWidth())
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    return (): void => window.removeEventListener('resize', updateSize)
  }, [])
  return isMobile
}
