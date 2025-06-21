import React, { useState } from 'react';
import { Person, Gift } from '../types';
import { formatBirthday, getAge, getBirthdayStatus } from '../utils/dateUtils';
import { Calendar, Heart, HeartOff, Gift as GiftIcon, Plus, Trash2, MessageCircle, Sparkles } from 'lucide-react';

interface PersonProfileProps {
  person: Person;
  onUpdate: (person: Person) => void;
}

export const PersonProfile: React.FC<PersonProfileProps> = ({ person, onUpdate }) => {
  const [showAddGift, setShowAddGift] = useState(false);
  const [newGift, setNewGift] = useState({ name: '', year: new Date().getFullYear(), notes: '' });

  const age = getAge(person.birthday);
  const birthdayStatus = getBirthdayStatus(person.birthday);

  const handleAddGift = () => {
    if (!newGift.name) return;

    const gift: Gift = {
      id: Date.now().toString(),
      name: newGift.name,
      year: newGift.year,
      notes: newGift.notes,
    };

    onUpdate({
      ...person,
      previousGifts: [...person.previousGifts, gift],
    });

    setNewGift({ name: '', year: new Date().getFullYear(), notes: '' });
    setShowAddGift(false);
  };

  const handleRemoveGift = (giftId: string) => {
    onUpdate({
      ...person,
      previousGifts: person.previousGifts.filter(gift => gift.id !== giftId),
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-8">
      {/* Profile Header */}
      <div className="card-gradient text-center animate-fade-in">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 via-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-xl">
          {person.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
          {person.name}
        </h2>
        <div className="flex items-center justify-center gap-3 text-gray-600 mb-4">
          <Calendar size={18} className="text-primary-500" />
          <span className="font-semibold text-lg">{formatBirthday(person.birthday)} (Age {age})</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-lg">
          <Sparkles size={16} />
          {birthdayStatus}
        </div>
      </div>

      {/* Notes */}
      {person.notes && (
        <div className="card-gradient animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle size={20} className="text-primary-500" />
            <h3 className="font-bold text-gray-900 text-lg">Notes</h3>
          </div>
          <p className="text-gray-700 leading-relaxed bg-white/50 rounded-2xl p-4">{person.notes}</p>
        </div>
      )}

      {/* Likes */}
      {person.likes.length > 0 && (
        <div className="card-gradient animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-4">
            <Heart size={20} className="text-green-500" />
            <h3 className="font-bold text-gray-900 text-lg">Likes</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {person.likes.map((like, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm border border-green-200/50"
              >
                {like}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dislikes */}
      {person.dislikes.length > 0 && (
        <div className="card-gradient animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-4">
            <HeartOff size={20} className="text-red-500" />
            <h3 className="font-bold text-gray-900 text-lg">Dislikes</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {person.dislikes.map((dislike, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-red-100 to-pink-100 text-red-800 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm border border-red-200/50"
              >
                {dislike}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Previous Gifts */}
      <div className="card-gradient animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GiftIcon size={20} className="text-purple-500" />
            <h3 className="font-bold text-gray-900 text-lg">
              Previous Gifts ({person.previousGifts.length})
            </h3>
          </div>
          <button
            onClick={() => setShowAddGift(!showAddGift)}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          >
            <Plus size={18} className="text-white" />
          </button>
        </div>

        {showAddGift && (
          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-purple-200/50 animate-slide-up">
            <div className="space-y-4">
              <input
                type="text"
                value={newGift.name}
                onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                placeholder="Gift name"
                className="input-field"
              />
              <input
                type="number"
                value={newGift.year}
                onChange={(e) => setNewGift({ ...newGift, year: parseInt(e.target.value) })}
                placeholder="Year"
                className="input-field"
              />
              <input
                type="text"
                value={newGift.notes}
                onChange={(e) => setNewGift({ ...newGift, notes: e.target.value })}
                placeholder="Notes (optional)"
                className="input-field"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddGift(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGift}
                  disabled={!newGift.name}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:transform-none"
                >
                  Add Gift
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {person.previousGifts.length === 0 ? (
            <div className="text-center py-8">
              <GiftIcon size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No gifts recorded yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first gift to keep track!</p>
            </div>
          ) : (
            person.previousGifts.map((gift, index) => (
              <div 
                key={gift.id} 
                className="bg-gradient-to-r from-white/80 to-purple-50/60 backdrop-blur-sm rounded-2xl p-5 flex items-start justify-between border border-purple-200/30 shadow-sm animate-slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{gift.name}</h4>
                  <p className="text-sm text-primary-600 font-semibold mb-1">Year: {gift.year}</p>
                  {gift.notes && (
                    <p className="text-sm text-gray-600 bg-white/60 rounded-xl p-2 mt-2">{gift.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveGift(gift.id)}
                  className="p-2 hover:bg-red-100/60 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ml-3"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};