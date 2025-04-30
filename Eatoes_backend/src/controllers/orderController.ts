import { Request, Response } from 'express';
import Order from '../models/Order';

class OrderController {
  static async placeOrder(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber, items, totalPrice } = req.body;
    
      if ( !phoneNumber || !items || !totalPrice) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
      const newOrder = new Order({
        phoneNumber,
        items,
        totalPrice,
      });
    
      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Server error placing order' });
    }
  }

  static async getOrdersByPhoneNumber(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber } = req.params;
      const orders = await Order.find({ phoneNumber }).populate('items.menuItemId');
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Server error fetching orders' });
    }
  }
}

export default OrderController;