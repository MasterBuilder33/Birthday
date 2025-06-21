import React, { useState } from 'react';
import { Person, AppState } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { AddPersonForm } from './components/AddPersonForm';
import { PersonProfile } from './components/PersonProfile';
import { AllPeopleView } from './components/AllPeopleView';

function App() {
  const [people, setPeople] = useLocalStorage<Person[]>('birthday-people', []);
  const [appState, setAppState] = useState<AppState>({
    people,
    currentView: 'home',
  });

  const addPerson = (personData: Omit<Person, 'id'>) => {
    const newPerson: Person = {
      ...personData,
      id: Date.now().toString(),
    };
    
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    setAppState({ ...appState, currentView: 'home' });
  };

  const updatePerson = (updatedPerson: Person) => {
    const updatedPeople = people.map(person =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    setPeople(updatedPeople);
  };

  const navigateToProfile = (person: Person) => {
    setAppState({
      ...appState,
      currentView: 'profile',
      selectedPersonId: person.id,
    });
  };

  const navigateToAdd = () => {
    setAppState({ ...appState, currentView: 'add' });
  };

  const navigateToHome = () => {
    setAppState({ ...appState, currentView: 'home' });
  };

  const navigateToAll = () => {
    setAppState({ ...appState, currentView: 'all' });
  };

  const selectedPerson = appState.selectedPersonId
    ? people.find(p => p.id === appState.selectedPersonId)
    : null;

  const getHeaderProps = () => {
    switch (appState.currentView) {
      case 'home':
        return {
          title: 'Birthday Reminder',
          showAdd: true,
          showViewAll: people.length > 0,
          onAdd: navigateToAdd,
          onViewAll: navigateToAll,
        };
      case 'add':
        return {
          title: 'Add Person',
          onBack: navigateToHome,
        };
      case 'profile':
        return {
          title: selectedPerson?.name || 'Profile',
          onBack: navigateToHome,
        };
      case 'all':
        return {
          title: `All People (${people.length})`,
          onBack: navigateToHome,
          showAdd: true,
          onAdd: navigateToAdd,
        };
      default:
        return { title: 'Birthday Reminder' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header {...getHeaderProps()} />
      
      <main className="pb-6">
        {appState.currentView === 'home' && (
          <HomeView
            people={people}
            onPersonClick={navigateToProfile}
            onViewAll={navigateToAll}
          />
        )}
        
        {appState.currentView === 'add' && (
          <AddPersonForm
            onSave={addPerson}
            onCancel={navigateToHome}
          />
        )}
        
        {appState.currentView === 'profile' && selectedPerson && (
          <PersonProfile
            person={selectedPerson}
            onUpdate={updatePerson}
          />
        )}
        
        {appState.currentView === 'all' && (
          <AllPeopleView
            people={people}
            onPersonClick={navigateToProfile}
          />
        )}
      </main>
    </div>
  );
}

export default App;