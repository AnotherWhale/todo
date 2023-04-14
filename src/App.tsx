import { Route, Routes } from 'react-router-dom';
import TodoDetails from './pages/TodoDetails';
import Home from './pages/Home';
import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:todoID" element={<TodoDetails />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

export default App
