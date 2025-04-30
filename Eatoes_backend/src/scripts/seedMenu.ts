import mongoose from 'mongoose';
import MenuItem from '../models/MenuItems';
import dotenv from 'dotenv';


export const menuItems = [
    {
      name: "Chicken Spring Rolls",
      description: "Crispy rolls filled with minced chicken and vegetables",
      price: 8.99,
      category: "Appetizer",
      imageUrl: "https://example.com/images/spring-rolls.jpg"
    },
    {
      name: "Vegetable Samosas",
      description: "Crispy pastry filled with spiced potatoes and green peas",
      price: 6.99,
      category: "Appetizer",
      imageUrl: "https://example.com/images/samosas.jpg"
    },
    {
      name: "Butter Chicken",
      description: "Tender chicken cooked in rich tomato and butter gravy",
      price: 16.99,
      category: "Main Course",
      imageUrl: "https://example.com/images/butter-chicken.jpg"
    },
    {
      name: "Paneer Tikka Masala",
      description: "Grilled cottage cheese in spiced tomato curry",
      price: 14.99,
      category: "Main Course",
      imageUrl: "https://example.com/images/paneer-tikka.jpg"
    },
    {
      name: "Chicken Biryani",
      description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
      price: 18.99,
      category: "Main Course",
      imageUrl: "https://example.com/images/biryani.jpg"
    },
    {
      name: "Dal Makhani",
      description: "Black lentils slow cooked with butter and cream",
      price: 12.99,
      category: "Main Course",
      imageUrl: "https://example.com/images/dal-makhani.jpg"
    },
    {
      name: "Garlic Naan",
      description: "Fresh baked bread with garlic and butter",
      price: 3.99,
      category: "Bread",
      imageUrl: "https://example.com/images/naan.jpg"
    },
    {
      name: "Gulab Jamun",
      description: "Deep fried milk dumplings soaked in sugar syrup",
      price: 5.99,
      category: "Dessert",
      imageUrl: "https://example.com/images/gulab-jamun.jpg"
    },
    {
      name: "Mango Lassi",
      description: "Sweet yogurt smoothie with mango pulp",
      price: 4.99,
      category: "Beverages",
      imageUrl: "https://example.com/images/mango-lassi.jpg"
    },
    {
      name: "Masala Chai",
      description: "Indian spiced tea with milk",
      price: 2.99,
      category: "Beverages",
      imageUrl: "https://example.com/images/masala-chai.jpg"
    },
    {
      name: "Tandoori Chicken",
      description: "Marinated chicken roasted in clay oven",
      price: 15.99,
      category: "Main Course",
      imageUrl: "https://example.com/images/tandoori-chicken.jpg"
    },
    {
      name: "Malai Kofta",
      description: "Vegetable and cheese dumplings in creamy gravy",
      price: 13.99,
      category: "Main Course",
      imageUrl: "https://example.com/images/malai-kofta.jpg"
    }
];


dotenv.config();

const seedMenu = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    await MenuItem.deleteMany({}); // Clear existing items
    await MenuItem.insertMany(menuItems);
    console.log('Menu items seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu items:', error);
    process.exit(1);
  }
};

seedMenu();