using JournalAppService.Api;
using JournalAppService.Application;
using JournalAppService.Infrastructure;
using JournalAppService.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add database context
builder.Services.AddDbContext<JournalDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repository and service
builder.Services.AddScoped<IJournalRepository, JournalRepository>();
builder.Services.AddScoped<IJournalEntryService, JournalEntryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Map the API endpoints
app.MapJournalEntryEndpoints();

app.Run();

