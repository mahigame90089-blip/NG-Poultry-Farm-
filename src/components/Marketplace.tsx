import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Scale, IndianRupee, Image as ImageIcon, PlayCircle, MapPin, Phone, MessageSquare, Bird, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChickenProduct, User, Transaction, Order, ChickenType } from '../types';
import { CHICKEN_TYPES, COD_LOCATIONS, PHONE_PE_NUMBER, PHONE_PE_QR_CODE } from '../constants';
import { Badge } from '@/components/ui/badge';

interface MarketplaceProps {
  chickenProduct: ChickenProduct;
  currentUser: User;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function Marketplace({ chickenProduct, currentUser, setTransactions, setOrders }: MarketplaceProps) {
  const [weight, setWeight] = useState<number>(1);
  const [chickenType, setChickenType] = useState<ChickenType>('BB83');
  const [step, setStep] = useState<'product' | 'address' | 'payment'>('product');
  const [isBuying, setIsBuying] = useState(false);
  
  const [address, setAddress] = useState({
    state: 'Karnataka',
    taluk: '',
    village: ''
  });

  const totalPrice = weight * chickenProduct.pricePerKg;
  const isCodAvailable = COD_LOCATIONS.includes(address.village.trim());

  const handlePlaceOrder = (paymentMethod: 'COD' | 'Online') => {
    setIsBuying(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhone: currentUser.phone,
        chickenType: chickenType,
        weightKg: weight,
        totalPrice: totalPrice,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        address: address,
        paymentMethod: paymentMethod
      };

      const newTransaction: Transaction = {
        id: `t-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'Income',
        category: 'Chicken Sales',
        amount: totalPrice,
        description: `Order for ${weight}kg ${chickenType} from ${currentUser.name}`
      };

      setOrders(prev => [newOrder, ...prev]);
      setTransactions(prev => [newTransaction, ...prev]);
      setIsBuying(false);
      setStep('product');
      
      // WhatsApp Notification Link
      const message = `ಹೊಸ ಆರ್ಡರ್ ಬಂದಿದೆ!\nಹೆಸರು: ${currentUser.name}\nಫೋನ್: ${currentUser.phone}\nಕೋಳಿ ವಿಧ: ${chickenType}\nತೂಕ: ${weight}kg\nಒಟ್ಟು ಬೆಲೆ: ₹${totalPrice}\nಸ್ಥಳ: ${address.village}, ${address.taluk}, ${address.state}\nಪೇಮೆಂಟ್: ${paymentMethod}`;
      const whatsappUrl = `https://wa.me/919008979690?text=${encodeURIComponent(message)}`;
      
      alert(`Order placed successfully! Total: ₹${totalPrice}. Please share your location on WhatsApp.`);
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {step === 'product' && (
          <motion.div 
            key="product"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Product Info */}
            <div className="space-y-6">
              <Card className="overflow-hidden border-none shadow-xl bg-white/80 backdrop-blur-md">
                <div className="relative h-80">
                  <img 
                    src={chickenProduct.photos[0]} 
                    alt="Chicken" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-[#2D5A27] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    ₹{chickenProduct.pricePerKg}/kg
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-[#2D5A27]">{chickenProduct.name}</CardTitle>
                  <CardDescription className="text-lg">ತಾಜಾ ಮತ್ತು ಆರೋಗ್ಯಕರ ಕೋಳಿ ಮಾಂಸ (Fresh & Healthy Chicken)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-[#6B7280]">ಕೋಳಿ ವಿಧ (Chicken Type)</Label>
                      <Select value={chickenType} onValueChange={(v: ChickenType) => setChickenType(v)}>
                        <SelectTrigger className="h-12 rounded-xl border-none bg-[#F3F4F6] shadow-inner font-bold">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CHICKEN_TYPES.map(type => (
                            <SelectItem key={type.id} value={type.id as ChickenType} className="font-medium">
                              {type.labelKn} ({type.label})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-[#F3F4F6] rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2D5A27] shadow-sm">
                        <Scale size={24} />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="weight" className="text-sm font-bold text-[#6B7280]">ತೂಕ (Weight in KG)</Label>
                        <div className="flex items-center gap-4 mt-1">
                          <Input 
                            id="weight"
                            type="number" 
                            min="0.5" 
                            step="0.5"
                            value={weight} 
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="text-xl font-bold h-12 rounded-xl border-none bg-white shadow-inner"
                          />
                          <span className="font-bold text-lg text-[#6B7280]">KG</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-[#2D5A27]/5 rounded-2xl border border-[#2D5A27]/10">
                    <div>
                      <p className="text-sm font-bold text-[#6B7280]">ಒಟ್ಟು ಬೆಲೆ (Total Price)</p>
                      <p className="text-4xl font-black text-[#2D5A27]">₹{totalPrice.toFixed(2)}</p>
                    </div>
                    <Button 
                      size="lg" 
                      onClick={() => setStep('address')}
                      disabled={weight <= 0}
                      className="bg-[#2D5A27] hover:bg-[#23471E] text-white h-16 px-8 rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-green-100"
                    >
                      <ShoppingCart size={24} />
                      ಮುಂದೆ (Next)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Videos Section */}
              <div className="grid grid-cols-2 gap-4">
                {chickenProduct.videos.map((video, index) => (
                  <Card key={index} className="overflow-hidden border-none shadow-lg bg-white/80 backdrop-blur-md">
                    <div className="relative aspect-video">
                      <video 
                        src={video} 
                        className="w-full h-full object-cover"
                        poster={chickenProduct.photos[index + 1]}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer">
                        <PlayCircle size={48} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div className="p-3 text-center font-bold text-sm text-[#2D5A27]">
                      ಫಾರ್ಮ್ ವಿಡಿಯೋ {index + 1}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-6">
              {/* Chicken Types Display */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-md overflow-hidden">
                <CardHeader className="bg-[#2D5A27] text-white py-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bird size={20} />
                    ನಮ್ಮಲ್ಲಿ ದೊರೆಯುವ ಕೋಳಿಗಳು (Available Chicken Types)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {CHICKEN_TYPES.map(type => (
                      <div 
                        key={type.id} 
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-1 ${
                          chickenType === type.id 
                            ? 'border-[#2D5A27] bg-[#2D5A27]/5' 
                            : 'border-transparent bg-[#F3F4F6] hover:bg-[#E5E7EB]'
                        }`}
                        onClick={() => setChickenType(type.id as ChickenType)}
                      >
                        <span className="font-bold text-[#2D5A27] text-sm">{type.labelKn}</span>
                        <span className="text-[10px] text-[#6B7280] font-medium">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* COD Locations Display */}
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-md overflow-hidden">
                <CardHeader className="bg-blue-600 text-white py-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin size={20} />
                    ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ ಸ್ಥಳಗಳು (COD Locations)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {COD_LOCATIONS.map((loc, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 rounded-full font-bold text-[10px]">
                        {loc}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#6B7280] mt-3 font-medium italic">
                    * ಈ ಮೇಲಿನ ಸ್ಥಳಗಳಿಗೆ ಮಾತ್ರ ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ ಲಭ್ಯವಿದೆ.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {chickenProduct.photos.slice(1).map((photo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square rounded-3xl overflow-hidden shadow-lg"
                  >
                    <img 
                      src={photo} 
                      alt={`Chicken ${index + 2}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
              
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-md overflow-hidden border-l-4 border-amber-500">
                <CardHeader className="bg-amber-50 py-4">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-700">
                    <AlertTriangle size={20} />
                    ಪ್ರಮುಖ ಸೂಚನೆ (Important Note)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {[
                      "ನಾವು ಕೋಳಿಗಳನ್ನು ತರುವುದು ಮತ್ತೆ ಮಾರುವ ಉದ್ದೇಶವನ್ನು ಹೊಂದಿದ್ದೇವೆ.",
                      "ನೀವು ಕೋಳಿಗಳನ್ನು ಪಡೆಯಬೇಕೆಂದರೆ ಮೊದಲು ಕೋಳಿಗಳನ್ನು ಕೇಜಿಗಳ ಲೆಕ್ಕದಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಬೇಕು.",
                      "ನಾವು ಯಾವುದೇ ರೀತಿಯ ಮೋಸ ಮಾಡುವ ಉದ್ದೇಶವನ್ನು ಹೊಂದಿರುವುದಿಲ್ಲ.",
                      "ನೀವು ಕ್ಯಾಶ್ ಕೊಟ್ಟು ಕೋಳಿಗಳನ್ನು ಪಡೆಯಬೇಕೆಂದರೆ ನಮ್ಮ ಲೊಕೇಶನ್ ಗೆ ಬಂದು ಕೋಳಿಗಳನ್ನು ಪಡೆಯಬಹುದು.",
                      "ನೀವು ಕೋಳಿಗಳನ್ನು ಪಡೆಯುವ ಉದ್ದೇಶವನ್ನು ಹೊಂದಿದ್ದರೆ ಮಾತ್ರ ಆರ್ಡರ್ ಮಾಡಿ ಸುಮ್ನೆ ಸಮಯ ವ್ಯರ್ಥ ಮಾಡಬೇಡಿ.",
                      "ನಾವು ಕೊಪ್ಪಳ ಜಿಲ್ಲೆಯ ಸುತ್ತಮುತ್ತಲಿನ ತಾಲೂಕುಗಳ, ಗ್ರಾಮಗಳಿಗೆ ನಾವು ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ ಕೋಳಿಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
                      "ನಂಬಿಕೆ ಇದ್ದರೆ ಕೋಳಿಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ ಇಲ್ಲವಾದರೆ ನಮ್ಮ ಲೊಕೇಶನ್ ಗೆ ಬಂದು ಕೋಳಿಗಳನ್ನು ಕೊಂಡಯಿರಿ.",
                      "ಇಂತಿ ನಿಮ್ಮ NG Poultry Farm ನಿಮಗೆ ಯಾವಾಗಲೂ ಸಪೋರ್ಟ್ ಆಗಿರುತ್ತೆ."
                    ].map((note, i) => (
                      <li key={i} className="flex gap-3 text-sm font-bold text-[#4B5563] leading-relaxed">
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-[#2D5A27] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon size={20} />
                    ನಮ್ಮ ಫಾರ್ಮ್ ಬಗ್ಗೆ (About Our Farm)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/80 leading-relaxed space-y-4">
                  <p className="font-bold text-white">ನಮ್ಮ ಲೊಕೇಶನ್ (Our Location):</p>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <p>ಡಿಸ್ಟಿಕ್ : ಕೊಪ್ಪಳ (Koppal)</p>
                    <p>ತಾಲ್ಲೂಕ್ : ಗಂಗಾವತಿ (Gangavathi)</p>
                    <p>ವಿಲ್ಲೇಜ್ : ಬಂಡ್ರಾಳ್ (Bandral)</p>
                    <p className="mt-2 font-bold text-white">ಇಂತಿ ನಿಮ್ಮ NG Poultry Farm</p>
                  </div>
                  <p>ನೀವು ಈ ಕೋಳಿಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿದಾಗ ವಾಟ್ಸಪ್ ಮೂಲಕ ನಿಮ್ಮ ಲೊಕೇಶನ್ ಕಳಿಸಿದರೇ ನಾವು ತಲುಪಿಸುತ್ತೇವೆ ಇಲ್ಲವಾದರೆ ನೀವೇ ನಮ್ಮ ಫಾರ್ಮ್‌ಗೆ ಬಂದು ಕೊಂಡೆಯಬಹುದು.</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {step === 'address' && (
          <motion.div 
            key="address"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#2D5A27] flex items-center gap-2">
                  <MapPin size={24} />
                  ನಿಮ್ಮ ವಿಳಾಸ (Your Address)
                </CardTitle>
                <CardDescription>ಡೆಲಿವರಿಗಾಗಿ ನಿಮ್ಮ ಸ್ಥಳದ ವಿವರಗಳನ್ನು ನೀಡಿ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold">ರಾಜ್ಯ (State)</Label>
                    <Input value={address.state} readOnly className="bg-[#F3F4F6] rounded-xl border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">ತಾಲೂಕು (Taluk)</Label>
                    <Input 
                      placeholder="Enter Taluk" 
                      value={address.taluk} 
                      onChange={(e) => setAddress({...address, taluk: e.target.value})}
                      className="rounded-xl border-[#E5E7EB] focus:ring-[#2D5A27]" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold">ಗ್ರಾಮಾಂತರ/ಸ್ಥಳ (Village/Location)</Label>
                  <Input 
                    placeholder="Enter Village Name" 
                    value={address.village} 
                    onChange={(e) => setAddress({...address, village: e.target.value})}
                    className="rounded-xl border-[#E5E7EB] focus:ring-[#2D5A27]" 
                  />
                  <p className="text-[10px] text-[#6B7280] font-medium">
                    ಸೂಚನೆ: ಕ್ಯಾಶ್ ಆನ್ ಡೆಲಿವರಿ ಆಯ್ದ ಸ್ಥಳಗಳಿಗೆ ಮಾತ್ರ ಲಭ್ಯವಿದೆ.
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep('product')} className="flex-1 h-12 rounded-xl">ಹಿಂದಕ್ಕೆ (Back)</Button>
                  <Button 
                    onClick={() => setStep('payment')} 
                    disabled={!address.taluk || !address.village}
                    className="flex-1 h-12 rounded-xl bg-[#2D5A27] hover:bg-[#23471E]"
                  >
                    ಮುಂದೆ (Next)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div 
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#2D5A27] flex items-center gap-2">
                  <IndianRupee size={24} />
                  ಪಾವತಿ ವಿಧಾನ (Payment Method)
                </CardTitle>
                <CardDescription>ನಿಮ್ಮ ಆರ್ಡರ್ ಪೂರ್ಣಗೊಳಿಸಲು ಪಾವತಿ ವಿಧಾನವನ್ನು ಆರಿಸಿ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-[#F3F4F6] rounded-2xl space-y-2">
                  <div className="flex justify-between font-bold text-sm">
                    <span>Item: {chickenType}</span>
                    <span>{weight}kg</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-[#2D5A27]">
                    <span>Total Amount:</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {isCodAvailable ? (
                    <Button 
                      variant="outline" 
                      onClick={() => handlePlaceOrder('COD')}
                      disabled={isBuying}
                      className="h-20 rounded-2xl border-2 border-[#2D5A27] hover:bg-[#2D5A27]/5 flex flex-col items-center justify-center gap-1"
                    >
                      <span className="font-black text-lg text-[#2D5A27]">Cash on Delivery (COD)</span>
                      <span className="text-[10px] text-[#6B7280]">ಸ್ಥಳೀಯ ಡೆಲಿವರಿ ಲಭ್ಯವಿದೆ</span>
                    </Button>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center">
                      <p className="text-sm font-bold text-amber-800">ಈ ಸ್ಥಳಕ್ಕೆ COD ಲಭ್ಯವಿಲ್ಲ.</p>
                      <p className="text-[10px] text-amber-700">ದಯವಿಟ್ಟು ಆನ್‌ಲೈನ್ ಪಾವತಿ ಮಾಡಿ.</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="p-6 border-2 border-dashed border-[#E5E7EB] rounded-2xl text-center space-y-4">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="w-48 h-48 bg-white p-2 rounded-2xl shadow-inner border border-gray-100">
                          <img 
                            src={PHONE_PE_QR_CODE} 
                            alt="PhonePe QR Code" 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-[#2D5A27]">
                          <Phone size={20} />
                          <span className="font-black text-xl">PhonePe: {PHONE_PE_NUMBER}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#6B7280] font-medium">ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ ನಂಬರ್ ಬಳಸಿ ಪಾವತಿ ಮಾಡಿ. ಪಾವತಿ ಮಾಡಿದ ನಂತರ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ವಾಟ್ಸಪ್ ಮಾಡಿ.</p>
                      <Button 
                        onClick={() => handlePlaceOrder('Online')}
                        disabled={isBuying}
                        className="w-full h-14 bg-[#2D5A27] hover:bg-[#23471E] rounded-xl font-bold text-lg"
                      >
                        ಆನ್‌ಲೈನ್ ಪಾವತಿ ಮಾಡಿದ್ದೇನೆ (Paid Online)
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" onClick={() => setStep('address')} className="w-full">ಹಿಂದಕ್ಕೆ (Back)</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
