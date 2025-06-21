import React from 'react';
import { Person } from '../types';
import { PersonCard } from './PersonCard';
import { getDaysUntilBirthday } from '../utils/dateUtils';
import { Users } from 'lucide-react';

interface AllPeopleViewProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
}

export const AllPeopleView: React.FC<AllPeopleViewProps> = ({ people, onPersonClick }) => {
  // Sort people by upcoming birthdays
  const sortedPeople = [...people].sort((a, b) => {
    const daysA = getDaysUntilBirthday(a.birthday);
    const daysB = getDaysUntilBirthday(b.birthday);
    return daysA - daysB;
  });

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl flex items-center justify-center">
          <Users size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          All Birthdays
        </h2>
      </div>
      
      <div className="space-y-4">
        {sortedPeople.map((person, index) => (
          <div
            key={person.id}
            className="animate-slide-up"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <PersonCard
              person={person}
              onClick={() => onPersonClick(person)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};