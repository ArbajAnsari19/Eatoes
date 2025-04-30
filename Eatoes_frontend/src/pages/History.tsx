import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import { orderHistoryService } from '@/services/api';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface OrderItem {
  menuItemId: MenuItem;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  phoneNumber: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
}

const History: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await orderHistoryService.getOrdersByPhoneNumber(phoneNumber);
      setOrders(response.data);
      setError('');
    } catch (error: any) {
      setOrders([]);
      setError(error.response?.data?.message || 'Error fetching orders');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      
      <div className="space-y-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="flex gap-4">
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button 
              onClick={handleSearch}
              disabled={!phoneNumber || isLoading}
              className="bg-brand-500 hover:bg-brand-600"
            >
              {isLoading ? <LoadingSpinner size="small" /> : 'Search Orders'}
            </Button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Order #{order._id.slice(-6)}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Items:</h3>
                  <div className="space-y-2">
                    {order.items?.map((item) => (
                      <div key={item._id} className="flex justify-between text-sm">
                        <span>{item.menuItemId.name} x{item.quantity}</span>
                        <span>${(item.menuItemId.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-bold text-lg">
                    ${(order.totalPrice || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;