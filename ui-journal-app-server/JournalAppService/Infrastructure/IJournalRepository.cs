using JournalAppService.Models;

namespace JournalAppService.Infrastructure
{
    public interface IJournalRepository
    {
        Task<JournalEntry> GetJournalEntryByIdAsync(int id);
        Task<IEnumerable<JournalEntry>> GetAllJournalEntriesAsync();
        Task<JournalEntry> AddJournalEntryAsync(JournalEntry journalEntry);
        Task<JournalEntry?> UpdateJournalEntryAsync(JournalEntry journalEntry);
        Task<bool> DeleteJournalEntryAsync(int id);
    }
} 