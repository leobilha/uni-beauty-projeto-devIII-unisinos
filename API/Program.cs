using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer("Server=localhost,1433; Database=uniBeauty-db; User Id=uni; Password=pFTq$KQMJCWwUL$EYp;"));

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services
    .AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

app.MapIdentityApi<User>();

app.Run();
