/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';
import { 
  Bird, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Package,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Flock, FeedInventory, Transaction, Order } from '../types';

interface DashboardProps {
  flocks: Flock[];
  feedInventory: FeedInventory[];
  transactions: Transaction[];
  orders: Order[];
}

export default function Dashboard({ flocks, feedInventory, transactions, orders }: DashboardProps) {
  const totalBirds = useMemo(() => flocks.reduce((acc, f) => acc + f.count, 0), [flocks]);
  
  const totalSales = useMemo(() => orders.reduce((acc, order) => acc + order.totalPrice, 0), [orders]);
  const totalWeightSold = useMemo(() => orders.reduce((acc, order) => acc + order.weightKg, 0), [orders]);

  const totalIncome = useMemo(() => 
    transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0), 
  [transactions]);

  const totalExpense = useMemo(() => 
    transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0), 
  [transactions]);

  const profit = totalIncome - totalExpense;

  const salesTrendData = useMemo(() => {
    return orders.slice(-7).map(order => ({
      date: order.date.split('-').slice(1).join('/'),
      amount: order.totalPrice,
    })).reverse();
  }, [orders]);

  const stats = [
    { 
      label: 'Total Birds', 
      labelKn: 'ಒಟ್ಟು ಪಕ್ಷಿಗಳು',
      value: totalBirds.toLocaleString(), 
      icon: Bird, 
      color: 'bg-blue-50 text-blue-600',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Total Sales', 
      labelKn: 'ಒಟ್ಟು ಮಾರಾಟ',
      value: `₹${totalSales.toLocaleString()}`, 
      icon: ShoppingBag, 
      color: 'bg-emerald-50 text-emerald-600',
      trend: `₹${totalSales > 0 ? (totalSales/10).toFixed(0) : 0}`,
      trendUp: true
    },
    { 
      label: 'Weight Sold', 
      labelKn: 'ಮಾರಾಟವಾದ ತೂಕ',
      value: `${totalWeightSold} kg`, 
      icon: Activity, 
      color: 'bg-amber-50 text-amber-600',
      trend: `${totalWeightSold > 0 ? (totalWeightSold/5).toFixed(1) : 0}kg`,
      trendUp: true
    },
    { 
      label: 'Net Profit', 
      labelKn: 'ನಿವ್ವಳ ಲಾಭ',
      value: `₹${profit.toLocaleString()}`, 
      icon: TrendingUp, 
      color: 'bg-purple-50 text-purple-600',
      trend: '+₹2,400',
      trendUp: true
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300 bg-white/80 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} />
                </div>
                <Badge variant="secondary" className={`bg-transparent border-none font-bold flex items-center gap-1 ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-[#6B7280] mb-1">
                  {stat.label}
                  <span className="block text-[10px] opacity-70">{stat.labelKn}</span>
                </p>
                <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-lg font-bold">ಮಾರಾಟದ ಪ್ರವೃತ್ತಿ (Sales Trend)</CardTitle>
              <CardDescription>Daily sales over the last 7 orders</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#2D5A27]" />
                <span className="text-xs font-medium text-[#6B7280]">Total Revenue</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrendData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#2D5A27" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders & Feed */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Calendar size={18} className="text-[#2D5A27]" />
                ಇತ್ತೀಚಿನ ಆರ್ಡರ್‌ಗಳು (Recent Orders)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.length > 0 ? orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-[#F3F4F6] rounded-xl group hover:bg-[#2D5A27]/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#2D5A27] font-bold shadow-sm">
                        {order.userName.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{order.userName}</p>
                        <p className="text-[10px] text-[#6B7280] font-medium">{order.chickenType} • {order.weightKg}kg • {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#2D5A27]">₹{order.totalPrice}</p>
                      <Badge variant="outline" className="text-[8px] h-4 bg-emerald-50 text-emerald-700 border-emerald-100">Success</Badge>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-[#6B7280]">
                    <ShoppingBag size={32} className="mx-auto mb-2 opacity-20" />
                    <p className="text-xs font-medium">ಇನ್ನೂ ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-[#2D5A27] text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Feed Inventory</CardTitle>
              <CardDescription className="text-white/70">Stock levels by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedInventory.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{item.type}</span>
                    <span className="text-white/70 font-medium">{item.quantityKg} kg left</span>
                  </div>
                  <Progress 
                    value={(item.quantityKg / 500) * 100} 
                    className="h-2 bg-white/20" 
                  />
                  {item.quantityKg < 100 && (
                    <p className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                      <AlertTriangle size={10} />
                      Critical Stock Level
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
