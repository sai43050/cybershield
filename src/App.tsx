import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Tools from './pages/Tools';
import Quiz from './pages/Quiz';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="tools" element={<Tools />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="resources" element={<Resources />} />
            <Route path="community" element={<Community />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<div className="p-20 text-center text-2xl font-bold text-red-500">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
