import React from 'react';
import { Calendar, Gift } from 'lucide-react';
import { Person } from '../types';
import { formatBirthday, getAge, getBirthdayStatus, isBirthdayToday } from '../utils/dateUtils';

interface PersonCardProps {
  person: Person;
  onClick: () => void;
  isUpcoming?: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onClick, isUpcoming = false }) => {
  const age = getAge(person.birthday);
  const birthdayStatus = getBirthdayStatus(person.birthday);
  const isToday = isBirthdayToday(person.birthday);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 animate-slide-up ${
        isToday 
          ? 'birthday-today shimmer float-animation' 
          : isUpcoming 
            ? 'card-gradient upcoming-card' 
            : 'card-gradient'
      }`}
    >
      <div className="flex items-center gap-5">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
          isToday 
            ? 'bg-gradient-to-br from-primary-500 via-cyan-400 to-blue-500 animate-bounce-gentle' 
            : 'bg-gradient-to-br from-primary-400 via-blue-500 to-cyan-500'
        }`}>
          {person.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-xl mb-1">{person.name}</h3>
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary-500" />
              <span className="font-medium">{formatBirthday(person.birthday)} (Age {age})</span>
            </div>
            {person.previousGifts.length > 0 && (
              <div className="flex items-center gap-2">
                <Gift size={16} className="text-cyan-500" />
                <span className="font-medium">{person.previousGifts.length} gifts</span>
              </div>
            )}
          </div>
        </div>
        
        <div className={`text-right ${isToday ? 'text-primary-700 font-bold' : 'text-gray-600'}`}>
          <div className="text-sm font-semibold mb-1">{birthdayStatus}</div>
          {isToday && (
            <div className="text-xs bg-gradient-to-r from-primary-500 to-cyan-500 bg-clip-text text-transparent font-bold animate-bounce-gentle">
              🎉 Birthday!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};