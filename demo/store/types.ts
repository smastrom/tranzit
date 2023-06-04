export type Hide = 'keep' | 'unmount' | 'hide'

export type Duration = 'Component Default' | 100 | 300 | 500 | 700 | 1000 | 1500 | 2000

export interface IStore {
   reverse: boolean
   customOrigin: { startX: number; startY: number } | null
   hideType?: Hide
   duration: Duration
   lastPlayed: string
   toggleReverse: () => void
   toggleCustomOrigin: () => void
   setHideType: (type: Hide) => void
   setDuration: (duration: Duration) => void
   setLastPlayed: (lastPlayed: string) => void
}
