const API_BASE_URL = 'https://localhost:7285/api';

// Format the date for the API (ISO format)
const formatDateForApi = (dateString) => {
  // Convert YYYY-MM-DD to full ISO date-time
  const date = new Date(dateString);
  return date.toISOString();
};

// Format date coming from API for our app
const formatDateFromApi = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Transform entry for display in our app
const transformEntryFromApi = (apiEntry) => ({
  id: apiEntry.id.toString(),
  text: apiEntry.content,
  date: formatDateFromApi(apiEntry.entryDate),
  timestamp: apiEntry.entryDate
});

// Transform entry for sending to API
const transformEntryForApi = (entry, isNew = false) => {
  const apiEntry = {
    content: entry.text,
    entryDate: formatDateForApi(entry.date)
  };
  
  if (!isNew) {
    apiEntry.id = Number(entry.id);
  }
  
  return apiEntry;
};

export const apiService = {
  // Get all journal entries
  async getAllEntries() {
    try {
      const response = await fetch(`${API_BASE_URL}/journal-entries`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.map(entry => transformEntryFromApi(entry));
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  },
  
  // Create a new journal entry
  async createEntry(entry) {
    try {
      const response = await fetch(`${API_BASE_URL}/journal-entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformEntryForApi(entry, true))
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // If the API returns the created entry
      const data = await response.json();
      return transformEntryFromApi(data);
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
  },
  
  // Update an existing journal entry
  async updateEntry(entry) {
    try {
      const response = await fetch(`${API_BASE_URL}/journal-entries/${entry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformEntryForApi(entry))
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // If the API returns the updated entry
      const data = await response.json();
      return transformEntryFromApi(data);
    } catch (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
  },
  
  // Delete a journal entry
  async deleteEntry(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/journal-entries/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  }
}; 