/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User as UserIcon, Phone, Mail, Instagram, ShieldCheck, UserCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User } from '../types';

interface ProfileProps {
  currentUser: User;
}

export default function Profile({ currentUser }: ProfileProps) {
  const adminProfile: User = {
    id: 'admin1',
    name: 'Mahesh',
    phone: '9008979690',
    email: 'mahigame90089@gmail.com',
    role: 'Admin',
    instagram: 'itz_me_mahesh_g',
    address: {
      state: 'Karnataka',
      taluk: 'Gangavathi',
      village: 'Bandral',
      district: 'Koppal'
    }
  };

  const ProfileCard = ({ user, isAdmin }: { user: User, isAdmin?: boolean }) => (
    <Card className={`border-none shadow-sm overflow-hidden ${isAdmin ? 'bg-[#2D5A27] text-white' : 'bg-white'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${isAdmin ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#2D5A27]'}`}>
            {isAdmin ? <ShieldCheck size={32} /> : <UserCircle size={32} />}
          </div>
          <Badge className={isAdmin ? 'bg-white/20 text-white border-none' : 'bg-emerald-50 text-emerald-700 border-none'}>
            {user.role}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold mt-4">{user.name}</CardTitle>
        <CardDescription className={isAdmin ? 'text-white/70' : 'text-[#6B7280]'}>
          {isAdmin ? 'Farm Administrator' : 'Registered Farmer'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator className={isAdmin ? 'bg-white/10' : 'bg-[#F3F4F6]'} />
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone size={18} className={isAdmin ? 'text-white/60' : 'text-[#9CA3AF]'} />
            <span className="font-medium">{user.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className={isAdmin ? 'text-white/60' : 'text-[#9CA3AF]'} />
            <span className="font-medium">{user.email}</span>
          </div>
          {user.instagram && (
            <div className="flex items-center gap-3">
              <Instagram size={18} className={isAdmin ? 'text-white/60' : 'text-[#9CA3AF]'} />
              <span className="font-medium">@{user.instagram}</span>
            </div>
          )}
          {isAdmin && (
            <div className="flex items-start gap-3 mt-2 pt-2 border-t border-white/10">
              <MapPin size={18} className="text-white/60 mt-1" />
              <div className="text-sm">
                <p className="font-bold">NG Poultry Farm</p>
                <p className="opacity-80">ಬಂಡ್ರಾಳ್, ಗಂಗಾವತಿ, ಕೊಪ್ಪಳ</p>
                <p className="opacity-80">(Bandral, Gangavathi, Koppal)</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold">Profiles / ಪ್ರೊಫೈಲ್‌ಗಳು</h3>
        <p className="text-sm text-[#6B7280]">Manage your account and contact administrator.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] px-1">Your Profile / ನಿಮ್ಮ ಪ್ರೊಫೈಲ್</h4>
          <ProfileCard user={currentUser} />
        </div>
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] px-1">Admin Profile / ಅಡ್ಮಿನ್ ಪ್ರೊಫೈಲ್</h4>
          <ProfileCard user={adminProfile} isAdmin />
        </div>
      </div>
    </div>
  );
}
