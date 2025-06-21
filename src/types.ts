export interface Person {
  id: string;
  name: string;
  birthday: string; // YYYY-MM-DD format
  avatar?: string;
  notes: string;
  likes: string[];
  dislikes: string[];
  previousGifts: Gift[];
}

export interface Gift {
  id: string;
  name: string;
  year: number;
  notes?: string;
}

export interface AppState {
  people: Person[];
  currentView: 'home' | 'add' | 'profile' | 'all';
  selectedPersonId?: string;
}