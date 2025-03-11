using JournalAppService.Api.Models;

namespace JournalAppService.Application
{
    public interface IJournalEntryService
    {
        Task<IEnumerable<JournalEntryResponse>> GetAllJournalEntriesAsync();
        Task<JournalEntryResponse?> GetJournalEntryByIdAsync(int id);
        Task<JournalEntryResponse> AddJournalEntryAsync(CreateJournalEntryRequest request);
        Task<JournalEntryResponse?> UpdateJournalEntryAsync(int id, UpdateJournalEntryRequest request);
        Task<bool> DeleteJournalEntryAsync(int id);
    }
}
