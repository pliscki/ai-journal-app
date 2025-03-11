using JournalAppService.Api.Models;
using JournalAppService.Application.Extensions;
using JournalAppService.Infrastructure;
using JournalAppService.Models;

namespace JournalAppService.Application
{
    public class JournalEntryService : IJournalEntryService
    {
        private readonly IJournalRepository _repository;

        public JournalEntryService(IJournalRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<IEnumerable<JournalEntryResponse>> GetAllJournalEntriesAsync()
        {
            var entries = await _repository.GetAllJournalEntriesAsync();
            return entries.Select(x => x.ToResponse());
        }

        public async Task<JournalEntryResponse?> GetJournalEntryByIdAsync(int id)
        {
            var entry = await _repository.GetJournalEntryByIdAsync(id);
            return entry != null ? entry.ToResponse() : null;
        }
        
        public async Task<JournalEntryResponse> AddJournalEntryAsync(CreateJournalEntryRequest request)
        {
            JournalEntry entity = request.ToEntity();
            var result = await _repository.AddJournalEntryAsync(entity);
            return result.ToResponse();
        }
        
        public async Task<JournalEntryResponse?> UpdateJournalEntryAsync(int id, UpdateJournalEntryRequest request)
        {
            JournalEntry entity = request.ToEntity();
            
            var result = await _repository.UpdateJournalEntryAsync(entity);
            return result != null ? result.ToResponse() : null;
        }
        
        public async Task<bool> DeleteJournalEntryAsync(int id)
        {
            return await _repository.DeleteJournalEntryAsync(id);
        }
    }
}
