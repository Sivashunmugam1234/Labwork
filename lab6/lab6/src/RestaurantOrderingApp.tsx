import { useState, useEffect } from 'react';
import brownie from './assets/Brownie.jpeg';
import burger from './assets/burger.jpeg';
import salad from './assets/salad.jpeg';
import pizza from './assets/pizza.jpeg';
import veggiewrap from './assets/Veggie Wrap.jpeg';
import wings from './assets/wings.jpeg';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const api = {
  getMenuItems: async (): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, and special sauce",
        price: 250,
        image: burger,
        category: "Burgers"
      },
      {
        id: 2,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomatoes, and basil",
        price: 300,
        image: pizza,
        category: "Pizza"
      },
      {
        id: 3,
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan and croutons",
        price: 150,
        image: salad,
        category: "Salads"
      },
      {
        id: 4,
        name: "Chicken Wings",
        description: "Spicy buffalo wings with blue cheese dip",
        price: 499,
        image: wings,
        category: "Appetizers"
      },
      {
        id: 5,
        name: "Veggie Wrap",
        description: "Fresh vegetables with hummus in a wheat wrap",
        price: 99,
        image: veggiewrap,
        category: "Wraps"
      },
      {
        id: 6,
        name: "Chocolate Brownie",
        description: "Warm chocolate brownie with vanilla ice cream",
        price: 49,
        image: brownie,
        category: "Desserts"
      }
    ];
  }
};

const MenuItem = ({ item, addToCart }: { item: MenuItem, addToCart: (item: MenuItem) => void }) => {
  return (
    <div className="border p-3 mb-3">
      <div className="flex">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-3" />
        <div className="flex-1">
          <h3 className="font-bold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span>₹{item.price}</span>
            <button 
              onClick={() => addToCart(item)} 
              className="bg-blue-500 text-white px-2 py-1 text-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, updateQuantity, removeItem }: { 
  item: CartItem, 
  updateQuantity: (id: number, quantity: number) => void,
  removeItem: (id: number) => void
}) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-600">₹{item.price}</div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="bg-gray-200 px-2"
        >
          -
        </button>
        <span className="px-2">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 px-2"
        >
          +
        </button>
        <button 
          onClick={() => removeItem(item.id)}
          className="ml-2 text-red-500 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default function RestaurantOrderingApp() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showOrderConfirmation, setShowOrderConfirmation] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const data = await api.getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);
  
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  
  const filteredMenuItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const placeOrder = () => {
    setShowOrderConfirmation(true);
    setCart([]);
  };
  
  const subtotal = cartTotal;
  const tax = subtotal * 0.08; 
  const total = subtotal + tax;
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <header className="mb-4 border-b pb-2">
        <h1 className="text-xl font-bold">Delicious Eats</h1>
      </header>
      
      {showOrderConfirmation ? (
        <div className="bg-green-100 border border-green-400 p-4 text-center">
          <h2 className="font-bold mb-2">Order Confirmed!</h2>
          <p className="mb-2">Your food is being prepared.</p>
          <p className="mb-4">Delivery in 30-45 minutes</p>
          <button 
            onClick={() => setShowOrderConfirmation(false)} 
            className="bg-green-500 text-white px-4 py-2"
          >
            New Order
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/5">
              <h2 className="font-bold mb-2">Menu</h2>
              {filteredMenuItems.map(item => (
                <MenuItem key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
            
            <div className="md:w-2/5">
              <div className="border p-3">
                <h2 className="font-bold mb-2">Your Order</h2>
                
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Cart empty</p>
                ) : (
                  <>
                    <div className="mb-4 max-h-64 overflow-y-auto">
                      {cart.map(item => (
                        <CartItem 
                          key={item.id} 
                          item={item} 
                          updateQuantity={updateQuantity} 
                          removeItem={removeItem} 
                        />
                      ))}
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>₹{tax}</span>
                      </div>
                      <div className="flex justify-between font-bold mt-1">
                        <span>Total:</span>
                        <span>₹{total}</span>
                      </div>
                      
                      <button 
                        onClick={placeOrder} 
                        className="w-full bg-green-500 text-white py-2 mt-3"
                      >
                        Place Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}