import React from 'react';
import { Person } from '../types';
import { PersonCard } from './PersonCard';
import { getDaysUntilBirthday } from '../utils/dateUtils';
import { Calendar, Users, Sparkles } from 'lucide-react';

interface HomeViewProps {
  people: Person[];
  onPersonClick: (person: Person) => void;
  onViewAll: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ people, onPersonClick, onViewAll }) => {
  // Sort people by upcoming birthdays
  const sortedPeople = [...people].sort((a, b) => {
    const daysA = getDaysUntilBirthday(a.birthday);
    const daysB = getDaysUntilBirthday(b.birthday);
    return daysA - daysB;
  });

  const nextBirthday = sortedPeople[0];
  const upcomingBirthdays = sortedPeople.slice(1, 4); // Show next 3

  if (people.length === 0) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="card-gradient text-center py-16 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Calendar size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
            No Birthdays Yet
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Add your first birthday to get started and never forget another special day!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-8">
      {/* Next Birthday */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Next Birthday
          </h2>
        </div>
        <PersonCard
          person={nextBirthday}
          onClick={() => onPersonClick(nextBirthday)}
          isUpcoming={true}
        />
      </div>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
                Coming Up
              </h2>
            </div>
            {people.length > 4 && (
              <button
                onClick={onViewAll}
                className="bg-gradient-to-r from-primary-500 to-cyan-500 hover:from-primary-600 hover:to-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All ({people.length})
              </button>
            )}
          </div>
          <div className="space-y-4">
            {upcomingBirthdays.map((person, index) => (
              <div
                key={person.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <PersonCard
                  person={person}
                  onClick={() => onPersonClick(person)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};