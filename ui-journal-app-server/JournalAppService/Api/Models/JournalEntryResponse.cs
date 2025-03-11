namespace JournalAppService.Api.Models
{
    public class JournalEntryResponse
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime EntryDate { get; set; }
    }
} 