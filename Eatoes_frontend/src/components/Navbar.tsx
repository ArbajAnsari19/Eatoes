
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="custom-container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-xl text-brand-500">
          Eatoes
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center text-sm mr-2">
                <span className="text-muted-foreground mr-1">Welcome,</span>
                <span className="font-medium">{user?.name || 'User'}</span>
              </div>
              
              <Link to="/menu" className="text-sm font-medium hover:text-brand-500">
                Menu
              </Link>
              <Link to="/order-history" className="text-sm font-medium hover:text-brand-500">
              History</Link>
              
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-sm font-medium hover:text-brand-500"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
