using Microsoft.EntityFrameworkCore;
using System;
using WorldAround.Infrastructure.Data;

namespace WorldAround.Tests
{
    public static class ContextInitializer
    {
        public static WorldAroundDbContext CreateDbContext()
        {
            var builder = new DbContextOptionsBuilder<WorldAroundDbContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString());

            var options = builder.Options;
            var context = new WorldAroundDbContext(options);

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            return context;
        }
    }
}
