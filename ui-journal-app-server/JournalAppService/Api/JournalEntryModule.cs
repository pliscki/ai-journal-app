using JournalAppService.Api.Models;
using JournalAppService.Application;
using Microsoft.AspNetCore.Mvc;

namespace JournalAppService.Api
{
    public static class JournalEntryModule
    {
        public static void MapJournalEntryEndpoints(this WebApplication app)
        {
            app.MapGet("/api/journal-entries", async (IJournalEntryService journalService) =>
            {
                return await journalService.GetAllJournalEntriesAsync();
            })
            .WithName("GetAllJournalEntries")
            .WithTags("JournalEntries");

            app.MapGet("/api/journal-entries/{id}", async (int id, IJournalEntryService journalService) =>
            {
                var entry = await journalService.GetJournalEntryByIdAsync(id);
                if (entry == null)
                    return Results.NotFound();

                return Results.Ok(entry);
            })
            .WithName("GetJournalEntryById")
            .WithTags("JournalEntries");

            app.MapPost("/api/journal-entries", async (CreateJournalEntryRequest request, IJournalEntryService journalService) =>
            {
                if (request.EntryDate == default)
                {
                    return Results.BadRequest("Entry date is required");
                }

                var createdEntry = await journalService.AddJournalEntryAsync(request);
                return Results.Created($"/api/journal-entries/{createdEntry.Id}", createdEntry);
            })
            .WithName("CreateJournalEntry")
            .WithTags("JournalEntries");

            app.MapPut("/api/journal-entries/{id}", async (int id, UpdateJournalEntryRequest request, IJournalEntryService journalService) =>
            {
                if (request.EntryDate == default)
                {
                    return Results.BadRequest("Entry date is required");
                }

                var updatedEntry = await journalService.UpdateJournalEntryAsync(id, request);
                if (updatedEntry == null)
                    return Results.NotFound();

                return Results.Ok(updatedEntry);
            })
            .WithName("UpdateJournalEntry")
            .WithTags("JournalEntries");

            app.MapDelete("/api/journal-entries/{id}", async (int id, IJournalEntryService journalService) =>
            {
                var result = await journalService.DeleteJournalEntryAsync(id);
                if (!result)
                    return Results.NotFound();

                return Results.NoContent();
            })
            .WithName("DeleteJournalEntry")
            .WithTags("JournalEntries");
        }
    }
}
