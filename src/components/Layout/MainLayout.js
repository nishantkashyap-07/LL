import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Pages that should not show footer (optional)
  const noFooterPages = [];
  const showFooter = !noFooterPages.includes(location.pathname);
  
  // Pages that should not show navbar (optional)
  const noNavbarPages = [];
  const showNavbar = !noNavbarPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-neutral-950 dark flex flex-col">
      {showNavbar && <Navbar />}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
