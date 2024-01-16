import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import VideoList from './components/VideoList';
import SingleVideo from './components/SingleVideo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video" element={<SingleVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
