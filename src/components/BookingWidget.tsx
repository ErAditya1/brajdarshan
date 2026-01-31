import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { createBooking } from '@/utils/api';
import { toast } from 'sonner';

export const BookingWidget = ({ placeName, placeId }: { placeName: string, placeId: string }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    type: 'Darshan' // Darshan, Pooja, Guide
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    // Final Submit
    setLoading(true);
    try {
      await createBooking({ ...formData, placeId, placeName });
      setStep(3);
      toast.success('Booking request sent successfully!');
    } catch (err) {
      toast.error('Failed to book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 font-bold text-2xl">✓</div>
        <h3 className="font-serif font-bold text-xl mb-2">Booking Requested!</h3>
        <p className="text-gray-500 text-sm mb-4">Your request for {placeName} has been received. We will contact you shortly.</p>
        <button onClick={() => setStep(1)} className="text-[#E65100] font-medium text-sm hover:underline">Book another</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-[#E65100]/10 sticky top-24">
      <div className="mb-4 pb-4 border-b border-gray-100">
        <h3 className="font-serif font-bold text-lg text-[#2B2B2B]">Book Experience</h3>
        <p className="text-xs text-[#9AA4A6]">Plan your visit to {placeName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Service Type</label>
              <select 
                className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Darshan Assistance</option>
                <option>Private Pooja</option>
                <option>Local Guide</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-2.5 top-3 text-gray-400" />
                  <input 
                    type="date" 
                    required
                    className="w-full pl-8 p-2 border border-gray-200 rounded-lg text-sm"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
                <div className="relative">
                  <User size={14} className="absolute left-2.5 top-3 text-gray-400" />
                  <input 
                    type="number" 
                    min="1"
                    required
                    className="w-full pl-8 p-2 border border-gray-200 rounded-lg text-sm"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-[#E65100] hover:bg-[#D84B00] text-white py-3 rounded-lg font-bold text-sm transition-colors mt-2 flex items-center justify-center gap-2">
              Continue <ChevronRight size={16} />
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
             <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                required
                className="w-full p-2 border border-gray-200 rounded-lg text-sm"
                placeholder="+91"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2 mt-4">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium text-sm"
              >
                Back
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-[2] bg-[#E65100] hover:bg-[#D84B00] text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:opacity-70"
              >
                {loading ? 'Confirming...' : 'Confirm Request'}
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400">
              No payment required now. We will confirm via WhatsApp.
            </p>
          </>
        )}
      </form>
    </div>
  );
};
