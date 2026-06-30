import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../Chatbot';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cyber-dark text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}
