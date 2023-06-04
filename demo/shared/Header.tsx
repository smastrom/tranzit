import { useStore } from '../store'
import type { Hide, Duration } from '../store/types'

const durationOptions: Duration[] = ['Component Default', 100, 300, 500, 700, 1000, 1500, 2000]
const hideOptions: Hide[] = ['unmount', 'keep', 'hide']

export function Header() {
   const {
      reverse,
      customOrigin,
      hideType,
      duration,
      toggleReverse,
      toggleCustomOrigin,
      setHideType,
      setDuration
   } = useStore()

   return (
      <header className="Header_container">
         <div className="Header_top">
            <div className="Header_top-title">
               <h1>Tranzit</h1>
               <a
                  href="https://github.com/smastrom/tranzit"
                  aria-label="Visit GitHub repo"
                  target="_blank"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 23.408"
                     aria-hidden="true"
                     className="Github_icon"
                  >
                     <path d="M12,0A12,12,0,0,0,8.207,23.387c.6.111.793-.261.793-.577V20.576C5.662,21.3,4.967,19.16,4.967,19.16A3.178,3.178,0,0,0,3.634,17.4c-1.089-.745.083-.729.083-.729a2.519,2.519,0,0,1,1.839,1.237,2.554,2.554,0,0,0,3.492,1,2.546,2.546,0,0,1,.762-1.6C7.145,17,4.343,15.971,4.343,11.374A4.644,4.644,0,0,1,5.579,8.153,4.316,4.316,0,0,1,5.7,4.977S6.7,4.655,9,6.207a11.374,11.374,0,0,1,6.009,0c2.291-1.552,3.3-1.23,3.3-1.23a4.312,4.312,0,0,1,.118,3.176,4.632,4.632,0,0,1,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921A2.868,2.868,0,0,1,15,19.517V22.81c0,.319.192.694.8.576A12,12,0,0,0,12,0Z"></path>
                  </svg>
               </a>
            </div>
            <p>1KB dead simple React conditional animations.</p>
         </div>

         <nav className="Header_nav">
            <div role="group" aria-labelledby="checkbox_label">
               <div id="checkbox_label" className="Header_label">
                  Behavior
               </div>
               <div className="Header_nav-checkbox-container">
                  <div className="Header_nav-field">
                     <input
                        type="checkbox"
                        id="reverse"
                        checked={reverse}
                        onChange={toggleReverse}
                     />
                     <label htmlFor="reverse">Reverse on Leave</label>
                  </div>

                  <div className="Header_nav-field ">
                     <input
                        type="checkbox"
                        id="custom_origin"
                        checked={customOrigin !== null}
                        onChange={toggleCustomOrigin}
                     />
                     <label htmlFor="custom_origin">Set random origin</label>
                  </div>
               </div>
            </div>

            <div>
               <label htmlFor="duration" className="Header_label">
                  Entrance Duration
               </label>
               <select
                  value={duration}
                  onChange={(e) =>
                     setDuration(
                        e.target.value === 'Component Default'
                           ? e.target.value
                           : (+e.target.value as Duration)
                     )
                  }
               >
                  {durationOptions.map((duration) => (
                     <option key={duration} value={duration}>
                        {typeof duration === 'number' ? duration + 'ms' : duration}
                     </option>
                  ))}
               </select>
            </div>

            <div role="radiogroup" aria-labelledby="radios_label">
               <div id="radios_label" className="Header_label">
                  Leave Type
               </div>
               <div className="Header_nav-radios-container">
                  {hideOptions.map((type) => (
                     <div key={type} className="Header_nav-field Header_radio-field">
                        <input
                           type="radio"
                           id={type}
                           name="hide"
                           value={type}
                           checked={hideType === type}
                           onChange={(e) => setHideType(e.target.value as Hide)}
                        />
                        <label htmlFor={type}>
                           {type === 'hide'
                              ? 'hide (display: none)'
                              : type === 'keep'
                              ? 'keep (visibility: hidden)'
                              : 'Unmount'}
                        </label>
                     </div>
                  ))}
               </div>
            </div>
         </nav>
      </header>
   )
}
