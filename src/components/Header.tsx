import React from 'react';
import { ArrowLeft, Plus, Users } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onAdd?: () => void;
  onViewAll?: () => void;
  showAdd?: boolean;
  showViewAll?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onAdd,
  onViewAll,
  showAdd = false,
  showViewAll = false,
}) => {
  return (
    <header className="glass-header px-6 py-5 flex items-center justify-between sticky top-0 z-20 animate-fade-in">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-3 hover:bg-white/60 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
        )}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {showViewAll && onViewAll && (
          <button
            onClick={onViewAll}
            className="p-3 hover:bg-primary-100/60 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
          >
            <Users size={22} className="text-primary-600 group-hover:text-primary-700" />
          </button>
        )}
        {showAdd && onAdd && (
          <button
            onClick={onAdd}
            className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg"
          >
            <Plus size={22} className="text-white" />
          </button>
        )}
      </div>
    </header>
  );
};