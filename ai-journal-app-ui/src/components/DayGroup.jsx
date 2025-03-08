import { useMemo } from 'react';

const DayGroup = ({ date, entries }) => {
  // Format date for display: "Monday, September 4, 2023"
  const formattedDate = useMemo(() => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }, [date]);

  // Check if date is today
  const isToday = useMemo(() => {
    const today = new Date();
    const entryDate = new Date(date);
    return today.toDateString() === entryDate.toDateString();
  }, [date]);

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
            className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md"
            tabIndex="0"
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayGroup; 