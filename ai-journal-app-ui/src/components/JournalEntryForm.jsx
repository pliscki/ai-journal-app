import { useState, useRef } from 'react';

const JournalEntryForm = ({ onSubmit }) => {
  // Format date to YYYY-MM-DD for date input
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [entryText, setEntryText] = useState('');
  const [entryDate, setEntryDate] = useState(formatDate(new Date()));
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!entryText.trim()) {
      setError('Please enter some text for your journal entry.');
      return;
    }
    
    const newEntry = {
      id: Date.now().toString(),
      date: entryDate,
      text: entryText,
      timestamp: new Date().toISOString()
    };
    
    onSubmit(newEntry);
    setEntryText('');
    setError('');
    
    // Return focus to textarea after submission
    textareaRef.current.focus();
  };

  const handleKeyDown = (e) => {
    // Allow Ctrl+Enter to submit the form
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" role="region" aria-labelledby="form-heading">
      <h2 id="form-heading" className="text-xl font-bold text-gray-800 mb-4">Add Journal Entry</h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label 
            htmlFor="entry-date" 
            className="block mb-2 font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            type="date"
            id="entry-date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby={error ? "date-error" : undefined}
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="entry-text" 
            className="block mb-2 font-medium text-gray-700"
          >
            Journal entry:
          </label>
          <textarea
            id="entry-text"
            ref={textareaRef}
            placeholder="What did you accomplish today? Any challenges or insights?"
            value={entryText}
            onChange={(e) => {
              setEntryText(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? "textarea-error" : "textarea-hint"}
          />
          
          {error ? (
            <p id="textarea-error" className="mt-2 text-red-600" role="alert">
              {error}
            </p>
          ) : (
            <p id="textarea-hint" className="mt-1 text-sm text-gray-500">
              Press Ctrl+Enter to quickly save your entry.
            </p>
          )}
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Save journal entry"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default JournalEntryForm; 