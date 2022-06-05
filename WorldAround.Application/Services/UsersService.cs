using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Helpers;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Services;

public class UsersService : IUsersService
{
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    public UsersService(
        IMapper mapper
        , UserManager<User> userManager)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<UserModel> GetAsync(int id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        return _mapper.Map<UserModel>(user);
    }

    public async Task<UserModel> GetAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);

        return _mapper.Map<UserModel>(user);
    }

    public async Task<UserModel> GetByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return _mapper.Map<UserModel>(user);
    }

    public async Task<bool> Exists(string login)
    {
        var user = await GetByEmailAsync(login);
        user ??= await GetAsync(login);

        return user != null;
    }

    public async Task<IList<string>> AddToRoleAsync(int userId, string role)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id.Equals(userId));

        await _userManager.AddToRoleAsync(user, role);

        return await _userManager.GetRolesAsync(user);
    }

    public async Task<IList<string>> RemoveFromRoleAsync(int userId, string role)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id.Equals(userId));

        await _userManager.RemoveFromRoleAsync(user, role);

        return await _userManager.GetRolesAsync(user);
    }

    public async Task<IReadOnlyCollection<UserModel>> GetAllAsync()
    {
        var users = await _userManager.Users.ToListAsync();

        return _mapper.Map<IReadOnlyCollection<UserModel>>(users);
    }

    public async Task<UserModel> UpdateAsync(UserModel userModel)
    {
        var user = await _userManager.FindByIdAsync(userModel.Id.ToString());

        _mapper.Map(userModel, user);
        await _userManager.UpdateAsync(user);

        return _mapper.Map<UserModel>(user);
    }

    public async Task<UserModel> DeactivateAsync(int id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        user.IsActive = false;
        await _userManager.UpdateAsync(user);

        return _mapper.Map<UserModel>(user);
    }
}
