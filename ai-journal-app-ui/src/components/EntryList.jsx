import { useMemo } from 'react';
import DayGroup from './DayGroup';

const EntryList = ({ entries, onEditEntry, onDeleteEntry, isLoading }) => {
  // Group entries by date
  const groupedEntries = useMemo(() => {
    return entries.reduce((groups, entry) => {
      const date = entry.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(entry);
      return groups;
    }, {});
  }, [entries]);

  // Get sorted dates (newest first)
  const sortedDates = useMemo(() => {
    return Object.keys(groupedEntries).sort().reverse();
  }, [groupedEntries]);

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mt-6" 
      role="region" 
      aria-labelledby="entries-heading"
    >
      <h2 id="entries-heading" className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Recent Entries
      </h2>
      
      <div aria-live="polite">
        {isLoading && entries.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            Loading journal entries...
          </p>
        ) : sortedDates.length === 0 ? (
          <p className="text-gray-500 italic text-center py-6">
            No journal entries yet. Start writing!
          </p>
        ) : (
          <ul className="list-none p-0 m-0">
            {sortedDates.map(date => (
              <li key={date}>
                <DayGroup 
                  date={date} 
                  entries={groupedEntries[date]}
                  onEdit={onEditEntry}
                  onDelete={onDeleteEntry}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EntryList; 