using System.ComponentModel.DataAnnotations;

namespace JournalAppService.Api.Models
{
    public class CreateJournalEntryRequest
    {
        [Required]
        public string Content { get; set; } = string.Empty;
        
        [Required]
        public DateTime EntryDate { get; set; }
    }

    
} 