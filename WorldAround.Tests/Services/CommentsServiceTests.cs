using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WorldAround.Application.Mapping;
using WorldAround.Application.Services;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Enums;
using WorldAround.Domain.Models.Comments;
using WorldAround.Infrastructure.Data;
using Xunit;

namespace WorldAround.Tests.Services;

public class CommentsServiceTests
{
    private readonly WorldAroundDbContext _context;
    private readonly CommentsService _commentsService;

    public CommentsServiceTests()
    {
        _context = ContextInitializer.CreateDbContext();
        var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile(new TripsMappingProfile())));
        _commentsService = new CommentsService(_context, mapper);
    }

    [Fact]
    public async Task AddCommentAsync_TargetIsTrip_AddsCommentWithTripId()
    {
        //Arrange
        _context.Trips.Add(new Trip
        {
            Id = 1
        });
        await _context.SaveChangesAsync();
        var model = new AddCommentModel
        {
            TargetId = 1,
            TargetType = TargetType.Trip,
            Text = "test"
        };

        //Act
        await _commentsService.AddCommentAsync(model);

        //Assert
        var comment = await _context.Comments.FirstAsync();
        Assert.Equal(1, comment.TripId);
    }

    [Fact]
    public async Task AddCommentAsync_TargetIsAttraction_AddsCommentWithTripId()
    {
        //Arrange
        _context.Attractions.Add(new Attraction
        {
            Id = 1
        });
        await _context.SaveChangesAsync();
        var model = new AddCommentModel
        {
            TargetId = 1,
            TargetType = TargetType.Attraction,
            Text = "test"
        };

        //Act
        await _commentsService.AddCommentAsync(model);

        //Assert
        var comment = await _context.Comments.FirstAsync();
        Assert.Equal(1, comment.AttractionId);
    }

    [Fact]
    public async Task AddCommentAsync_ReturnsCreatedComment()
    {
        //Arrange
        _context.Trips.Add(new Trip
        {
            Id = 1
        });
        _context.Users.Add(new User
        {
            Id = 1
        });
        await _context.SaveChangesAsync();
        var model = new AddCommentModel
        {
            TargetId = 1,
            TargetType = TargetType.Trip,
            Text = "test"
        };

        //Act
        var result = await _commentsService.AddCommentAsync(model);

        //Assert
        Assert.Equal("test", result.Text);
    }
}