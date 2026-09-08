import { useState } from 'react'
import KOT from './components/KOT'

function App() {
  const [page, setPage] = useState('dashboard')

 if (page === 'kot') {
  return <KOT goBack={() => setPage('dashboard')} />
}

  return (
    <div>
      <h1>Aagan Bhancha Ghar</h1>
      <p>Restaurant Management System</p>

      <button onClick={() => setPage('kot')}>
        New KOT
      </button>

      <button>
        Purchases
      </button>

      <button>
        Expenses
      </button>

      <button>
        Reports
      </button>
    </div>
  )
}

export default App