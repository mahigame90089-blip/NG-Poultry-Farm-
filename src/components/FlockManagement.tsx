/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bird, 
  Plus, 
  MoreVertical, 
  Calendar, 
  Activity,
  Trash2,
  Edit2,
  Search
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
import { Flock } from '../types';

interface FlockManagementProps {
  flocks: Flock[];
  setFlocks: React.Dispatch<React.SetStateAction<Flock[]>>;
}

export default function FlockManagement({ flocks, setFlocks }: FlockManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFlock, setNewFlock] = useState<Partial<Flock>>({
    name: '',
    breed: '',
    count: 0,
    ageInWeeks: 0,
    type: 'Layer',
    status: 'Active',
    arrivalDate: new Date().toISOString().split('T')[0]
  });

  const filteredFlocks = flocks.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFlock = () => {
    const flockToAdd: Flock = {
      ...newFlock as Flock,
      id: `f${Date.now()}`,
    };
    setFlocks([...flocks, flockToAdd]);
    setIsAddDialogOpen(false);
    setNewFlock({
      name: '',
      breed: '',
      count: 0,
      ageInWeeks: 0,
      type: 'Layer',
      status: 'Active',
      arrivalDate: new Date().toISOString().split('T')[0]
    });
  };

  const deleteFlock = (id: string) => {
    setFlocks(flocks.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
          <Input 
            placeholder="Search flocks by name or breed..." 
            className="pl-10 bg-white border-[#E5E7EB] rounded-xl h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl gap-2 h-11 px-6 shadow-lg shadow-green-50">
              <Plus size={18} />
              <span>Add New Flock</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Flock</DialogTitle>
              <CardDescription>Enter the details for the new bird batch.</CardDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Flock Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Batch C - 2024" 
                    className="rounded-xl border-[#E5E7EB]"
                    value={newFlock.name}
                    onChange={(e) => setNewFlock({...newFlock, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breed" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Breed</Label>
                  <Input 
                    id="breed" 
                    placeholder="e.g. Cobb 500" 
                    className="rounded-xl border-[#E5E7EB]"
                    value={newFlock.breed}
                    onChange={(e) => setNewFlock({...newFlock, breed: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="count" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Initial Count</Label>
                  <Input 
                    id="count" 
                    type="number" 
                    className="rounded-xl border-[#E5E7EB]"
                    value={newFlock.count}
                    onChange={(e) => setNewFlock({...newFlock, count: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Age (Weeks)</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    className="rounded-xl border-[#E5E7EB]"
                    value={newFlock.ageInWeeks}
                    onChange={(e) => setNewFlock({...newFlock, ageInWeeks: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Type</Label>
                  <Select 
                    value={newFlock.type} 
                    onValueChange={(v: any) => setNewFlock({...newFlock, type: v})}
                  >
                    <SelectTrigger className="rounded-xl border-[#E5E7EB]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Layer">Layer (Eggs)</SelectItem>
                      <SelectItem value="Broiler">Broiler (Meat)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Arrival Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="rounded-xl border-[#E5E7EB]"
                    value={newFlock.arrivalDate}
                    onChange={(e) => setNewFlock({...newFlock, arrivalDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">Cancel</Button>
              <Button onClick={handleAddFlock} className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl px-8">Create Flock</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow className="hover:bg-transparent border-[#E5E7EB]">
              <TableHead className="font-bold text-[#6B7280] py-4">Flock Name</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Breed</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Type</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Count</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Age</TableHead>
              <TableHead className="font-bold text-[#6B7280]">Status</TableHead>
              <TableHead className="text-right font-bold text-[#6B7280]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlocks.map((flock) => (
              <TableRow key={flock.id} className="hover:bg-[#F9FAFB] border-[#E5E7EB] transition-colors">
                <TableCell className="font-bold py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#2D5A27]">
                      <Bird size={16} />
                    </div>
                    {flock.name}
                  </div>
                </TableCell>
                <TableCell className="text-[#4B5563] font-medium">{flock.breed}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`rounded-full px-3 py-0.5 font-bold text-[10px] uppercase tracking-wider ${
                    flock.type === 'Layer' ? 'border-amber-200 text-amber-700 bg-amber-50' : 'border-blue-200 text-blue-700 bg-blue-50'
                  }`}>
                    {flock.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">{flock.count}</TableCell>
                <TableCell className="text-[#4B5563] font-medium">{flock.ageInWeeks} weeks</TableCell>
                <TableCell>
                  <Badge className={`rounded-full px-3 py-0.5 font-bold text-[10px] uppercase tracking-wider ${
                    flock.status === 'Active' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50' : 'bg-gray-100 text-gray-600 hover:bg-gray-100'
                  }`}>
                    {flock.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F3F4F6]">
                      <Edit2 size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                      onClick={() => deleteFlock(flock.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
