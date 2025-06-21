import React, { useState } from 'react';
import { Person } from '../types';
import { Save, X, User, Calendar, Heart, MessageCircle } from 'lucide-react';

interface AddPersonFormProps {
  onSave: (person: Omit<Person, 'id'>) => void;
  onCancel: () => void;
}

export const AddPersonForm: React.FC<AddPersonFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    notes: '',
    likes: '',
    dislikes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthday) return;

    onSave({
      name: formData.name,
      birthday: formData.birthday,
      notes: formData.notes,
      likes: formData.likes.split(',').map(item => item.trim()).filter(Boolean),
      dislikes: formData.dislikes.split(',').map(item => item.trim()).filter(Boolean),
      previousGifts: [],
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        <div className="card-gradient">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Add New Person
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <User size={16} className="text-primary-500" />
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="input-field"
                placeholder="Enter their name"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Calendar size={16} className="text-primary-500" />
                Birthday *
              </label>
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => handleChange('birthday', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <MessageCircle size={16} className="text-primary-500" />
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="input-field resize-none"
                rows={3}
                placeholder="Any special notes about them..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Heart size={16} className="text-green-500" />
                Likes (comma separated)
              </label>
              <input
                type="text"
                value={formData.likes}
                onChange={(e) => handleChange('likes', e.target.value)}
                className="input-field"
                placeholder="books, coffee, hiking, music..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Heart size={16} className="text-red-500" />
                Dislikes (comma separated)
              </label>
              <input
                type="text"
                value={formData.dislikes}
                onChange={(e) => handleChange('dislikes', e.target.value)}
                className="input-field"
                placeholder="spicy food, loud music, crowds..."
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 flex items-center justify-center gap-3"
          >
            <X size={20} />
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formData.name || !formData.birthday}
            className="btn-primary flex-1 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save size={20} />
            Save Person
          </button>
        </div>
      </form>
    </div>
  );
};