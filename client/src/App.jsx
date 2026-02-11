import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Papers from './pages/Papers';
import NotFound from './pages/NotFound';
import GraphyFooterCTA from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GraphyFooterCTA/>
    </div>
  );
}

export default App;