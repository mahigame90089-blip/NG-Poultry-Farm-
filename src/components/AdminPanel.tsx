import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, Upload, Save, Trash2, Plus, Video, Image as ImageIcon, ShoppingBag, Phone, MapPin } from 'lucide-react';
import { ChickenProduct, Order } from '../types';

interface AdminPanelProps {
  chickenProduct: ChickenProduct;
  setChickenProduct: React.Dispatch<React.SetStateAction<ChickenProduct>>;
  orders: Order[];
}

export default function AdminPanel({ chickenProduct, setChickenProduct, orders }: AdminPanelProps) {
  const [price, setPrice] = useState(chickenProduct.pricePerKg);
  const [photos, setPhotos] = useState<string[]>(chickenProduct.photos);
  const [videos, setVideos] = useState<string[]>(chickenProduct.videos);

  const handleSavePrice = () => {
    setChickenProduct(prev => ({ ...prev, pricePerKg: price }));
    alert('Price updated successfully!');
  };

  const handleUpdatePhoto = (index: number, url: string) => {
    const newPhotos = [...photos];
    newPhotos[index] = url;
    setPhotos(newPhotos);
  };

  const handleUpdateVideo = (index: number, url: string) => {
    const newVideos = [...videos];
    newVideos[index] = url;
    setVideos(newVideos);
  };

  const handleSaveMedia = () => {
    setChickenProduct(prev => ({ ...prev, photos, videos }));
    alert('Media updated successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Orders Notification Section */}
      <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#2D5A27]">
            <ShoppingBag size={20} />
            ಹೊಸ ಆರ್ಡರ್‌ಗಳು (New Orders)
          </CardTitle>
          <CardDescription>ಗ್ರಾಹಕರು ಮಾಡಿದ ಆರ್ಡರ್‌ಗಳ ವಿವರಗಳು ಇಲ್ಲಿವೆ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.length > 0 ? orders.map((order) => (
              <div key={order.id} className="p-4 bg-[#F3F4F6] rounded-2xl border border-[#E5E7EB] hover:border-[#2D5A27] transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#6B7280] uppercase">Customer</p>
                    <p className="font-bold text-lg">{order.userName}</p>
                    <div className="flex items-center gap-2 text-sm text-[#2D5A27] font-bold">
                      <Phone size={14} />
                      {order.userPhone}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#6B7280] uppercase">Order Details</p>
                    <p className="font-bold">{order.chickenType} - {order.weightKg}kg</p>
                    <p className="text-[#2D5A27] font-black">₹{order.totalPrice}</p>
                    <Badge className={order.paymentMethod === 'COD' ? 'bg-blue-500' : 'bg-emerald-500'}>
                      {order.paymentMethod}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#6B7280] uppercase">Location</p>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={14} className="mt-1 flex-shrink-0" />
                      <span>{order.address.village}, {order.address.taluk}, {order.address.state}</span>
                    </div>
                    <p className="text-[10px] text-[#6B7280] mt-2 font-medium">{order.date}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12 text-[#6B7280]">
                <ShoppingBag size={48} className="mx-auto mb-3 opacity-20" />
                <p className="font-bold">ಯಾವುದೇ ಆರ್ಡರ್‌ಗಳಿಲ್ಲ</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Price Settings */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#2D5A27]">
              <Settings size={20} />
              ಬೆಲೆ ನಿಗದಿ (Price Settings)
            </CardTitle>
            <CardDescription>ಒಂದು ಕೆಜಿ ಕೋಳಿಯ ಬೆಲೆಯನ್ನು ಇಲ್ಲಿ ಬದಲಿಸಿ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="font-bold">ಬೆಲೆ (Price per KG)</Label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#6B7280]">₹</span>
                  <Input 
                    id="price"
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="pl-8 text-lg font-bold rounded-xl"
                  />
                </div>
                <Button onClick={handleSavePrice} className="bg-[#2D5A27] hover:bg-[#23471E] rounded-xl">
                  <Save size={18} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="md:col-span-2 border-none shadow-xl bg-[#2D5A27] text-white">
          <CardHeader>
            <CardTitle>ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ (Admin Dashboard)</CardTitle>
            <CardDescription className="text-white/70">ಫಾರ್ಮ್‌ನ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣ ಇಲ್ಲಿದೆ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Total Photos</p>
                <p className="text-3xl font-black">{photos.length} / 5</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Total Videos</p>
                <p className="text-3xl font-black">{videos.length} / 2</p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Current Price</p>
                <p className="text-3xl font-black">₹{chickenProduct.pricePerKg}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photos Management */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-[#2D5A27]">
                <ImageIcon size={20} />
                ಫೋಟೋಗಳು (Photos - Max 5)
              </CardTitle>
              <CardDescription>ಕೋಳಿಗಳ ಫೋಟೋ ಲಿಂಕ್‌ಗಳನ್ನು ಇಲ್ಲಿ ನೀಡಿ</CardDescription>
            </div>
            <Button onClick={handleSaveMedia} className="bg-[#2D5A27] hover:bg-[#23471E] rounded-xl gap-2">
              <Save size={18} />
              Save All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {photos.map((photo, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-[#F3F4F6] rounded-2xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0">
                  <img src={photo} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-[10px] font-bold uppercase text-[#6B7280]">Photo URL {index + 1}</Label>
                  <Input 
                    value={photo} 
                    onChange={(e) => handleUpdatePhoto(index, e.target.value)}
                    className="h-8 text-xs rounded-lg border-none bg-white shadow-inner"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Videos Management */}
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-[#2D5A27]">
                <Video size={20} />
                ವಿಡಿಯೋಗಳು (Videos - Max 2)
              </CardTitle>
              <CardDescription>ಕೋಳಿಗಳ ವಿಡಿಯೋ ಲಿಂಕ್‌ಗಳನ್ನು ಇಲ್ಲಿ ನೀಡಿ</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-[#F3F4F6] rounded-2xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center text-[#2D5A27] flex-shrink-0">
                  <Video size={24} />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-[10px] font-bold uppercase text-[#6B7280]">Video URL {index + 1}</Label>
                  <Input 
                    value={video} 
                    onChange={(e) => handleUpdateVideo(index, e.target.value)}
                    className="h-8 text-xs rounded-lg border-none bg-white shadow-inner"
                  />
                </div>
              </div>
            ))}
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-sm">
              <p className="font-bold mb-1">ಸೂಚನೆ (Note):</p>
              <p>ನೇರ ವಿಡಿಯೋ ಲಿಂಕ್‌ಗಳನ್ನು (Direct MP4 links) ಮಾತ್ರ ಬಳಸಿ. ಯೂಟ್ಯೂಬ್ ಲಿಂಕ್‌ಗಳು ಇಲ್ಲಿ ಕೆಲಸ ಮಾಡುವುದಿಲ್ಲ.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
