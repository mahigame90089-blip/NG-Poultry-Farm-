/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, MessageSquare, HelpCircle, User, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Message, User as UserType } from '../types';

interface HelpCenterProps {
  currentUser: UserType;
}

export default function HelpCenter({ currentUser }: HelpCenterProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      senderId: 'admin1',
      text: 'Hello! How can I help you today with your poultry farm?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Mock admin response
    setTimeout(() => {
      const adminResponse: Message = {
        id: `m${Date.now() + 1}`,
        senderId: 'admin1',
        text: 'Thank you for your question. I will get back to you shortly!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, adminResponse]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Help Center / ಸಹಾಯ ಕೇಂದ್ರ</h3>
          <p className="text-sm text-[#6B7280]">Ask questions to the administrator (Mahesh).</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold">Admin Online</span>
        </div>
      </div>

      <Card className="flex-1 border-none shadow-sm flex flex-col overflow-hidden bg-white">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((msg) => {
              const isAdmin = msg.senderId === 'admin1';
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isAdmin ? 'justify-start' : 'justify-end'} items-end gap-3`}
                >
                  {isAdmin && (
                    <div className="w-8 h-8 rounded-full bg-[#2D5A27] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      MA
                    </div>
                  )}
                  <div className={`max-w-[80%] space-y-1`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm ${
                      isAdmin 
                        ? 'bg-[#F3F4F6] text-[#1A1A1A] rounded-bl-none' 
                        : 'bg-[#2D5A27] text-white rounded-br-none shadow-md shadow-green-100'
                    }`}>
                      {msg.text}
                    </div>
                    <p className={`text-[10px] text-[#9CA3AF] font-medium ${isAdmin ? 'text-left' : 'text-right'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                  {!isAdmin && (
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#2D5A27] text-[10px] font-bold shrink-0 border border-[#E5E7EB]">
                      ME
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB]">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input 
              placeholder="Type your question here... / ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..." 
              className="flex-1 rounded-xl border-[#E5E7EB] bg-white h-12"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button type="submit" className="bg-[#2D5A27] hover:bg-[#23471E] text-white rounded-xl w-12 h-12 p-0 shadow-lg shadow-green-50">
              <Send size={20} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
