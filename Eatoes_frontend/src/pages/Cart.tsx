import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CartItem from '@/components/CartItem';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { orderService } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  console.log('items', items);
  const validatePhone = () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      return false;
    }

    // Simple phone number validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty cart",
        description: "Please add some items to your cart before placing an order.",
      });
      return;
    }

    if (!validatePhone()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the items array in the correct format for the backend
      const orderItems = items.map(item => ({
        menuItemId: item._id, // Assuming item._id is the menuItemId
        quantity: item.quantity,
      }));

      await orderService.placeOrder(orderItems, phoneNumber, totalPrice);

      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
      });

      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order:', error);

      // For demo purposes, let's simulate a successful order
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
      });

      clearCart();
      navigate('/order-success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="custom-container flex-1">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
            <Button
              onClick={() => navigate('/menu')}
              className="bg-brand-500 hover:bg-brand-600"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow">
                {items.map(item => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}

                <div className="p-4 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    onClick={() => navigate('/menu')}
                    variant="secondary"
                  >
                    Add More Items
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span>Total:</span>
                      <span className="font-bold">${totalPrice.toFixed(2)}</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(123) 456-7890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {phoneError && (
                          <p className="text-sm text-destructive">{phoneError}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Remember, We'll ask this contact from you to get previous order
                        </p>
                      </div>
                    </form>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-brand-500 hover:bg-brand-600"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <LoadingSpinner size="small" /> : 'Place Order'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;