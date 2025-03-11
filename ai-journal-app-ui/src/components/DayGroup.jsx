import { useMemo, useState } from 'react';

const DayGroup = ({ date, entries, onEdit, onDelete }) => {
  const [activeEntryId, setActiveEntryId] = useState(null);
  
  // Format date for display: "Monday, September 4, 2023"
  const formattedDate = useMemo(() => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    // Fix timezone issue by parsing date parts and creating a date with local timezone
    const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
    // Month is 0-indexed in JavaScript Date
    const localDate = new Date(year, month - 1, day);
    
    return localDate.toLocaleDateString(undefined, options);
  }, [date]);

  // Check if date is today (also need to fix this for timezone consistency)
  const isToday = useMemo(() => {
    const today = new Date();
    const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
    const entryDate = new Date(year, month - 1, day);
    
    return today.getDate() === entryDate.getDate() && 
           today.getMonth() === entryDate.getMonth() && 
           today.getFullYear() === entryDate.getFullYear();
  }, [date]);
  
  const handleEntryFocus = (id) => {
    setActiveEntryId(id);
  };
  
  const handleEntryBlur = (e) => {
    // Only blur if we're not moving focus to one of the entry's buttons
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setActiveEntryId(null);
    }
  };
  
  const handleKeyDown = (e, entry) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveEntryId(entry.id === activeEntryId ? null : entry.id);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2" role="heading" aria-level="3">
        <h3 className="text-lg font-semibold text-gray-700">
          {formattedDate}
        </h3>
        {isToday && (
          <span 
            className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            aria-label="Today"
          >
            Today
          </span>
        )}
      </div>
      
      <ul className="space-y-3 list-none p-0 m-0">
        {entries.map(entry => (
          <li 
            key={entry.id} 
            className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md relative group"
            tabIndex="0"
            onFocus={() => handleEntryFocus(entry.id)}
            onBlur={handleEntryBlur}
            onKeyDown={(e) => handleKeyDown(e, entry)}
            aria-label={`Journal entry from ${new Date(entry.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}`}
          >
            <div className="text-sm text-gray-500 mb-1">
              <time dateTime={entry.timestamp}>
                {new Date(entry.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">
              {entry.text}
            </p>
            
            {/* Edit and Delete buttons that show on hover/focus */}
            <div 
              className={`absolute bottom-2 right-2 flex space-x-2 transition-opacity duration-200 ${
                activeEntryId === entry.id || entry.id === activeEntryId
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <button
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => onEdit(entry)}
                aria-label="Edit this entry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => onDelete(entry)}
                aria-label="Delete this entry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayGroup; 