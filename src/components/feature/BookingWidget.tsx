import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Users, CheckCircle, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Place } from '@/data/mockData';
import { cn } from '../ui/Button'; // using button's utility
import 'react-day-picker/dist/style.css';

interface BookingWidgetProps {
  place: Place;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingWidget({ place, isOpen, onClose }: BookingWidgetProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleNext = () => setStep((prev) => (prev < 3 ? prev + 1 : prev) as 1 | 2 | 3);
  const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev) as 1 | 2 | 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-saffron-50">
          <h2 className="font-serif text-lg font-bold text-saffron-800">
            {step === 3 ? 'Booking Confirmed' : `Book Darshan at ${place.name}`}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                   <div className="border rounded-lg p-2 flex justify-center bg-gray-50">
                     <DayPicker
                       mode="single"
                       selected={date}
                       onSelect={setDate}
                       disabled={{ before: new Date() }}
                       styles={{
                          head_cell: { color: 'var(--color-charcoal-900)' },
                          day: { color: 'var(--color-charcoal-900)' }
                       }}
                       modifiersClassNames={{
                         selected: 'bg-saffron-500 text-white rounded-full hover:bg-saffron-600'
                       }}
                     />
                   </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Devotees</label>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-8 text-center">{guests}</span>
                    <button 
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg flex gap-3 items-start text-sm text-blue-700">
                   <Info className="h-5 w-5 shrink-0 mt-0.5" />
                   <p>Booking a guide ensures a smooth darshan experience, avoiding long queues during peak hours.</p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border border-gray-100">
                   <div className="flex justify-between">
                      <span className="text-gray-500">Place</span>
                      <span className="font-medium">{place.name}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">{date ? format(date, 'PPP') : '-'}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-500">Devotees</span>
                      <span className="font-medium">{guests}</span>
                   </div>
                   <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-base font-bold text-saffron-700">
                      <span>Total Estimate</span>
                      <span>₹ {guests * 500}</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="flex gap-2">
                        <span className="inline-flex items-center px-3 rounded-md border border-gray-200 bg-gray-50 text-gray-500 text-sm">
                           +91
                        </span>
                        <Input 
                          placeholder="9876543210" 
                          type="tel"
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                   </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-24 border border-dashed border-gray-300 text-gray-400">
                   Razorpay Payment Placeholder
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                   <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-gray-900">Yatra Confirmed!</h3>
                   <p className="text-gray-500 mt-2">Your booking ID is <span className="font-mono font-medium text-gray-900">#BD-{Math.floor(Math.random() * 10000)}</span></p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-2">
                   <p>A confirmation has been sent to your phone.</p>
                   <p>Please reach the meeting point 15 mins before time.</p>
                </div>
                <Button variant="outline" className="w-full" onClick={onClose}>
                   Download Ticket
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        {step < 3 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between">
            {step > 1 ? (
              <Button variant="ghost" onClick={handleBack}>Back</Button>
            ) : (
              <div /> 
            )}
            <Button 
              onClick={handleNext} 
              disabled={step === 1 && !date}
              className="min-w-[120px]"
            >
              {step === 2 ? 'Pay & Confirm' : 'Next'}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
