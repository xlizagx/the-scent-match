import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import KnownFragrance from './pages/KnownFragrance';
import PremiumQuiz from './pages/PremiumQuiz';
import Support from './pages/Support';

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/match" element={<KnownFragrance />} />
            <Route path="/quiz" element={<PremiumQuiz />} />
            <Route path="/support" element={<Support />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App