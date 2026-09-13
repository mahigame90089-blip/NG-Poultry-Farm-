/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  IndianRupee, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Search,
  Tag
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction } from '../types';

interface FinancialsProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function Financials({ transactions, setTransactions }: FinancialsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split('T')[0],
    type: 'Income',
    category: '',
    amount: 0,
    description: ''
  });

  const totalIncome = useMemo(() => 
    transactions.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0), 
  [transactions]);

  const totalExpense = useMemo(() => 
    transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0), 
  [transactions]);

  const handleAddTransaction = () => {
    const transactionToAdd: Transaction = {
      ...newTransaction as Transaction,
      id: `t${Date.now()}`,
    };
    setTransactions([transactionToAdd, ...transactions]);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-emerald-50 text-emerald-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                <ArrowUpRight size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">Total Income</span>
            </div>
            <h3 className="text-3xl font-bold">₹{totalIncome.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-rose-50 text-rose-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-600">
                <ArrowDownRight size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">Total Expenses</span>
            </div>
            <h3 className="text-3xl font-bold">₹{totalExpense.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-[#2D5A27] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-white/10 text-white">
                <IndianRupee size={20} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider opacity-60">Net Profit</span>
            </div>
            <h3 className="text-3xl font-bold">₹{(totalIncome - totalExpense).toLocaleString()}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10 bg-white border-[#E5E7EB] rounded-xl h-11"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl gap-2 border-[#E5E7EB] h-11">
            <Download size={18} />
            <span>Export</span>
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl gap-2 h-11 px-6 shadow-lg shadow-green-50">
                <Plus size={18} />
                <span>Add Transaction</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add Transaction</DialogTitle>
                <CardDescription>Record a new income or expense entry.</CardDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Type</Label>
                    <Select 
                      value={newTransaction.type} 
                      onValueChange={(v: any) => setNewTransaction({...newTransaction, type: v})}
                    >
                      <SelectTrigger className="rounded-xl border-[#E5E7EB]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Income">Income</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      className="rounded-xl border-[#E5E7EB]"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Category</Label>
                    <Input 
                      id="category" 
                      placeholder="e.g. Feed, Sales" 
                      className="rounded-xl border-[#E5E7EB]"
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Amount (₹)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      className="rounded-xl border-[#E5E7EB]"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Description</Label>
                  <Input 
                    id="desc" 
                    placeholder="Short description..." 
                    className="rounded-xl border-[#E5E7EB]"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">Cancel</Button>
                <Button onClick={handleAddTransaction} className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl px-8">Save Transaction</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow className="hover:bg-transparent border-[#E5E7EB]">
              <TableHead className="font-bold text-[#6B7280] py-4">Date</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Category</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Description</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Type</TableHead>
              <TableHead className="text-right font-bold text-[#6B7280]">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id} className="hover:bg-[#F9FAFB] border-[#E5E7EB] transition-colors">
                <TableCell className="font-bold py-4">{t.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-[#6B7280]" />
                    <span className="font-medium text-[#4B5563]">{t.category}</span>
                  </div>
                </TableCell>
                <TableCell className="text-[#6B7280] text-sm">{t.description}</TableCell>
                <TableCell>
                  <Badge className={`rounded-full px-3 py-0.5 font-bold text-[10px] uppercase tracking-wider ${
                    t.type === 'Income' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50' : 'bg-rose-50 text-rose-700 hover:bg-rose-50'
                  }`}>
                    {t.type}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-bold text-lg ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'Income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
