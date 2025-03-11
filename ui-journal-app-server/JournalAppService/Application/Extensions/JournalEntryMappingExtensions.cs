using JournalAppService.Api.Models;
using JournalAppService.Models;

namespace JournalAppService.Application.Extensions
{
    public static class JournalEntryMappingExtensions
    {
        public static JournalEntry ToEntity(this CreateJournalEntryRequest request)
        {
            return new JournalEntry
            {
                Content = request.Content,
                EntryDate = request.EntryDate
            };
        }

        public static JournalEntry ToEntity(this UpdateJournalEntryRequest request)
        {
            return new JournalEntry
            {
                Id = request.Id,
                Content = request.Content,
                EntryDate = request.EntryDate
            };
        }

        public static JournalEntryResponse ToResponse(this JournalEntry entity)
        {
            return new JournalEntryResponse
            {
                Id = entity.Id,
                Content = entity.Content,
                EntryDate = entity.EntryDate
            };
        }
    }
}
