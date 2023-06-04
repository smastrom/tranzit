import { StoreProvider } from './store/Provider'
import { Header } from './shared/Header'
import { CodeBlock } from './shared/CodeBlock'
import { ExamplesGrid } from './shared/ExamplesGrid'

export function App() {
   return (
      <StoreProvider>
         <Header />
         <CodeBlock />
         <ExamplesGrid />
      </StoreProvider>
   )
}
