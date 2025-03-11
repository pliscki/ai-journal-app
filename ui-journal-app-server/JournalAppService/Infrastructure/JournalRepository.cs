using JournalAppService.Models;
using Microsoft.EntityFrameworkCore;

namespace JournalAppService.Infrastructure
{
    public class JournalRepository : IJournalRepository
    {
        private readonly JournalDbContext _dbContext;

        public JournalRepository(JournalDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<JournalEntry> GetJournalEntryByIdAsync(int id)
        {
            var entry = await _dbContext.JournalEntries.FindAsync(id);
            if (entry == null)
                throw new KeyNotFoundException($"Journal entry with ID {id} not found");
            
            return entry;
        }

        public async Task<IEnumerable<JournalEntry>> GetAllJournalEntriesAsync()
        {
            return await _dbContext.JournalEntries
                .OrderByDescending(e => e.EntryDate)
                .ToListAsync();
        }

        public async Task<JournalEntry> AddJournalEntryAsync(JournalEntry journalEntry)
        {
            journalEntry.CreatedAt = DateTime.UtcNow;
            journalEntry.UpdatedAt = DateTime.UtcNow;

            _dbContext.JournalEntries.Add(journalEntry);
            await _dbContext.SaveChangesAsync();
            return journalEntry;
        }

        public async Task<JournalEntry?> UpdateJournalEntryAsync(JournalEntry journalEntry)
        {
            var existingEntry = await _dbContext.JournalEntries.FindAsync(journalEntry.Id);
            if (existingEntry == null)
                return null;

            existingEntry.Content = journalEntry.Content;
            existingEntry.EntryDate = journalEntry.EntryDate;
            existingEntry.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return existingEntry;
        }

        public async Task<bool> DeleteJournalEntryAsync(int id)
        {
            var entry = await _dbContext.JournalEntries.FindAsync(id);
            if (entry == null)
                return false;

            _dbContext.JournalEntries.Remove(entry);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
} 