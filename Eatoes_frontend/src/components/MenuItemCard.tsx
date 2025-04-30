
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuItem } from '@/context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  const { name, description, price, imageUrl } = item;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="font-bold text-lg">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="pt-2 mt-auto">
        <Button 
          className="w-full bg-brand-500 hover:bg-brand-600" 
          onClick={onAddToCart}
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
