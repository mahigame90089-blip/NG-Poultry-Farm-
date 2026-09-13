/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Bird, 
  Package, 
  IndianRupee, 
  Menu, 
  X, 
  Plus, 
  TrendingUp, 
  AlertTriangle, 
  User as UserIcon, 
  HelpCircle, 
  Map as MapIcon, 
  LogOut,
  ShoppingBag,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Components
import Dashboard from './components/Dashboard';
import FlockManagement from './components/FlockManagement';
import FeedManagement from './components/FeedManagement';
import Financials from './components/Financials';
import Login from './components/Login';
import Profile from './components/Profile';
import HelpCenter from './components/HelpCenter';
import MapComponent from './components/MapComponent';
import Marketplace from './components/Marketplace';
import AdminPanel from './components/AdminPanel';

import { INITIAL_FLOCKS, INITIAL_FEED_INVENTORY, INITIAL_TRANSACTIONS, INITIAL_CHICKEN_PRODUCT } from './constants';
import { Flock, FeedInventory, Transaction, User, ChickenProduct, Order } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('marketplace');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State management for the app
  const [flocks, setFlocks] = useState<Flock[]>(INITIAL_FLOCKS);
  const [feedInventory, setFeedInventory] = useState<FeedInventory[]>(INITIAL_FEED_INVENTORY);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [chickenProduct, setChickenProduct] = useState<ChickenProduct>(INITIAL_CHICKEN_PRODUCT);
  const [orders, setOrders] = useState<Order[]>([]);

  const isAdmin = currentUser?.role === 'Admin';

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, labelKn: 'ಮಾರುಕಟ್ಟೆ' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, labelKn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', adminOnly: true },
    { id: 'flocks', label: 'Flocks', icon: Bird, labelKn: 'ಹಿಂಡುಗಳು', adminOnly: true },
    { id: 'feed', label: 'Feed Inventory', icon: Package, labelKn: 'ಮೇವು ದಾಸ್ತಾನು', adminOnly: true },
    { id: 'financials', label: 'Financials', icon: IndianRupee, labelKn: 'ಹಣಕಾಸು', adminOnly: true },
    { id: 'admin-panel', label: 'Admin Panel', icon: Settings, labelKn: 'ಅಡ್ಮಿನ್ ಪ್ಯಾನಲ್', adminOnly: true },
    { id: 'map', label: 'Farm Location', icon: MapIcon, labelKn: 'ಫಾರ್ಮ್ ಸ್ಥಳ' },
    { id: 'help', label: 'Help Center', icon: HelpCircle, labelKn: 'ಸಹಾಯ ಕೇಂದ್ರ' },
    { id: 'profile', label: 'Profiles', icon: UserIcon, labelKn: 'ಪ್ರೊಫೈಲ್‌ಗಳು' },
  ];

  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    if (user.role === 'Admin') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('marketplace');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const renderContent = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'marketplace':
        return <Marketplace chickenProduct={chickenProduct} currentUser={currentUser} setTransactions={setTransactions} setOrders={setOrders} />;
      case 'dashboard':
        return isAdmin ? <Dashboard flocks={flocks} feedInventory={feedInventory} transactions={transactions} orders={orders} /> : null;
      case 'flocks':
        return isAdmin ? <FlockManagement flocks={flocks} setFlocks={setFlocks} /> : null;
      case 'feed':
        return isAdmin ? <FeedManagement inventory={feedInventory} setInventory={setFeedInventory} flocks={flocks} /> : null;
      case 'financials':
        return isAdmin ? <Financials transactions={transactions} setTransactions={setTransactions} /> : null;
      case 'admin-panel':
        return isAdmin ? <AdminPanel chickenProduct={chickenProduct} setChickenProduct={setChickenProduct} orders={orders} /> : null;
      case 'profile':
        return <Profile currentUser={currentUser} />;
      case 'help':
        return <HelpCenter currentUser={currentUser} />;
      case 'map':
        return <MapComponent />;
      default:
        return <Marketplace chickenProduct={chickenProduct} currentUser={currentUser} setTransactions={setTransactions} setOrders={setOrders} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#1A1A1A] font-sans relative overflow-hidden">
      {/* Global Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-referrer opacity-5 pointer-events-none"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2000&auto=format&fit=crop")' }}
      />

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white/90 backdrop-blur-md border-r border-[#E5E7EB] flex flex-col sticky top-0 h-screen z-50 shadow-sm"
      >
        <div className="p-6 flex items-center justify-between overflow-hidden whitespace-nowrap">
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <div className="absolute inset-0 bg-[#2D5A27] rounded-2xl rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-[#2D5A27] rounded-2xl -rotate-3 opacity-10"></div>
                <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-[#2D5A27]/20">
                  <img 
                    src="https://images.unsplash.com/photo-1612170153139-6f881ff067e0?q=80&w=400&auto=format&fit=crop" 
                    alt="Rooster and Hen Pair" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#2D5A27]/5"></div>
                </div>
              </div>
              <div>
                <h1 className="font-black text-lg leading-tight tracking-tighter text-[#2D5A27]">NG Poultry</h1>
                <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest">Farm Market</p>
              </div>
            </motion.div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-[#F3F4F6] rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-[#2D5A27] text-white shadow-md shadow-green-100' 
                    : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]'
                }`}
              >
                <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                {isSidebarOpen && (
                  <div className="flex flex-col items-start text-left">
                    <span className="font-semibold text-sm">{item.label}</span>
                    <span className="text-[10px] opacity-70 font-medium">{item.labelKn}</span>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-[#E5E7EB]">
          {isSidebarOpen ? (
            <div className="bg-[#F3F4F6] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2D5A27] font-bold text-xs border border-[#E5E7EB]">
                  {currentUser?.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{currentUser?.name}</span>
                  <span className="text-[10px] text-[#6B7280]">{currentUser?.role}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="w-full text-xs h-8 rounded-lg border-[#D1D5DB] bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 gap-2"
              >
                <LogOut size={14} />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-rose-500">
                <LogOut size={20} />
              </Button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10">
        <header className="bg-white/80 backdrop-blur-md border-bottom border-[#E5E7EB] sticky top-0 z-40 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-[#6B7280] font-medium">
                {navItems.find(i => i.id === activeTab)?.labelKn} {activeTab === 'dashboard' && '- ಸ್ವಾಗತ!'}
              </p>
            </div>
            
            {/* Admin Profile at Top */}
            <Separator orientation="vertical" className="h-10 mx-2" />
            <div className="flex items-center gap-3 bg-[#2D5A27]/5 px-4 py-2 rounded-2xl border border-[#2D5A27]/10">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-widest">Admin</p>
                <p className="text-sm font-bold">Mahesh</p>
              </div>
              <div className="ml-4 flex flex-col items-end text-[10px] text-[#6B7280] font-medium">
                <span>9008979690</span>
                <span>@itz_me_mahesh_g</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
              <AlertTriangle size={14} />
              <span className="text-xs font-bold">Price: ₹{chickenProduct.pricePerKg}/kg</span>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <Button className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl gap-2 shadow-lg shadow-green-50">
              <Plus size={18} />
              <span>Quick Action</span>
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
