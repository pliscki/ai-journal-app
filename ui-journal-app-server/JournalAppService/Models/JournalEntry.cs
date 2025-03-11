namespace JournalAppService.Models
{
    public class JournalEntry
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime EntryDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
