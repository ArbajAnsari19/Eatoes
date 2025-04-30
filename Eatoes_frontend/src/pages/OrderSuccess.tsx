
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="custom-container flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6 mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-brand-100">
            <Check className="h-12 w-12 text-brand-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your order. We've received your request and will 
            process it shortly. You'll receive a confirmation shortly.
          </p>
          <Button
            onClick={() => navigate('/menu')}
            className="bg-brand-500 hover:bg-brand-600"
          >
            Return to Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
