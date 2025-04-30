
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import MenuItemCard from '@/components/MenuItemCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useCart, MenuItem } from '@/context/CartContext';
import { menuService } from '@/services/api';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, totalItems } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const response = await menuService.getMenuItems();
        setMenuItems(response.data);
        setError(null);
        console.log('Menu items fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Failed to fetch menu items. Please try again.');
        // For demo purposes, let's set some mock data
        // setMenuItems([
        //   {
        //     id: 1,
        //     name: 'Margherita Pizza',
        //     description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        //     price: 12.99,
        //     image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        //   },
        //   {
        //     id: 2,
        //     name: 'Vegetable Burger',
        //     description: 'Plant-based burger with lettuce, tomato, and special sauce',
        //     price: 9.99,
        //     image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        //   },
        //   {
        //     id: 3,
        //     name: 'Caesar Salad',
        //     description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
        //     price: 8.50,
        //     image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        //   },
        //   {
        //     id: 4,
        //     name: 'Spaghetti Bolognese',
        //     description: 'Spaghetti with rich meat sauce and parmesan cheese',
        //     price: 14.50,
        //     image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        //   },
        //   {
        //     id: 5,
        //     name: 'Chocolate Brownie',
        //     description: 'Rich chocolate brownie with vanilla ice cream',
        //     price: 6.99,
        //     image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        //   },
        //   {
        //     id: 6,
        //     name: 'Grilled Salmon',
        //     description: 'Fresh salmon fillet with lemon butter sauce and vegetables',
        //     price: 18.99,
        //     image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        //   }
        // ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="custom-container flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Menu</h1>
          {totalItems > 0 && (
            <Link to="/cart">
              <Button className="bg-brand-500 hover:bg-brand-600">
                View Cart ({totalItems})
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onAddToCart={() => {
                  console.log('Adding item to cart:', item); // Add this line
                  addToCart(item);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
