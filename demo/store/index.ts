import { createContext, useContext } from 'react'
import type { IStore } from './types'

const storeDefaults: IStore = {
   reverse: false,
   customOrigin: null,
   duration: 'Component Default',
   hideType: 'unmount',
   lastPlayed: 'Fade',
   toggleReverse: () => {},
   toggleCustomOrigin: () => {},
   setHideType: () => {},
   setDuration: () => {},
   setLastPlayed: () => {}
}

export const StoreContext = createContext<IStore>(storeDefaults)

export function useStore() {
   return useContext(StoreContext)
}
