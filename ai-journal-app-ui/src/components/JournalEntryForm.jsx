import { useState, useRef, useEffect } from 'react';

const JournalEntryForm = ({ onSubmit, editingEntry = null, isSubmitting = false }) => {
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
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  
  // Update form when editingEntry changes
  useEffect(() => {
    if (editingEntry) {
      setEntryText(editingEntry.text);
      setEntryDate(editingEntry.date);
      setIsEditing(true);
      
      // Focus the textarea
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    } else {
      setIsEditing(false);
      setEntryText(''); // Reset text when not editing
      setEntryDate(formatDate(new Date())); // Reset date to today
      setError(''); // Clear any errors
    }
  }, [editingEntry]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!entryText.trim()) {
      setError('Please enter some text for your journal entry.');
      return;
    }
    
    const newEntry = {
      // If editing, use the existing ID, otherwise create a new one
      id: editingEntry ? editingEntry.id : Date.now().toString(),
      date: entryDate,
      text: entryText,
      timestamp: editingEntry ? editingEntry.timestamp : new Date().toISOString()
    };
    
    onSubmit(newEntry, isEditing);
    
    // Only clear the form if we're not editing
    if (!isEditing) {
      setEntryText('');
      setError('');
    }
    
    // Return focus to textarea after submission
    textareaRef.current.focus();
  };

  const handleCancel = () => {
    setEntryText('');
    setEntryDate(formatDate(new Date()));
    setIsEditing(false);
    setError('');
  };

  const handleKeyDown = (e) => {
    // Allow Ctrl+Enter to submit the form
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" role="region" aria-labelledby="form-heading">
      <h2 id="form-heading" className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? 'Edit Journal Entry' : 'Add Journal Entry'}
      </h2>
      
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
        
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className={`${
              isSubmitting 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            aria-label={isEditing ? "Save edited entry" : "Save new entry"}
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (isEditing ? 'Updating...' : 'Saving...') 
              : (isEditing ? 'Update Entry' : 'Save Entry')}
          </button>
          
          {isEditing && (
            <button 
              type="button" 
              onClick={handleCancel}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Cancel editing"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JournalEntryForm; 