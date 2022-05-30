using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Helpers;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UserService(
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

        public async Task<UserModel> GetAsync(string login)
        {
            var user = UserHelper.IsEmail(login) ?
                await _userManager.FindByEmailAsync(login)
                : await _userManager.FindByNameAsync(login);

            return user == null ?
                throw new NullReferenceException("A user with specified login not found")
                : _mapper.Map<UserModel>(user);
        }

        public async Task<UserModel> GetByNameAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);

            return _mapper.Map<UserModel>(user);
        }

        public async Task<IEnumerable<UserModel>> GetAllAsync()
        {
            var users = await _userManager.Users.ToListAsync();

            return _mapper.Map<IEnumerable<UserModel>>(users);
        }

        public async Task<UserModel> UpdateAsync(UserModel UserModel)
        {
            var user = await _userManager.FindByIdAsync(UserModel.Id.ToString());

            _mapper.Map(UserModel, user);
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
}
