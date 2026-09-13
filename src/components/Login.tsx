/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, Lock, Bird } from 'lucide-react';

import { ADMIN_CREDENTIALS } from '../constants';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone === ADMIN_CREDENTIALS.phone && password === ADMIN_CREDENTIALS.phonePassword) {
      onLogin({
        id: 'admin1',
        name: 'Mahesh',
        email: ADMIN_CREDENTIALS.email,
        phone: ADMIN_CREDENTIALS.phone,
        role: 'Admin',
        instagram: 'itz_me_mahesh_g'
      });
    } else {
      onLogin({
        id: `u${Date.now()}`,
        name: 'Farmer User',
        email: 'user@example.com',
        phone: phone,
        role: 'User'
      });
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === ADMIN_CREDENTIALS.email && emailPassword === ADMIN_CREDENTIALS.emailPassword) {
      onLogin({
        id: 'admin1',
        name: 'Mahesh',
        email: ADMIN_CREDENTIALS.email,
        phone: ADMIN_CREDENTIALS.phone,
        role: 'Admin',
        instagram: 'itz_me_mahesh_g'
      });
    } else if (emailPassword.length === 6) {
      onLogin({
        id: `u${Date.now()}`,
        name: 'Farmer User',
        email: email,
        phone: '9876543210',
        role: 'User'
      });
    } else {
      alert('Email password must be 6 digits');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#1A1A1A]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-referrer"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=2000&auto=format&fit=crop")',
          filter: 'brightness(0.4)'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto relative w-24 h-24 mb-4">
              <div className="absolute inset-0 bg-[#2D5A27] rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 bg-[#2D5A27] rounded-3xl -rotate-3 opacity-10"></div>
              <div className="relative w-full h-full bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1612170153139-6f881ff067e0?q=80&w=600&auto=format&fit=crop" 
                  alt="Rooster and Hen Pair" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/30 to-transparent"></div>
              </div>
            </div>
            <CardTitle className="text-4xl font-black tracking-tighter text-[#2D5A27]">NG Poultry Farm</CardTitle>
            <CardDescription className="text-sm font-bold text-[#6B7280] mt-1">
              ಏನ್ ಜಿ ಪೌಲ್ಟ್ರಿ ಫಾರಂ - ಸ್ವಾಗತ!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#F3F4F6] rounded-xl p-1">
                <TabsTrigger value="phone" className="rounded-lg font-bold text-xs uppercase tracking-wider">Phone</TabsTrigger>
                <TabsTrigger value="email" className="rounded-lg font-bold text-xs uppercase tracking-wider">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone">
                <form onSubmit={handlePhoneLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                      <Input 
                        type="tel" 
                        placeholder="9008979690" 
                        className="pl-10 h-12 rounded-xl border-[#E5E7EB] focus:ring-[#2D5A27]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10 h-12 rounded-xl border-[#E5E7EB] focus:ring-[#2D5A27]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl font-bold shadow-lg shadow-green-100 mt-2">
                    Login / ಲಾಗಿನ್
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                      <Input 
                        type="email" 
                        placeholder="mahigame90089@gmail.com" 
                        className="pl-10 h-12 rounded-xl border-[#E5E7EB] focus:ring-[#2D5A27]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">6-Digit Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                      <Input 
                        type="password" 
                        maxLength={6}
                        placeholder="123456" 
                        className="pl-10 h-12 rounded-xl border-[#E5E7EB] focus:ring-[#2D5A27]"
                        value={emailPassword}
                        onChange={(e) => setEmailPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl font-bold shadow-lg shadow-green-100 mt-2">
                    Login / ಲಾಗಿನ್
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
