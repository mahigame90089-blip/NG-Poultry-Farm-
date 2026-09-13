/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Navigation, Phone, Mail, Instagram, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function MapComponent() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#2D5A27]">Farm Location / ಫಾರ್ಮ್ ಸ್ಥಳ</h3>
          <p className="text-sm text-[#6B7280]">NG Poultry Farm: ಬಂಡ್ರಾಳ್, ಗಂಗಾವತಿ, ಕೊಪ್ಪಳ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Location Card */}
        <Card className="lg:col-span-2 border-none shadow-xl bg-white/90 backdrop-blur-md overflow-hidden">
          <div className="h-48 bg-[#2D5A27] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1000&auto=format&fit=crop" 
                alt="Farm Background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#2D5A27] mx-auto shadow-2xl mb-4">
                <MapPin size={40} />
              </div>
              <h4 className="text-2xl font-black text-white tracking-tight">NG Poultry Farm</h4>
            </div>
          </div>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">ವಿಳಾಸ (Address)</Label>
                  <div className="p-4 bg-[#F3F4F6] rounded-2xl space-y-1">
                    <p className="font-bold text-lg">ಬಂಡ್ರಾಳ್ (Bandral)</p>
                    <p className="text-[#6B7280]">ಗಂಗಾವತಿ ತಾಲೂಕು (Gangavathi Taluk)</p>
                    <p className="text-[#6B7280]">ಕೊಪ್ಪಳ ಜಿಲ್ಲೆ (Koppal District)</p>
                    <p className="text-[#6B7280]">ಕರ್ನಾಟಕ (Karnataka)</p>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider">Plus Code</p>
                      <p className="text-sm font-mono font-bold">FC9M+QFQ Banderhal</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">ಸಂಪರ್ಕಿಸಿ (Contact)</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[#2D5A27] font-bold">
                      <Phone size={18} />
                      <span>9008979690</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <Mail size={18} />
                      <span>mahigame90089@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <Instagram size={18} />
                      <span>@itz_me_mahesh_g</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">ಸಮಯ (Timings)</Label>
                  <div className="p-4 border-2 border-dashed border-[#E5E7EB] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Monday - Sunday</span>
                      <Badge className="bg-emerald-50 text-emerald-700 border-none">Open</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[#2D5A27] font-bold">
                      <Clock size={16} />
                      <span>6:00 AM - 9:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
                  <Info className="text-blue-600 flex-shrink-0" size={20} />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    ನೀವು ನೇರವಾಗಿ ನಮ್ಮ ಫಾರ್ಮ್‌ಗೆ ಬಂದು ಕೋಳಿಗಳನ್ನು ಖರೀದಿಸಬಹುದು. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಕರೆ ಮಾಡಿ.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-center gap-4">
              <Button 
                className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl gap-2 h-12 px-8 shadow-lg shadow-green-100"
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=FC9M%2BQFQ+Banderhal+Karnataka', '_blank')}
              >
                <Navigation size={18} />
                ಗೂಗಲ್ ಮ್ಯಾಪ್‌ನಲ್ಲಿ ನೋಡಿ (Open in Maps)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Side Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-[#2D5A27] text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">ಡೆಲಿವರಿ ಮಾಹಿತಿ (Delivery Info)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed">
                ನಾವು ಗಂಗಾವತಿ ಸುತ್ತಮುತ್ತಲಿನ ಆಯ್ದ ಸ್ಥಳಗಳಿಗೆ ಹೋಮ್ ಡೆಲಿವರಿ ನೀಡುತ್ತೇವೆ.
              </p>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">COD Available in:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white/10 text-white border-none text-[10px]">ಗಂಗಾವತಿ</Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-none text-[10px]">ಕನಕಗಿರಿ</Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border-none text-[10px]">ಬಸ ಪಟ್ಟಣ</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#2D5A27]">ನಮ್ಮ ಬಗ್ಗೆ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                NG Poultry Farm ಉತ್ತಮ ಗುಣಮಟ್ಟದ ನಾಟಿ ಮತ್ತು ಜವಾರಿ ಕೋಳಿಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ. ನಾವು ನೈಸರ್ಗಿಕ ವಿಧಾನದಲ್ಲಿ ಕೋಳಿಗಳನ್ನು ಸಾಕುತ್ತೇವೆ.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple Label component since it might not be exported from UI
function Label({ children, className }: { children: React.ReactNode, className?: string }) {
  return <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>;
}
