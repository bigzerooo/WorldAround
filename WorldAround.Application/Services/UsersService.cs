﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models.Base;
using WorldAround.Domain.Models.Paging;
using WorldAround.Domain.Models.Users;

namespace WorldAround.Application.Services;

public class UsersService : IUsersService
{
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private IQueryable<User> Users => _userManager.Users.Where(u => u.IsActive == true);

    public UsersService(
        IMapper mapper
        , UserManager<User> userManager)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<GetUsersPageModel> GetUsersAsync(GetDataParams @params, GetPageModel page)
    {
        var queryUsers = Users;

        if (!string.IsNullOrWhiteSpace(@params.SearchValue))
        {
            var normalizedValue = @params.SearchValue.ToUpper();

            queryUsers = queryUsers.Where(u =>
                u.NormalizedUserName.Contains(normalizedValue) ||
                (u.FirstName ?? "").ToUpper().Contains(normalizedValue) ||
                (u.LastName ?? "").ToUpper().Contains(normalizedValue));
        }

        page.PageIndex = page.PageIndex < 0 ? 0 : page.PageIndex;
        page.PageSize = page.PageSize < 0 ? 0 : page.PageSize;

        var users = await queryUsers.Skip(page.PageIndex * page.PageSize)
            .Take(page.PageSize).ToListAsync();

        var totalPages = page.PageSize != 0 ? (int)Math.Ceiling((double)users.Count / page.PageSize) : 0;

        return new GetUsersPageModel
        {
            Users = _mapper.Map<IEnumerable<UserModel>>(users),
            PageInfo = new PagingModel
            {
                PageIndex = page.PageIndex,
                PageSize = page.PageSize,
                TotalPages = totalPages,
                Length = users.Count
            }
        };
    }

    public async Task<UserModel> GetAsync(int id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());

        return _mapper.Map<UserModel>(user);
    }

    public async Task<UserModel> GetAsync(GetUserParams @params)
    {
        User user = null;

        if (@params.UserName != null)
        {
            user = await _userManager.FindByNameAsync(@params.UserName);
        }
        else if (@params.Email != null)
        {
            user = await _userManager.FindByEmailAsync(@params.Email);
        }

        return _mapper.Map<UserModel>(user);
    }

    public async Task<bool> Exists(string login)
    {
        var user = await _userManager.FindByEmailAsync(login);
        user ??= await _userManager.FindByNameAsync(login);

        return user != null;
    }

    public async Task<bool> CheckPassword(int userId, string password)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task UpdatePasswordAsync(UpdateUserPasswordParameters parameters)
    {
        var user = await _userManager.FindByIdAsync(parameters.UserId.ToString());
        await _userManager.ChangePasswordAsync(user, parameters.CurrentPassword, parameters.NewPassword);
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
