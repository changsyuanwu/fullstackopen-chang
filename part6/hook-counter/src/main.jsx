import ReactDOM from 'react-dom/client'
import App from './App'
import { CounterContextProvider } from './counterContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
)
