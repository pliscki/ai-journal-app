import { useState, useEffect } from 'react';
import JournalEntryForm from './components/JournalEntryForm';
import EntryList from './components/EntryList';
import ConfirmDialog from './components/ConfirmDialog';
import { apiService } from './services/api';

function App() {
  const [entries, setEntries] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch entries on component mount
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getAllEntries();
        setEntries(data);
        setError(null);
      } catch (err) {
        setError('Failed to load journal entries. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEntries();
  }, []);
  
  const handleAddOrUpdateEntry = async (entry, isEditing) => {
    try {
      if (isEditing) {
        // Update existing entry
        setIsLoading(true);
        const updatedEntry = await apiService.updateEntry(entry);
        setEntries(entries.map(e => e.id === updatedEntry.id ? updatedEntry : e));
        setAnnouncement('Journal entry updated successfully.');
        setEditingEntry(null);
      } else {
        // Add new entry
        setIsLoading(true);
        const createdEntry = await apiService.createEntry(entry);
        setEntries([createdEntry, ...entries]);
        setAnnouncement('New journal entry added successfully.');
      }
      setError(null);
    } catch (err) {
      setError(isEditing ? 'Failed to update entry.' : 'Failed to create entry.');
      console.error(err);
    } finally {
      setIsLoading(false);
      
      // Clear announcement after screen readers have time to announce it
      setTimeout(() => {
        setAnnouncement('');
      }, 3000);
    }
  };
  
  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setAnnouncement('Editing journal entry. Form updated with entry details.');
  };
  
  const handleDeleteEntry = (entry) => {
    setDeleteCandidate(entry);
  };
  
  const confirmDelete = async () => {
    if (deleteCandidate) {
      try {
        setIsLoading(true);
        await apiService.deleteEntry(deleteCandidate.id);
        setEntries(entries.filter(entry => entry.id !== deleteCandidate.id));
        setAnnouncement('Journal entry deleted successfully.');
        setError(null);
      } catch (err) {
        setError('Failed to delete entry.');
        console.error(err);
      } finally {
        setIsLoading(false);
        setDeleteCandidate(null);
        
        // Clear announcement after screen readers have time to announce it
        setTimeout(() => {
          setAnnouncement('');
        }, 3000);
      }
    }
  };
  
  const cancelDelete = () => {
    setDeleteCandidate(null);
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
          {/* Error alert */}
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="fixed top-0 left-0 w-full h-1 bg-blue-200">
              <div className="h-1 bg-blue-600 animate-pulse" style={{ width: '30%' }}></div>
            </div>
          )}
          
          <JournalEntryForm 
            onSubmit={handleAddOrUpdateEntry} 
            editingEntry={editingEntry}
            isSubmitting={isLoading}
          />
          
          {/* Confirmation dialog for delete */}
          <ConfirmDialog 
            isOpen={!!deleteCandidate}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            message={`Are you sure you want to delete this journal entry? This action cannot be undone.`}
          />
          
          {/* Screen reader announcement area */}
          <div 
            className="sr-only" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
          >
            {announcement}
          </div>
          
          <EntryList 
            entries={entries} 
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App; 