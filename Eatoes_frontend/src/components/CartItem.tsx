
import React from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (_id: number, quantity: number) => void;
  onRemove: (_id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { _id, name, price, quantity } = item;
  
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-muted-foreground text-sm">${price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground"
            onClick={() => onUpdateQuantity(_id, quantity - 1)}
          >
            -
          </Button>
          <span className="px-2 text-sm">{quantity}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground"
            onClick={() => onUpdateQuantity(_id, quantity + 1)}
          >
            +
          </Button>
        </div>
        
        <span className="font-medium w-20 text-right">
          ${(price * quantity).toFixed(2)}
        </span>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive"
          onClick={() => onRemove(_id)}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Remove</span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
