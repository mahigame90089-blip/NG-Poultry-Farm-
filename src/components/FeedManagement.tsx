/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  ArrowDownCircle, 
  ArrowUpCircle,
  AlertTriangle,
  History,
  ShoppingBag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FeedInventory, Flock } from '../types';

interface FeedManagementProps {
  inventory: FeedInventory[];
  setInventory: React.Dispatch<React.SetStateAction<FeedInventory[]>>;
  flocks: Flock[];
}

export default function FeedManagement({ inventory, setInventory, flocks }: FeedManagementProps) {
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [restockData, setRestockData] = useState({
    type: '',
    quantity: 0,
    price: 0
  });

  const handleRestock = () => {
    const existing = inventory.find(i => i.type === restockData.type);
    if (existing) {
      setInventory(inventory.map(i => 
        i.type === restockData.type 
          ? { ...i, quantityKg: i.quantityKg + restockData.quantity, lastRestocked: new Date().toISOString().split('T')[0] }
          : i
      ));
    } else {
      setInventory([...inventory, {
        id: `fi${Date.now()}`,
        type: restockData.type,
        quantityKg: restockData.quantity,
        unitPrice: restockData.price,
        lastRestocked: new Date().toISOString().split('T')[0]
      }]);
    }
    setIsRestockOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">Feed & Inventory</h3>
          <p className="text-sm text-[#6B7280]">Manage feed stock and consumption tracking.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl gap-2 border-[#E5E7EB]">
            <History size={18} />
            <span>Consumption Logs</span>
          </Button>
          <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl gap-2 shadow-lg shadow-green-50">
                <ShoppingBag size={18} />
                <span>Restock Feed</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-3xl border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Restock Feed</DialogTitle>
                <CardDescription>Add new feed stock to your inventory.</CardDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Feed Type</Label>
                  <Input 
                    placeholder="e.g. Layer Mash" 
                    className="rounded-xl border-[#E5E7EB]"
                    value={restockData.type}
                    onChange={(e) => setRestockData({...restockData, type: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Quantity (kg)</Label>
                    <Input 
                      type="number" 
                      className="rounded-xl border-[#E5E7EB]"
                      value={restockData.quantity}
                      onChange={(e) => setRestockData({...restockData, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Price per kg (₹)</Label>
                    <Input 
                      type="number" 
                      className="rounded-xl border-[#E5E7EB]"
                      value={restockData.price}
                      onChange={(e) => setRestockData({...restockData, price: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsRestockOpen(false)} className="rounded-xl">Cancel</Button>
                <Button onClick={handleRestock} className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl px-8">Confirm Restock</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <Card key={item.id} className="border-none shadow-sm overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-[#F3F4F6] text-[#2D5A27] group-hover:bg-[#2D5A27] group-hover:text-white transition-colors">
                  <Package size={20} />
                </div>
                <Badge variant={item.quantityKg < 100 ? 'destructive' : 'secondary'} className="rounded-full px-3 text-[10px] font-bold uppercase tracking-wider">
                  {item.quantityKg < 100 ? 'Low Stock' : 'In Stock'}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold mt-4">{item.type}</CardTitle>
              <CardDescription>Last restocked: {item.lastRestocked}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold">{item.quantityKg} <span className="text-sm font-medium text-[#6B7280]">kg</span></h3>
                <span className="text-sm font-bold text-[#2D5A27]">₹{item.unitPrice}/kg</span>
              </div>
              <div className="space-y-2">
                <Progress 
                  value={(item.quantityKg / 500) * 100} 
                  className="h-2 bg-[#F3F4F6]"
                  style={{ 
                    '--progress-background': item.quantityKg < 100 ? '#EF4444' : '#2D5A27' 
                  } as any}
                />
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
                  <span>0 kg</span>
                  <span>Max 500 kg</span>
                </div>
              </div>
              {item.quantityKg < 100 && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold">Order more immediately!</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Estimated Consumption</CardTitle>
          <CardDescription>Projected feed usage based on current flock size.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {flocks.map(f => (
                <div key={f.id} className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2D5A27] shadow-sm">
                      <ArrowDownCircle size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{f.name}</p>
                      <p className="text-xs text-[#6B7280]">{f.count} birds</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-rose-600">-{f.type === 'Layer' ? (f.count * 0.12).toFixed(1) : (f.count * 0.15).toFixed(1)} kg</p>
                    <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">Per Day</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#2D5A27] rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Package size={200} />
              </div>
              <h4 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Total Daily Requirement</h4>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold">210.5</span>
                <span className="text-xl opacity-80 font-medium">kg / day</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium border-t border-white/10 pt-4">
                  <span className="opacity-80">Days of stock remaining:</span>
                  <span className="font-bold text-amber-300">~4 Days</span>
                </div>
                <Button className="w-full bg-white text-[#2D5A27] hover:bg-white/90 rounded-xl font-bold mt-4">
                  Schedule Delivery
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
