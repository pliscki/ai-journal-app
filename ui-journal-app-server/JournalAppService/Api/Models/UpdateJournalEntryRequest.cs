using System.ComponentModel.DataAnnotations;

namespace JournalAppService.Api.Models
{
    public class UpdateJournalEntryRequest
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public DateTime EntryDate { get; set; }
    }
}
