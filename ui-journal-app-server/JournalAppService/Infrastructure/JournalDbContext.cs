using JournalAppService.Models;
using Microsoft.EntityFrameworkCore;

namespace JournalAppService.Infrastructure
{
    public class JournalDbContext : DbContext
    {
        public JournalDbContext(DbContextOptions<JournalDbContext> options) : base(options)
        {
        }

        public DbSet<JournalEntry> JournalEntries { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JournalEntry>(entity =>
            {
                entity.ToTable("journal_entries");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id").UseIdentityAlwaysColumn();
                entity.Property(e => e.Content).HasColumnName("content").IsRequired();
                entity.Property(e => e.EntryDate).IsRequired().HasColumnName("entry_date");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
                entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
                
                entity.HasIndex(e => e.CreatedAt, "idx_journal_created_at");
                entity.HasIndex(e => e.CreatedAt, "idx_journal_created_at_desc").IsDescending();
            });
        }
    }
} 