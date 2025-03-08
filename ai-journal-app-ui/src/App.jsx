import { useState } from 'react';
import JournalEntryForm from './components/JournalEntryForm';
import EntryList from './components/EntryList';
import { mockEntries } from './mockData';

function App() {
  const [entries, setEntries] = useState(mockEntries);
  const [announcement, setAnnouncement] = useState('');
  
  const handleAddEntry = (newEntry) => {
    setEntries([newEntry, ...entries]);
    setAnnouncement('New journal entry added successfully.');
    
    // Clear announcement after screen readers have time to announce it
    setTimeout(() => {
      setAnnouncement('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full absolute inset-0">
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-blue-600 focus:text-white focus:p-4">
        Skip to main content
      </a>
      
      <header className="bg-white shadow-sm w-full" role="banner">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">AI Journal</h1>
          <p className="text-gray-600 mt-1">Record your professional journey</p>
        </div>
      </header>
      
      <main id="main-content" className="w-full" tabIndex="-1">
        <div className="max-w-4xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <JournalEntryForm onSubmit={handleAddEntry} />
          
          {/* Screen reader announcement area */}
          <div 
            className="sr-only" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
          >
            {announcement}
          </div>
          
          <EntryList entries={entries} />
        </div>
      </main>
    </div>
  );
}

export default App; 