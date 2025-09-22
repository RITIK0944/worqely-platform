import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ShoppingCart, 
  Package, 
  Wrench, 
  ShieldCheck, 
  Coffee,
  Clock,
  Star,
  Plus,
  Minus,
  ChevronRight,
  TruckIcon,
  Calendar
} from 'lucide-react';
import { User as UserType } from '../../App';

interface ECommerceSectionProps {
  user: UserType;
}

interface Product {
  id: string;
  name: string;
  category: 'tools' | 'safety' | 'essentials' | 'rental';
  price: number;
  rentPrice?: number; // For rental items (per day)
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  isRental?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  isRental: boolean;
  rentalDays?: number;
}

const products: Product[] = [
  // Tools
  {
    id: 'drill-1',
    name: 'Heavy Duty Drill Machine',
    category: 'tools',
    price: 2500,
    rentPrice: 200,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Professional grade drill machine suitable for construction work',
    inStock: true,
    rating: 4.5,
    reviews: 124,
    isRental: true
  },
  {
    id: 'hammer-1',
    name: 'Steel Claw Hammer',
    category: 'tools',
    price: 450,
    image: 'https://images.unsplash.com/photo-1609205807107-e0be36c5c432?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Durable steel hammer for construction and repair work',
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'screwdriver-set',
    name: 'Professional Screwdriver Set',
    category: 'tools',
    price: 650,
    image: 'https://images.unsplash.com/photo-1609547203525-26ce4a6b04cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Complete set of screwdrivers for electrical and mechanical work',
    inStock: true,
    rating: 4.3,
    reviews: 67
  },
  {
    id: 'ladder-1',
    name: 'Aluminum Step Ladder',
    category: 'tools',
    price: 3200,
    rentPrice: 150,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: '6-step aluminum ladder for safe height work',
    inStock: true,
    rating: 4.6,
    reviews: 156,
    isRental: true
  },
  {
    id: 'cutter-1',
    name: 'Angle Grinder Cutter',
    category: 'tools',
    price: 1800,
    rentPrice: 120,
    image: 'https://images.unsplash.com/photo-1617469165786-8007eda82c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Heavy duty angle grinder for cutting and grinding',
    inStock: true,
    rating: 4.4,
    reviews: 93,
    isRental: true
  },

  // Safety Gear
  {
    id: 'helmet-1',
    name: 'Safety Hard Hat',
    category: 'safety',
    price: 280,
    image: 'https://images.unsplash.com/photo-1631370509165-d0dd14fa6e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'ANSI approved safety helmet for construction sites',
    inStock: true,
    rating: 4.8,
    reviews: 245
  },
  {
    id: 'gloves-1',
    name: 'Work Safety Gloves',
    category: 'safety',
    price: 120,
    image: 'https://images.unsplash.com/photo-1607116814929-aff4ce3d0d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Cut-resistant work gloves for hand protection',
    inStock: true,
    rating: 4.5,
    reviews: 187
  },
  {
    id: 'vest-1',
    name: 'High Visibility Safety Vest',
    category: 'safety',
    price: 180,
    image: 'https://images.unsplash.com/photo-1582747043124-4eff24c7c3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Reflective safety vest for high visibility work',
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 'boots-1',
    name: 'Steel Toe Safety Boots',
    category: 'safety',
    price: 850,
    image: 'https://images.unsplash.com/photo-1606190858648-e6e271735ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Heavy duty steel toe boots for foot protection',
    inStock: true,
    rating: 4.7,
    reviews: 298
  },

  // Daily Essentials
  {
    id: 'water-bottle',
    name: 'Insulated Water Bottle',
    category: 'essentials',
    price: 350,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Keep water cool during long work hours',
    inStock: true,
    rating: 4.4,
    reviews: 87
  },
  {
    id: 'lunch-box',
    name: 'Stainless Steel Lunch Box',
    category: 'essentials',
    price: 450,
    image: 'https://images.unsplash.com/photo-1596040435569-77eebca74ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Durable lunch box for daily meals',
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'first-aid',
    name: 'Basic First Aid Kit',
    category: 'essentials',
    price: 280,
    image: 'https://images.unsplash.com/photo-1603398938253-11e8b2a3e9dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    description: 'Essential first aid supplies for workplace safety',
    inStock: true,
    rating: 4.7,
    reviews: 98
  }
];

export function ECommerceSection({ user }: ECommerceSectionProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'tools' | 'safety' | 'essentials' | 'rental'>('tools');
  const [orderHistory, setOrderHistory] = useState([
    {
      id: 'order-1',
      date: '2024-12-15',
      items: 3,
      total: 1250,
      status: 'delivered' as const
    },
    {
      id: 'order-2', 
      date: '2024-12-20',
      items: 1,
      total: 450,
      status: 'in-transit' as const
    }
  ]);

  const addToCart = (product: Product, isRental: boolean = false, rentalDays: number = 1) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.isRental === isRental
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.isRental === isRental
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity: 1, 
        isRental,
        rentalDays: isRental ? rentalDays : undefined
      }]);
    }
  };

  const updateQuantity = (productId: string, isRental: boolean, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId && item.isRental === isRental) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.isRental ? (item.rentPrice || 0) * (item.rentalDays || 1) : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const categorizedProducts = {
    tools: products.filter(p => p.category === 'tools'),
    safety: products.filter(p => p.category === 'safety'),
    essentials: products.filter(p => p.category === 'essentials'),
    rental: products.filter(p => p.isRental === true)
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
          />
          {!product.inStock && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Out of Stock
            </Badge>
          )}
          {product.isRental && (
            <Badge className="absolute top-2 left-2 bg-green-500">
              Rental Available
            </Badge>
          )}
        </div>
        
        <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h4>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-lg text-gray-900">₹{product.price}</span>
              <span className="text-sm text-gray-500 ml-1">Buy</span>
            </div>
            <Button
              size="sm"
              onClick={() => addToCart(product, false)}
              disabled={!product.inStock}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          {product.isRental && product.rentPrice && (
            <div className="flex items-center justify-between border-t pt-2">
              <div>
                <span className="font-semibold text-lg text-green-600">₹{product.rentPrice}</span>
                <span className="text-sm text-gray-500 ml-1">/day</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addToCart(product, true)}
                disabled={!product.inStock}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Rent
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">E-Commerce</h2>
          <p className="text-gray-600">Tools, safety gear, and daily essentials for workers</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Safety Gear</span>
          </TabsTrigger>
          <TabsTrigger value="essentials" className="flex items-center gap-2">
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline">Daily Essentials</span>
          </TabsTrigger>
          <TabsTrigger value="rental" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Rental Tools</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorizedProducts.tools.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorizedProducts.safety.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="essentials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorizedProducts.essentials.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rental" className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Rental Tools - Lower Cost, High Quality</h3>
            </div>
            <p className="text-green-700 text-sm">
              Rent professional tools at a fraction of the buying price. Perfect for specific projects or occasional use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorizedProducts.rental.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.isRental}-${index}`} className="flex items-center justify-between bg-white p-2 rounded">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    {item.isRental && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Rental ({item.rentalDays} days)
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.isRental, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.isRental, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <span className="font-semibold w-20 text-right">
                      ₹{(item.isRental ? (item.rentPrice || 0) * (item.rentalDays || 1) : item.price) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total: ₹{getCartTotal()}</span>
                <Button className="bg-green-600 hover:bg-green-700">
                  <TruckIcon className="h-4 w-4 mr-2" />
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderHistory.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.date} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total}</p>
                  <Badge
                    variant={order.status === 'delivered' ? 'default' : 'secondary'}
                    className={order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Orders
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}