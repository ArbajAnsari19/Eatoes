import { Request, Response } from 'express';
import MenuItem from '../models/MenuItems';

class MenuController {
  static async getMenuItems(req: Request, res: Response): Promise<void> {
    try {
      const menuItems = await MenuItem.find();
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Server error fetching menu items' });
    }
  }
}

export default MenuController;