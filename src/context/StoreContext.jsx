import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProducts from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // 1. Products list
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('vk_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return initialProducts;
  });

  // 2. Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('vk_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  // 3. Favourites / Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('vk_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  // 4. User session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vk_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return {
      name: 'Vijay Kumar',
      email: 'vijay@example.com',
      phone: '+91 98765 43210',
      authMethod: 'Google OAuth',
      isAdmin: false
    };
  });

  // 5. Admin Authentication State (Only for Store Owner)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('vk_admin_auth') === 'true';
  });

  // 6. Orders list with rich Tracking milestones
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('vk_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: 'ORD-9021',
        date: '2026-10-21',
        customerName: 'Vijay Kumar',
        customerEmail: 'vijay@example.com',
        customerPhone: '+91 98765 43210',
        address: 'Flat 402, Royal Residency, Indiranagar, Bangalore, KA - 560038',
        items: [{ id: 2, name: 'Smart Watch', price: 2999, quantity: 1, cost: 1800, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop' }],
        totalAmount: 2999,
        paymentMethod: 'PhonePe UPI',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        supplierCost: 1800,
        netProfit: 1199,
        trackingStep: 4, // 1: Placed, 2: Packed, 3: Shipped/In Transit, 4: Delivered
        trackingNumber: 'VKT-BLR-892301',
        courier: 'BlueDart Express'
      },
      {
        id: 'ORD-8944',
        date: '2026-10-20',
        customerName: 'Vijay Kumar',
        customerEmail: 'vijay@example.com',
        customerPhone: '+91 98765 43210',
        address: 'Flat 402, Royal Residency, Indiranagar, Bangalore, KA - 560038',
        items: [{ id: 3, name: 'Backpack', price: 1699, quantity: 1, cost: 900, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop' }],
        totalAmount: 1699,
        paymentMethod: 'Google Pay',
        paymentStatus: 'Paid',
        orderStatus: 'In Transit',
        supplierCost: 900,
        netProfit: 799,
        trackingStep: 3,
        trackingNumber: 'VKT-DEL-551294',
        courier: 'Delhivery Air'
      }
    ];
  });

  // Global Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    localStorage.setItem('vk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vk_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vk_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('vk_admin_auth', String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Favourites ♡`, 'warning');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added "${product.name}" to Favourites ❤️`, 'success');
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added "${product.name}" to cart! 🛍️`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Product operations (Admin only)
  const addProduct = (newProduct) => {
    const id = Date.now();
    const productWithId = {
      ...newProduct,
      id,
      rating: 5.0,
      reviews: 1,
      inStock: true,
      features: newProduct.features || ['Premium Quality', '100% Original', 'Fast Dispatch'],
      specifications: newProduct.specifications || {
        'Category': newProduct.category || 'General',
        'Status': 'Brand New',
        'Warranty': '1 Year Brand Warranty'
      }
    };
    setProducts((prev) => [productWithId, ...prev]);
    showToast(`Product "${newProduct.name}" published successfully! 🚀`);
    return productWithId;
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from catalog', 'warning');
  };

  // Auth operations
  const registerUser = (userData) => {
    const newUser = {
      name: userData.fullName || userData.name || 'VK Shopper',
      email: userData.email,
      phone: userData.phone || '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
      authMethod: 'Email & Password',
      createdAt: new Date().toLocaleDateString(),
      isAdmin: false
    };
    setUser(newUser);
    showToast(`Account created! Welcome, ${newUser.name} 🎉`);
    return newUser;
  };

  const loginUser = (email, password) => {
    const loggedIn = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
      authMethod: 'Email & Password',
      createdAt: new Date().toLocaleDateString(),
      isAdmin: false
    };
    setUser(loggedIn);
    showToast(`Logged in successfully! Welcome back 👋`);
    return loggedIn;
  };

  const loginWithGoogle = () => {
    const googleUser = {
      name: 'Vijay Kumar',
      email: 'vijay@example.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop',
      authMethod: 'Google OAuth',
      createdAt: new Date().toLocaleDateString(),
      isAdmin: false
    };
    setUser(googleUser);
    showToast('Authenticated with Google successfully! 🌐');
    return googleUser;
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Logged out successfully');
  };

  // Admin login / logout
  const adminLogin = (passcode) => {
    if (passcode === 'admin123' || passcode === 'vkstore2026') {
      setIsAdminAuthenticated(true);
      showToast('Admin Mode Unlocked 🛡️ Welcome, Owner!');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Admin session locked 🔒');
  };

  // Checkout & Place Order
  const placeOrder = (orderData) => {
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const trackingNum = 'VKT-IND-' + Math.floor(100000 + Math.random() * 900000);
    const totalAmount = orderData.totalAmount;
    const supplierCost = orderData.supplierCost || Math.round(totalAmount * 0.6);
    const netProfit = totalAmount - supplierCost;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customerName: orderData.name || (user ? user.name : 'Customer'),
      customerEmail: orderData.email || (user ? user.email : 'customer@example.com'),
      customerPhone: orderData.phone || '+91 98765 43210',
      address: orderData.address || 'Street 10, City, India',
      items: orderData.items,
      totalAmount,
      supplierCost,
      shippingFee: orderData.shippingFee || 0,
      netProfit,
      paymentMethod: orderData.paymentMethod || 'PhonePe UPI',
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      trackingStep: 1, // Order Placed
      trackingNumber: trackingNum,
      courier: 'Express BlueDart / Delhivery'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Financial calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const totalSupplierCost = orders.reduce((sum, ord) => sum + (ord.supplierCost || 0), 0);
  const totalNetProfit = totalRevenue - totalSupplierCost;
  const totalOrdersCount = orders.length;

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isFavorite,
        user,
        orders,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        totalRevenue,
        totalSupplierCost,
        totalNetProfit,
        totalOrdersCount,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addProduct,
        deleteProduct,
        registerUser,
        loginUser,
        loginWithGoogle,
        logoutUser,
        placeOrder
      }}
    >
      {children}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: toast.type === 'warning' ? '#f59e0b' : '#2563eb',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          zIndex: 99999,
          fontWeight: 600,
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideUp 0.3s ease'
        }}>
          <span>{toast.message}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
