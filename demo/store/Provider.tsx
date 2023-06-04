import { useState, type ReactNode } from 'react'
import { StoreContext } from '.'
import type { IStore } from './types'

export function StoreProvider({ children }: { children: ReactNode }) {
   const [settings, setSettings] = useState<
      Pick<IStore, 'reverse' | 'customOrigin' | 'hideType' | 'duration' | 'lastPlayed'>
   >({
      reverse: false,
      customOrigin: null,
      hideType: 'unmount',
      duration: 'Component Default',
      lastPlayed: 'Fade'
   })

   return (
      <StoreContext.Provider
         value={{
            reverse: settings.reverse,
            customOrigin: settings.customOrigin,
            hideType: settings.hideType,
            duration: settings.duration,
            lastPlayed: settings.lastPlayed,
            toggleReverse: () => {
               setSettings((prev) => ({ ...prev, reverse: !prev.reverse }))
            },
            toggleCustomOrigin: () =>
               setSettings((prev) => ({
                  ...prev,
                  customOrigin: prev.customOrigin === null ? getRandomOrigin() : null
               })),
            setHideType: (type) => setSettings((prev) => ({ ...prev, hideType: type })),
            setDuration: (duration) => setSettings((prev) => ({ ...prev, duration })),
            setLastPlayed: (lastPlayed) => setSettings((prev) => ({ ...prev, lastPlayed }))
         }}
      >
         {children}
      </StoreContext.Provider>
   )
}

const randomOrigins = [100, 200, 300, 400]

function getRandomOrigin() {
   const value = randomOrigins[Math.floor(Math.random() * randomOrigins.length)]
   const signedValue = Math.random() > 0.5 ? value : -value

   return Math.random() > 0.5
      ? { startX: signedValue, startY: 0 }
      : { startX: 0, startY: signedValue }
}
