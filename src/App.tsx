import { Routes, Route, HashRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Diagnosis } from './pages/Diagnosis';
import { Result } from './pages/Result';
import { About } from './pages/About';

import { CharacterList } from './pages/CharacterList';
import { ScrollToTop } from './components/ScrollToTop';

// Use HashRouter for simple static deployment compatibility
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/about" element={<About />} />
        <Route path="/result/:typeId" element={<Result />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
